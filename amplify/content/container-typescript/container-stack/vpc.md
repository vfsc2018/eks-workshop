+++
title = "VPC"
weight = 100
pre= "<b>2.2.1. </b>"
+++

### Step 1. Add a VPC to your stack

* 🎯 Define the **DynamoDB Table** that maps Short Codes to URLs.
    * **1.** Add an **import** statement at the beginning of `url_shortener/url_shortener_stack.py`
    * **2.** Create an **aws_dynamodb.Table** `mapping-table` 
        * [x] Table Name: `mapping-table`
        * [x] Partition Key: `id` (AttributeType.STRING) 


{{<highlight typescript "hl_lines=3 11-16">}}
import * as cdk from '@aws-cdk/core';

import * as ec2 from '@aws-cdk/aws-ec2';

export class CdkEksStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    
    // Step 1. Create a new VPC for our EKS Cluster
    // The default VPC will create a NAT Gateway for each AZs --> Cost
    const vpc = new ec2.Vpc(this, 'EKS-VPC', {
      cidr: '10.10.0.0/16',
      natGateways: 1
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
