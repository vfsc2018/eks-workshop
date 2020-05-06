#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkEksStack } from '../lib/cdk-eks-stack';
// import { CdkEksEC2Stack } from '../lib/cdk-eks-ec2-stack';

const app = new cdk.App();
new CdkEksStack(app, 'CdkEksStack');

// new CdkEksEC2Stack(app, 'CDK-EKS-EC2-Stack');
