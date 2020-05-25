+++
title = "Explore the SAM template"
weight = 10
chapter = false
pre = "<b>4.1.1. </b>"
+++

Let's take a moment to understand the structure of a SAM application by exploring the SAM template which represents the architecture of your Serverless application. Go ahead and open the `sls-api/template.yaml` file.

It should have a structure like the following.

{{%expand "✍️ sls-api/template.yaml" %}}
```yml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: >
  sls-api

  SAM Template for sls-api

# More info about Globals: https://github.com/awslabs/serverless-application-model/blob/master/docs/globals.rst
Globals:
  Function:
    Timeout: 3

Resources:
  HelloWorldFunction:
    Type: AWS::Serverless::Function # More info about Function Resource: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#awsserverlessfunction
    Properties:
      CodeUri: hello_world/
      Handler: app.lambda_handler
      Runtime: python3.7
      Events:
        HelloWorld:
          Type: Api # More info about API Event Source: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#api
          Properties:
            Path: /hello
            Method: get

Outputs:
  # ServerlessRestApi is an implicit API created out of Events key under Serverless::Function
  # Find out more about other implicit resources you can reference within SAM
  # https://github.com/awslabs/serverless-application-model/blob/master/docs/internals/generated_resources.rst#api
  HelloWorldApi:
    Description: "API Gateway endpoint URL for Prod stage for Hello World function"
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/hello/"
  HelloWorldFunction:
    Description: "Hello World Lambda Function ARN"
    Value: !GetAtt HelloWorldFunction.Arn
  HelloWorldFunctionIamRole:
    Description: "Implicit IAM Role created for Hello World function"
    Value: !GetAtt HelloWorldFunctionRole.Arn
```
{{% /expand%}}

You may notice that the syntax looks exactly like AWS CloudFormation, this is because SAM templates are an extension of CloudFormation templates. That is, any resource that you can declare in CloudFormation, you can also declare in a SAM template. Let's take a closer look at the components of the template.

### Transform
Notice the transform line of the template, it tells CloudFormation that this template adheres to the open source [AWS Serverless Application Model specification](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md):

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: SAM Template for sls-api
```

### Globals
This section defines properties common to all your Serverless functions and APIs. In this case, it's specifying that all functions in this project will have a default timeout of 3 seconds.

```yaml
Globals:
  Function:
    Timeout: 3
```

### Hello World Function
The following section creates a Lambda function with an IAM execution role. It also specifies that the code for this Lambda function is located under a folder named _hello_world_, and that its entrypoint is a function named _lambdaHandler_ within a file named _app.py_. 

```yaml
  HelloWorldFunction:
    Type: AWS::Serverless::Function 
    Properties:
      CodeUri: hello_world/
      Handler: app.lambda_handler
      Runtime: python3.7
      Events:
        HelloWorld:
          Type: Api 
          Properties:
            Path: /hello
            Method: get
```

Notice that the IAM role is not explicitly specified, this is because SAM will create a new one by default. You can  override this behavior and pass your own role by specifying the _Role_ parameter. For a complete list of the parameters you can specify for a Lambda function check the [SAM reference](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#awsserverlessfunction).

### Event Triggers
This section is part of the function definition and it specifies the different events that will trigger the Lambda function. In this case, we are specifying the event to be an API Gateway with an endpoint on `/hello` that will listen on HTTP method `GET`. 

```yaml
      Events:
        HelloWorld:
          Type: Api
          Properties:
            Path: /hello
            Method: get
```

### Outputs
The Outputs section is optional and it declares output values that you can import into other CloudFormation stacks (to create cross-stack references), or simply to view them on the CloudFormation console. In this case we are making the API Gateway endpoint URL, the Lambda function ARN and the IAM Role ARN available as Outputs to make them easier to find.

```yaml
Outputs:
  HelloWorldApi:
    Description: "API Gateway endpoint URL for Prod stage for Hello World function"
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/hello/"
  HelloWorldFunction:
    Description: "Hello World Lambda Function ARN"
    Value: !GetAtt HelloWorldFunction.Arn
  HelloWorldFunctionIamRole:
    Description: "Implicit IAM Role created for Hello World function"
    Value: !GetAtt HelloWorldFunctionRole.Arn
```