+++
title = "DynamoDB"
weight = 100
pre= "<b>3.2.1. </b>"
+++

### Step 1. Add an DynamoDB to your stack

* 🎯 Define the **DynamoDB Table** that maps Short Codes to URLs.
    * **1.** Add an **import** statement at the beginning of `sls_api/sls_api_stack.py`
    * **2.** Create an **aws_dynamodb.Table** `mapping-table` 
        * [x] Table Name: `mapping-table`
        * [x] Partition Key: `id` (AttributeType.STRING) 


{{<highlight python "hl_lines=9 27-34">}}
from aws_cdk import (
    aws_iam as iam,
    aws_sqs as sqs,
    aws_sns as sns,
    aws_sns_subscriptions as subs,
    core
)

from aws_cdk import aws_dynamodb, aws_lambda, aws_apigateway

class SlsApiStack(core.Stack):

    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        queue = sqs.Queue(
            self, "SlsApiQueue",
            visibility_timeout=core.Duration.seconds(300),
        )

        topic = sns.Topic(
            self, "SlsApiTopic"
        )

        topic.add_subscription(subs.SqsSubscription(queue))

        ## 1. Define the table that maps short codes to URLs.
        table = aws_dynamodb.Table(self, "mapping-table",
                partition_key=aws_dynamodb.Attribute(
                    name="id",
                    type=aws_dynamodb.AttributeType.STRING),
                read_capacity=10,
                write_capacity=5)
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
