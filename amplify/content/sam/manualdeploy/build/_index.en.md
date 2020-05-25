+++
title = "Build the App"
weight = 10
pre= "<b>4.3.1. </b>"
+++


#### 🎯 1. Build Your Application

To build a SAM project, we are going to use the `sam build` command. This command iterates through the functions in your application, looking for the manifest file (such as requirements.txt or package.json) that contains the dependencies, and automatically creates deployment artifacts.

From the root of the `sls-api` folder, run the following command in the terminal:

```bash
cd ~/environment/sls-api

sam build
```

<!--
{{% notice warning %}}
Error: Template file not found at */template.yaml.  
If you got this error is because you need to run SAM commands at the same level where the _template.yaml_ file is located.
{{% /notice%}}
-->

#### Build completed
When the build finishes successfully, you should see a new directory created in the root of the project named `.aws-sam`. It is a hidden folder, so if you want to see it in the IDE, **make sure you enable _Show hidden files_ in Cloud9** to see it. 


#### Explore the build folder
Take a moment to explore the content of the build folder. Notice that the unit tests are automatically excluded from it.

You can see the following top-level tree under .aws-sam:

```
sls-api
├── template.yaml
└── .aws_sam/
    └── build/
       ├── HelloWorldFunction/
       └── template.yaml
```
