+++
title = "Container & TypeScript-CDK"
weight = 20
pre= "<b>2. </b>"
+++


> 🎯 1. CI/CD with Blue/Green & Canary Deployments on EKS using CDK

![Blue/Green and Canary Deployments on EKS using CDK](/images/container-typescript/eks-bg-2.png?width=50pc)



> 🎯 2. To run a the CDK TypeScript

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