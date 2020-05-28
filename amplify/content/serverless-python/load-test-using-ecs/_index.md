+++
title = "Traffic Generator using ECS"
weight = 30
pre= "<b>3.3. </b>"
+++


> 🎯 We'll generate some traffic for Load Test on AWS ECS

![Serverless Stack - ECS Container & CloudWatch](/images/serverless-python/serverless-app-ecs-cloudwatch.png)

### 3.3.1. Pinger at `pinger/ping.sh`

{{%expand "✍️ Copy & paste to pinger/ping.sh" %}}
```bash
#!/bin/sh

while true; do
  curl -i $URL
  sleep 1
done
```
{{% /expand%}}


```
curl https://shortener.aws.job4u.io?targetUrl=amazon.com
```

Created URL: https://shortener.aws.job4u.io/f84b55e1

```
cd pinger
chmod +x ./ping.sh

URL=https://shortener.aws.job4u.io/f84b55e1 ./ping.sh
```

### 3.3.2. Pinger Docker at `pinger/Dockerfile`

{{%expand "✍️ Copy & paste to pinger/Dockerfile" %}}
```
FROM alpine

RUN apk add curl
ADD ping.sh /ping.sh

CMD [ "/bin/sh", "/ping.sh" ]
```
{{% /expand%}}

> **Docker** build & run

```
docker build -t pinger .

docker run -it -e URL=https://shortener.aws.job4u.io/f84b55e1 pinger
```



### 3.3.3. Traffic Generator Stack (Load Test) using AWS ECS

> **3.3.3.1.** `traffic101.py`

{{%expand "✍️ Copy & paste to traffic101.py" %}}
```python
from aws_cdk.core import Construct
from aws_cdk import aws_ecs, aws_ec2


## a User-Defined Construct
## just a Class the inherits from the core.Construct Base Class
class Traffic101(Construct):
    """
    An HTTP traffic generator.

    Hits a specified URL at some TPS.
    """

    def __init__(self, scope: Construct, id: str, *, vpc: aws_ec2.IVpc, url: str, tps: int):
        """
        Defines an instance of the traffic generator.

        :param scope: construct scope
        :param id:    construct id
        :param vpc:   the VPC in which to host the traffic generator
        :param url:   the URL to hit
        :param tps:   the number of transactions per second
        """
        super().__init__(scope, id)

        ## Define an ECS Cluster hosted within the requested VPC
        cluster = aws_ecs.Cluster(self, 'cluster', vpc=vpc)

        ## Define our ECS Task Definition with a single Container.
        ## The image is built & published from a local asset directory
        task_definition = aws_ecs.FargateTaskDefinition(self, 'PingTask')
        task_definition.add_container('Pinger',
                                      image=aws_ecs.ContainerImage.from_asset("pinger"),
                                      environment={'URL': url})

        ## Define our Fargate Service. TPS determines how many Instances we
        ## want from our Task (each Task produces a single TPS)
        aws_ecs.FargateService(self, 'service',
                               cluster=cluster,
                               task_definition=task_definition,
                               desired_count=tps)
```
{{% /expand%}}

> **3.3.3.2.** `sls_api/sls_api_stack.py`

{{<highlight python "hl_lines= 2 7 50-59">}}
from aws_cdk import (
    aws_iam as iam,
    aws_sqs as sqs,
    aws_sns as sns,
    aws_sns_subscriptions as subs,
    core
)
from aws_cdk.core import App, Construct, Duration
from aws_cdk import aws_dynamodb, aws_lambda, aws_apigateway

from base_common import BaseStack

from traffic101 import Traffic101

## Our main Application Stack
class SlsApiStack(BaseStack):
# class SlsApiStack(core.Stack):

    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        # The code that defines your stack goes here
        
        ## Define the table that maps short codes to URLs.
        table = aws_dynamodb.Table(self, "mapping-table",
                partition_key=aws_dynamodb.Attribute(
                    name="id",
                    type=aws_dynamodb.AttributeType.STRING),
                read_capacity=10,
                write_capacity=5)
                
        ## Defines Lambda resource & API-Gateway request handler
        ## All API requests will go to the same function.
        handler = aws_lambda.Function(self, "SlsApiFunction",
                            code=aws_lambda.Code.asset("./lambda"),
                            handler="handler.main",
                            timeout=core.Duration.minutes(5),
                            runtime=aws_lambda.Runtime.PYTHON_3_7)

        ## Pass the table name to the handler through an env variable 
        ## and grant the handler read/write permissions on the table.
        table.grant_read_write_data(handler)
        handler.add_environment('TABLE_NAME', table.table_name)
        
        ## Define the API endpoint and associate the handler
        api = aws_apigateway.LambdaRestApi(self, "SlsApiGateway",
                                           handler=handler)

        ## Map shortener.aws.job4u.io to this API Gateway endpoint
        ## The shared Domain Name that can be accessed through the API in BaseStack
        ## NOTE: you can comment out if you want to bypass the Domain Name mapping
        self.map_base_subdomain('shortener', api)

        
## Separate Stack that includes the Traffic Generator
class TrafficGeneratorStack(BaseStack):
    def __init__(self, scope: Construct, id: str):
        super().__init__(scope, id)

        ## Define a Traffic Generator instance that hits the URL at 10 TPS
        ## and hosted within the shared Base-VPC
        Traffic101(self, 'generator',
              url='https://shortener.aws.job4u.io/f84b55e1',
              tps=10,
              vpc=self.base_vpc)
{{</highlight>}}

> **3.3.3.3.** `app.py`

{{<highlight python "hl_lines=5 9">}}
#!/usr/bin/env python3

from aws_cdk import (
    aws_iam as iam,
    aws_sqs as sqs,
    aws_sns as sns,
    aws_sns_subscriptions as subs,
    core
)

from sls_api.sls_api_stack import SlsApiStack, TrafficGeneratorStack

app = core.App()
SlsApiStack(app, "sls-api")
TrafficGeneratorStack(app, 'sls-api-load-test')

app.synth()
{{</highlight>}}

### 3.3.4. CDK Diff then Deploy

```
cdk diff sls-api-load-test

cdk deploy sls-api-load-test
```

# 👏👍