+++
title = "Lambda"
weight = 200
pre= "<b>3.2.2. </b>"
+++

## Step 1. Lambda Handler code

* 🎯 We'll start with the **AWS Lambda Handler** code.
    * **1.** Create a directory `lambda` in the root of your project tree (next to the sls_api directory).
    * **2.** Add a file called `handler.py` in the `lambda` directory with the following contents:

{{%expand "✍️ Copy & paste to lambda/handler.py" %}}
```python
import json
import os
import uuid
import logging

import boto3

LOG = logging.getLogger()
LOG.setLevel(logging.INFO)


def main(event, context):
    LOG.info("EVENT: " + json.dumps(event))

    query_string_params = event["queryStringParameters"]
    if query_string_params is not None:
        target_url = query_string_params['targetUrl']
        if target_url is not None:
            return create_short_url(event)

    path_parameters = event['pathParameters']
    if path_parameters is not None:
        if path_parameters['proxy'] is not None:
            return read_short_url(event)

    return {
        'statusCode': 200,
        'body': 'usage: ?targetUrl=URL'
    }


def create_short_url(event):
    # Pull out the DynamoDB table name from environment
    table_name = os.environ.get('TABLE_NAME')

    # Parse targetUrl
    target_url = event["queryStringParameters"]['targetUrl']

    # Create a unique id (take first 8 chars)
    id = str(uuid.uuid4())[0:8]

    # Create item in DynamoDB
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(table_name)
    table.put_item(Item={
        'id': id,
        'target_url': target_url
    })

    # Create the redirect URL
    url = "https://" \
        + event["requestContext"]["domainName"] \
        + event["requestContext"]["path"] \
        + id

    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'text/plain'},
        'body': "Created URL: %s" % url
    }

def read_short_url(event):
    # Parse redirect ID from path
    id = event['pathParameters']['proxy']

    # Pull out the DynamoDB table name from the environment
    table_name = os.environ.get('TABLE_NAME')

    # Load redirect target from DynamoDB
    ddb = boto3.resource('dynamodb')
    table = ddb.Table(table_name)
    response = table.get_item(Key={'id': id})
    LOG.debug("RESPONSE: " + json.dumps(response))

    item = response.get('Item', None)
    if item is None:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'text/plain'},
            'body': 'No redirect found for ' + id
        }

    # Respond with a redirect
    return {
        'statusCode': 301,
        'headers': {
            'Location': item.get('target_url')
        }
    }
```
{{% /expand%}}

This Lambda Function's output also includes the HTTP Status Code &
HTTP Headers. These are used by API Gateway to formulate the HTTP response to the User.


## Step 2. Add an AWS Lambda Function

* [x] Add an `import` statement at the beginning of `sls_api/sls_api_stack.py`
* [x] A **aws_lambda.Function** `SlsApiFunction` to your Stack.


{{<highlight python "hl_lines=9 35-41 43-46">}}
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

        ## 2.1. Defines Lambda resource & API-Gateway request handler
        ## All API requests will go to the same function.
        handler = aws_lambda.Function(self, "SlsApiFunction",
                            code=aws_lambda.Code.asset("./lambda"),
                            handler="handler.main",
                            timeout=core.Duration.minutes(5),
                            runtime=aws_lambda.Runtime.PYTHON_3_7)

        ## 2.2. Pass the table name to the handler through an env variable 
        ## and grant the handler read/write permissions on the table.
        table.grant_read_write_data(handler)
        handler.add_environment('TABLE_NAME', table.table_name)
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

You'll notice that `cdk deploy` not only deployed your CloudFormation stack, but also archived and uploaded the `lambda` directory from your disk to the bootstrap bucket.


# 👏
