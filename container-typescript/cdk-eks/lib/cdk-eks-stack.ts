import * as cdk from '@aws-cdk/core';

import * as ec2 from '@aws-cdk/aws-ec2';
import * as dotenv from 'dotenv';


export class CdkEksStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    dotenv.config();
    console.log(`vpc_name, vpc_cidr is ${process.env.AWS_VPC_NAME}, ${process.env.AWS_VPC_CIDR}`);

    // Step 1. Create a new VPC for our EKS Cluster    
    var vpc_name = process.env.AWS_VPC_NAME || "EKS-VPC";
    var vpc_cidr = process.env.AWS_VPC_CIDR || "10.0.0.0/16";
    const vpc = new ec2.Vpc(this, vpc_name, {
      cidr: vpc_cidr,
      natGateways: 1 // ONLY 1 NAT Gateway --> Cost Optimization trade-off
    })

  }
}
