+++
title = "Route53 & ACM"
weight = 400
pre= "<b>3.2.4. </b>"
+++

![Route53 & ACM](/images/serverless-python/route53-acm.png)

### Step 1. Add an Route53 & ACM to your stack

{{<highlight python "hl_lines= 4 7 43">}}
from aws_cdk import (
    aws_iam as iam,
    aws_sqs as sqs,
    aws_sns as sns,
    aws_sns_subscriptions as subs,
    core
)
from aws_cdk import aws_dynamodb, aws_lambda, aws_apigateway

from base_common import BaseStack

# Our main Application Stack
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
{{</highlight>}}


## Step 2. CDK Diff

Save your code, and let's take a quick look at the `cdk diff` before we deploy:

```
cdk diff sls-api
```


## Step 3. Let's deploy

```
cdk deploy sls-api
```

## Step 4: Stack outputs

When deployment is complete, you'll notice this line:

```
sls-api.SlsApiGatewayEndpoint23405F0E = https://iswpmei782.execute-api.ap-southeast-1.amazonaws.com/prod/
```

This is a [stack output](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacks.html) that's automatically added by the API Gateway construct and includes the URL of the API Gateway endpoint.

## Testing your Serverless App

Let's try this endpoint with `curl`. Copy the URL and execute (your
prefix and region will likely be different).

{{% notice info %}}
If you don't have [curl](https://curl.haxx.se/) installed, you can use your favorite Web Browser to hit this URL.
{{% /notice %}}

```
curl https://shortener.aws.job4u.io

curl https://shortener.aws.job4u.io?targetUrl=https://aws.amazon.com/cdk
```

Output should look like this: 

Created URL: Created URL: https://shortener.aws.job4u.io/**c936375a**

> To access a shortened URL

```
curl -I https://shortener.aws.job4u.io/c936375a
```

---

Good Job! 👍
