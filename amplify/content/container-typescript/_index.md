+++
title = "Container & TypeScript-CDK"
chapter = true
weight = 20
pre= "<b>2. </b>"
+++

# Container Micro-Services using TypeScript CDK

> 🎯 To run a the CDK TypeScript

```bash
npm install -g aws-cdk --force

cd container-typescript/cdk-eks
npm install
npm run build

cdk synth
cdk bootstrap aws://$ACCOUNT_ID/$AWS_REGION
cdk deploy
```


{{% children showhidden="false" %}}