+++
title = "Serverless Stack"
chapter = true
weight = 20
pre= "<b>3.2. </b>"
+++


> 🎯 We'll add a **Lambda Function** with an **API-Gateway Endpoint** in front of it.

![Serverless Stack Architecture](/images/serverless-python/serverless-stack.png)

> 🎯 Install the **AWS API-Gateway, Lambda, DynamoDB** Construct Library


{{%expand "✍️ requirements.txt" %}}
```
-e .
pytest

aws-cdk.aws_dynamodb
aws-cdk.aws-lambda
aws-cdk.aws_apigateway

aws-cdk.aws_route53
aws-cdk.aws_route53_targets
aws-cdk.aws_certificatemanager
aws-cdk.aws_s3
cdk-watchful
```
{{% /expand%}}

```bash
pip install --upgrade -r requirements.txt
```
