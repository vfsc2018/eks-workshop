+++
title = "New Python CDK Project"
weight = 10
pre= "<b>3.1. </b>"
+++


* 🎯 We will use `cdk init` to create a new AWS CDK Python project.

* 🎯 We will also use the CDK Toolkit to synthesize an AWS
CloudFormation template for the starter app and how to deploy your app into your AWS Account.

> **Step 1.** Creating a CDK application

```
mkdir sls-api
cd sls-api

cdk init sample-app --language python
```

> **Step 2.** Install packages

```bash
## Manually create a virtualenv on MacOS and Linux:
# python3 -m venv .env

## Activate your virtualenv.
source .env/bin/activate
## Windows
# % .env\Scripts\activate.bat

## Install the required dependencies.
# pip install -r requirements.txt
pip install --upgrade -r requirements.txt
```

> **Step 3.** Explore Your Project Directory 

```
## RHEL/CentOS and Fedora Linux
sudo yum install tree -y
## Debian/Ubuntu, Mint Linux
# sudo apt-get install tree -y
## MacOS
# brew install tree
tree
```

{{%expand "✍️ Project Structure" %}}
* `.env` - The python virtual envirnment information discussed in the previous section.
* `sls_api` - A Python module directory.
    * `sls_api.egg-info` - Folder that contains build information relevant for the packaging on the project
    * `sls_api_stack.py` - A custom CDK stack construct for use in your CDK application.
* `tests` - Contains all tests.
    * `unit` - Contains unit tests.
        * `test_sls_api.py` - A trivial test of the custom CDK stack created in the cdk-workshop package. This is mainly to demonstrate how tests can be hooked up to the project.
* `app.py` - The “main” for this sample application.
* `cdk.json` - A configuration file for CDK that defines what executable CDK should run to generate the CDK construct tree.
* `README.md` - The introductory README for this project.
* `requirements.txt` - This file is used by pip to install all of the dependencies for your application. In this case, it contains only -e . This tells pip to install the requirements specified in setup.py. It also tells pip to run python setup.py develop to install the code in the cdk-workshop module so that it can be edited in place.
* `setup.py` - Defines how this Python package would be constructed and what the dependencies are.
{{% /expand%}}

> **Step 4.** Synthesize a template from your app

```
cdk synth
```

> **Step 5.** Bootstrapping an environment then Deploy

```
cdk bootstrap

cdk deploy sls-api
```

{{%expand "✍️ Bootstrapping an Environment" %}}
The first time you deploy an AWS CDK app into an Environment (AWS Account/Region), you’ll need to install a “Bootstrap Stack”.

This stack includes resources that are needed for the toolkit’s operation. For example, the stack includes an S3 bucket that is used to store templates and assets during the deployment process.
{{% /expand%}}

{{% notice note %}} 
You're READY ✅ for some actual CODING! 👌
{{% /notice %}}
