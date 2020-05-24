---
title: Quick Setup Cloud9
weight: 30
pre: "<b>1.3. </b>"
---


* [x] 🚀 1.3.1. Bootstrap Script

  We have put together a bootstrap script that will make the upgrade easier for you. Download it by running the following command from your Cloud9 terminal. 


  ```bash
  wget https://modern-apps.aws.job4u.io/assets/bootstrap.sh

  chmod +x bootstrap.sh
  ./bootstrap.sh
  ```

  **THIS MAY TAKE A FEW MINUTES TO COMPLETE.**


* [ ] 🚀Cloud9 [Create a Cloud9 Workspace](../cloud9-workspace/) or [Provision your AWS Cloud resources](https://devops.job4u.io/Modern-Apps/VPC-Cloud9-IDE/index.html)

  * [x] Verify CDK

    ``` bash
    cdk --version
    ```

    > ✍️ Install CDK

    ```bash
    # sudo yum install -y npm
    # npm install -g typescript@latest
    
    npm install -g aws-cdk --force
    ```

    * [ ] You can choose Themes by selecting *View* / *Themes* / *Solarized* / *Solarized Dark* in the Cloud9 workspace menu.

* [x] 🚀 1.3.3. Verify the new version

  * [x] Run the following command: 

    ```bash
    sam --version
    ```

    You should see *SAM CLI, version 0.43.0* or greater.