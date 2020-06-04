+++
title = "VPC"
weight = 100
pre= "<b>2.2.1. </b>"
+++


### Step 1. Add a **VPC** to your **EKS** stack

* 🎯 Define the **VPC** that is used for EKS Cluster.
    * **1.** Add an **import** statement at the beginning of `cdk-eks/lib/cdk-eks-stack.ts`
    * **2.** Create an **aws-ec2.Vpc** `EKS-VPC` 
        * [x] VPC Name: `EKS-VPC`
        * [x] VPC CIDR: `10.10.0.0/16`
        * [x] Number of NAT Gateway: `1` ~~(Cost Optimization trade-off)~~


{{<highlight typescript "hl_lines=3-4 12 14-17 22-52">}}
import * as cdk from '@aws-cdk/core';

import * as dotenv from 'dotenv';
import * as ec2 from '@aws-cdk/aws-ec2';

export class CdkEksStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    
    dotenv.config();

    /**
     * Step 1. use an existing VPC or create a new one for our EKS Cluster
     */  
    const vpc = getOrCreateVpc(this);
    
  }
}

/**
 * Step 1. use an existing VPC or create a new one for our EKS Cluster
 * 
 * Note: only 1 NAT Gateway --> Cost Optimization trade-off
 */ 
function getOrCreateVpc(stack: cdk.Stack): ec2.IVpc {
  
  var vpc_name = process.env.AWS_VPC_NAME || "EKS-VPC";
  var vpc_cidr = process.env.AWS_VPC_CIDR || "10.10.0.0/16";
  // console.log(`vpc_name is ${process.env.AWS_VPC_NAME}`);
  // console.log(`vpc_cidr is ${process.env.AWS_VPC_CIDR}`);
  
  // use an existing VPC or create a new one
  const vpc = stack.node.tryGetContext('use_default_vpc') === '1' ?
    ec2.Vpc.fromLookup(stack, vpc_name, { isDefault: true }) :
    stack.node.tryGetContext('use_vpc_id') ?
      ec2.Vpc.fromLookup(stack, vpc_name, 
              { vpcId: stack.node.tryGetContext('use_vpc_id') }) :
      new ec2.Vpc(stack, vpc_name, 
              { cidr: vpc_cidr,
                maxAzs: 2,
                natGateways: 1,
                subnetConfiguration: [
                  {  cidrMask: 24, subnetType: ec2.SubnetType.PUBLIC,  
                     name: "PublicDMZ"  },
                  {  cidrMask: 24, subnetType: ec2.SubnetType.PRIVATE, 
                     name: "PrivateServices" } ]
              });  
      
  return vpc
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

> {{%expand "✍️ Deploy in another AWS_REGION" %}} 

  ```bash
  # only for the first time in this region
  AWS_REGION=ap-southeast-2 cdk bootrap
  # cdk diff
  AWS_REGION=ap-southeast-2 cdk diff
  AWS_REGION=ap-southeast-2 cdk depoy
  ```
{{% /expand%}}


> {{%expand "✍️ Deploy in any existing VPC" %}} 

  ```bash
  # To deploy in the default vpc
  cdk diff -c use_default_vpc=1
  # To deploy in a specific VPC ID
  cdk diff -c use_vpc_id=vpc-11111111111111111
  ```
{{% /expand%}}