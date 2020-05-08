+++
title = "EKS EC2"
weight = 200
pre= "<b>2.2.2. </b>"
+++

### Step 1. Add a EKS-EC2 to your stack

* 🎯 EKS-EC2 ...


{{<highlight typescript "hl_lines=4-5 20-47">}}
import * as cdk from '@aws-cdk/core';

import * as ec2 from '@aws-cdk/aws-ec2';
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
