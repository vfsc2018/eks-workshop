+++
title = "VPC"
weight = 100
pre= "<b>2.2.1. </b>"
+++

### Step 1. Add a VPC to your stack

* [x] VPC Name: `EKS-VPC`
* [x] VPC CIDR: `10.0.0.0/16`
* [x] Number of NAT Gateway: `1` ~~(Cost Optimization trade-off)~~

{{<highlight typescript "hl_lines=3-4 11-25">}}
import * as cdk from '@aws-cdk/core';

import * as dotenv from 'dotenv';
import * as ec2 from '@aws-cdk/aws-ec2';


export class CdkEksStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    dotenv.config();
    // console.log(`vpc_name is ${process.env.AWS_VPC_NAME}`);
    // console.log(`vpc_cidr is ${process.env.AWS_VPC_CIDR}`);

    /**
     * Step 1. Create a new VPC for our EKS Cluster
     */  
    var vpc_name = process.env.AWS_VPC_NAME || "EKS-VPC";
    var vpc_cidr = process.env.AWS_VPC_CIDR || "10.0.0.0/16";

    const vpc = new ec2.Vpc(this, vpc_name, {
      cidr: vpc_cidr,
      natGateways: 1 // ONLY 1 NAT Gateway --> Cost Optimization trade-off
    })

  }
}
{{</highlight>}}


## Step 2. CDK Diff

Save your code, and let's take a quick look at the `cdk diff` before we deploy:

```
npm run build

cdk diff CdkEksStack
```


## Step 3. Let's deploy

```
cdk deploy CdkEksStack
```
