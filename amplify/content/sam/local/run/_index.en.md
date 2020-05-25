+++
title = "Run using SAM CLI"
weight = 10
pre= "<b>4.2.2. </b>"
+++

#### 🎯 1. There are 2 ways of running a Serverless app locally: 

**1)** By invoking an individual **Lambda Function**

**2)** By running a **local HTTP Server** that simulates **API Gateway**. 
We can learn about invoking individual functions in the [SAM Local Invoke reference](https://docs.aws.amazon.com/en_pv/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-local-invoke.html).

In the terminal, run the following command from the root directory of the _sls-api_ folder:

```
cd ~/environment/sls-api
sam local start-api

# Making One-off Invocations
sam local invoke "HelloWorldFunction" -e events/event.json
```

<!--
{{% notice warning %}}   
Error: Template file not found at /home/ec2-user/environment/sls-api/hello_world/template.yml.  
If you got this error is because you need to run the command from the same folder level where the SAM `template.yaml` is located. That is, the root directory of the sls-api folder.
{{% /notice %}}
-->

{{% notice note %}}
In a Cloud9 workspace, you must use port 8080, 8081 or 8082 to be able to open the URL in the local browser for preview. 
{{% /notice %}}

#### 🎯 2. Test your endpoint

Once your local server is running, we can send HTTP requests to test it. Chose one of the following options:

* [x] Option A) Using CURL

    Without killing the running process, open a new terminal.

    Test your endpoint by running a CURL command that triggers an HTTP GET request.

    ```
    curl http://localhost:3000/hello
    ```

* [ ] Option B) Using a browser window

    In Cloud9, go to the top menu and chose **Tools > Preview > Preview Running Application**. A browser tab will open, append `/hello` to the end of the URL. This will invoke your Lambda function locally.

    Note how SAM is pulling the Docker container image _lambci/lambda:python3.7_ automatically. This is how SAM is able to simulate the Lambda runtime locally and run your function within it. The first invocation might take a few seconds due to the docker pull command, but subsequent invocations should be much faster.


#### 🎯 3. Make a code change

While the app is still running, open the file `sls-api/hello_world/app.py` and make a simple code change. For example, change the response message to return `hello my friends` instead of ~~hello world~~. Your Lambda handler should look like this after the change: 


**Note: Make sure you save the file after changing it.**

You don't have to restart the `sam local` process, just refresh the browser tab or re-trigger the CURL command to see the changes reflected in your endpoint.

{{% notice tip %}}
You only need to restart `sam local` if you change the `template.yaml`.
{{% /notice%}}
