---
title: Prerequisite Resources
weight: 12
pre: "<b>1.2. </b>"
---

> 🎯 1. Get your **AWS account** ready!

You have received AWS credentials; make sure you have sufficient privileges in your AWS account.


> 🎯 2. **Cloud9** Cloud-based IDE

* [x] 🚀[2.1. AWS CloudFormation: provision your AWS Cloud resources](https://devops.job4u.io/Modern-Apps/VPC-Cloud9-IDE/index.html)
  * [ ] You can choose Themes by selecting *View* / *Themes* / *Solarized* / *Solarized Dark* in the Cloud9 workspace menu.

  * [x] Verify CDK

    ``` bash
    cdk --version
    ```

    {{%expand "✍️ Install CDK" %}}
    ```bash
    # sudo yum install -y npm
    # npm install -g typescript@latest
    
    npm install -g aws-cdk --force
    ```
    {{% /expand%}}

* [x] 🚀 2.2. Bootstrap Script

  We have put together a bootstrap script that will make the upgrade easier for you. Download it by running the following command from your Cloud9 terminal. 

  ```
  wget https://modern-apps.aws.job4u.io/assets/bootstrap.sh
  ```

  Then give it permissions to execute: 

  ```
  chmod +x bootstrap.sh
  ```

  And run it: 

  ```
  ./bootstrap.sh
  ```

  **THIS MAY TAKE A FEW MINUTES TO COMPLETE.**


* [x] 🚀 2.3. Verify the new version

  Run the following command: 

  ```
  sam --version
  ```

  You should see *SAM CLI, version 0.43.0* or greater.