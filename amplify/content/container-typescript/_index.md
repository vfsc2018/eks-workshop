+++
title = "Container & TypeScript-CDK"
chapter = true
weight = 20
pre= "<b>2. </b>"
+++

# Container Micro-Services using TypeScript CDK

> 🎯 To run a the CDK TypeScript

```bash
npm install -g aws-cdk

cd container-typescript/cdk-eks
npm install
npm run build

cdk bootstrap aws://$ACCOUNT_ID/$AWS_REGION
cdk deploy
```


* [ ] [twitter4u-docker](https://github.com/nnthanh101/modern-apps/tree/master/CDK-TypeScript-Node/twitter4u-docker)
* [ ] [twitter4u-fargate](https://github.com/nnthanh101/modern-apps/tree/master/CDK-TypeScript-Node/twitter4u-fargate)


{{% children showhidden="false" %}}