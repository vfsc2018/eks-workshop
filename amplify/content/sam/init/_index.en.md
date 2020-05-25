+++
title = "Initialize Project"
weight = 5
chapter = false
pre = "<b>4.1. </b>"
+++

#### 1. Project Architecture

The Hello World SAM project you just created will create the following architecture when deployed. It has a single Lambda function, an API Gateway that exposes a _/hello_ resource and invokes the Lambda function when called with an HTTP GET request. The Lambda function assumes an IAM role that can have permissions to interact with other AWS resources, like a database for example.

![SAM Init Architecture](/images/sam/serverless-architecture.png)


#### 2. Initialize Project

AWS SAM provides you with a command line tool, the AWS SAM CLI, that makes it easy for you to create and manage serverless applications. It particularly makes easy the scaffolding of a new project, as it creates the initial skeleton of a hello world application, so you can use it as a baseline and continue building your project from there. 

Run the following command to scaffold a new project:
```bash
sam init --runtime python3.7 -n sls-api
```

It will prompt for project configuration parameters: 

* [x] Type `1` to select *AWS Quick Start Templates*

* [x]  Type `1` to select the `Hello World Example`

{{% notice tip %}}
This [sam init](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-init.html) command supports cookiecutter templates, so you could write your own custom scaffolding templates and specify them using the location flag, 
For example: _sam init --location git+ssh://git@github.com/aws-samples/cookiecutter-aws-sam-python.git_
{{% /notice%}}

> Project should now be initialized: You should see a new folder `sls-api` created with a basic Hello World scaffolding.