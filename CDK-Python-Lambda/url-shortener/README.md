
# URL_Shortener CDK Python project

Use the `Python CDK` to quickly assemble your AWS infrastructure and show you how easy to configure your cloud resources, manage permissions, connect event sources and even build and publish your own constructs.

1. Creating a CDK Application
2. Modeling DynamoDB
3. Creating a Lambda function
4. Lambda permission settings
5. Build API Gateway
6. DNS settings
7. Cleanup

### 1. Creating a CDK Application

> Install AWS CDK

```bash
npm install -g aws-cdk
cdk --version

# brew install tree
tree
```

> Install packages

```bash
## Manually create a virtualenv on MacOS and Linux:
# python3 -m venv .env

## Activate your virtualenv.
source .env/bin/activate
## Windows
# % .env\Scripts\activate.bat

## Install the required dependencies.
pip install -r requirements.txt
```

### 2. Modeling DynamoDB

### 3. Creating a Lambda function

> **Lambda permission settings**

### 4. Build API Gateway

### 5. DNS settings

### 6. Cleanup


### 7. Useful commands

 * `cdk ls`          list all stacks in the app
 * `cdk synth`       emits the synthesized CloudFormation template
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk docs`        open CDK documentation

### 8. References

* [x] [CDK Workshop](https://cdkworkshop.com)
* [x] [the Infrastructure is Code with the AWS CDK](https://youtu.be/ZWCvNFUN-sU)
* [x] [url-shortener](https://github.com/aws-samples/aws-cdk-examples/tree/master/python/url-shortener) 

Enjoy!
