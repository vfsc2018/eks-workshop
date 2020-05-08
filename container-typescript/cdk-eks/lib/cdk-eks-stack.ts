import * as cdk from '@aws-cdk/core';

import * as dotenv from 'dotenv';
import * as iam from '@aws-cdk/aws-iam';
import * as eks from '@aws-cdk/aws-eks';
import * as ec2 from '@aws-cdk/aws-ec2';
// import * as autoscaling from '@aws-cdk/aws-autoscaling';


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

    /**
     * Step 2. Create a new EKS Cluster
     */  
    
    // IAM role for our EC2 worker nodes
    const clusterAdmin = new iam.Role(this, 'AdminRole', {
      assumedBy: new iam.AccountRootPrincipal()
    });

    var cluster_name = process.env.EKS_CLUSTER_NAME || "EKS-EC2";
    // console.log(`cluster_name is ${process.env.EKS_CLUSTER_NAME}`);

    const cluster = new eks.Cluster(this, cluster_name, {
      clusterName: cluster_name,
      vpc,
      defaultCapacity: 2,
      mastersRole: clusterAdmin,
      outputClusterName: true,
    });

  }
}
