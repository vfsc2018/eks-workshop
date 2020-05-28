+++
title = "Monitoring using CloudWatch"
weight = 40
pre= "<b>3.4. </b>"
+++

![Serverless Stack - CloudWatch Dashboard](/images/serverless-python/serverless-stack-dashboard.png)

### 3.4.1. 🎯 Monitoring using 3rd-Party Library [cdk-watchful](https://pypi.org/project/cdk-watchful/) 

{{<highlight python "hl_lines= 8 52-53">}}
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
from cdk_watchful import Watchful

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
        
        ## Define a Watchful monitoring system and watch the entire scope.
        ## This will automatically find all watchable resources 
        ## and addthem to our dashboard.
        wf = Watchful(self, 'watchful', alarm_email='nnthanh101@gmail.com')
        wf.watch_scope(self)
        
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

### 3.4.2. CDK Diff then Deploy

```
cdk diff '*'
cdk deploy '*'
```

> 🚀 [sls-api.watchfulWatchfulDashboardF732C7A5](https://console.aws.amazon.com/cloudwatch/home?region=ap-southeast-1#dashboards:name=watchfulDashboard6A2D7A94-bVC8c7qrTBw0)

# 👍⛅🚀