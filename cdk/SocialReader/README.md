# Welcome to SocialReader CDK TypeScript project!

This is a NodeJS TypeScript to crawling/hearing the filtered topics from Twitter/Facebook.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Initializing the AWS CDK

```
mkdir SocialReader && cd SocialReader
cdk init --language typescript
```

## Build and run the app

```
npm run build
cdk synth
```

## Add the Amazon EC2 & ECS Packages

```
npm install @aws-cdk/aws-ec2 @aws-cdk/aws-ecs @aws-cdk/aws-ecs-patterns
```

## Create a Fargate Service

```
npm run build
cdk deploy
# cdk deploy --profile test
# cdk deploy --profile production
```

> IAM Statement Changes

┌───┬────────────────┬────────┬────────────────┬──────────────────┬───────────┐
│   │ Resource       │ Effect │ Action         │ Principal        │ Condition │
├───┼────────────────┼────────┼────────────────┼──────────────────┼───────────┤
│ + │ ${MyFargateSer │ Allow  │ sts:AssumeRole │ Service:ecs-task │           │
│   │ vice/TaskDef/E │        │                │ s.amazonaws.com  │           │
│   │ xecutionRole.A │        │                │                  │           │
│   │ rn}            │        │                │                  │           │
├───┼────────────────┼────────┼────────────────┼──────────────────┼───────────┤
│ + │ ${MyFargateSer │ Allow  │ sts:AssumeRole │ Service:ecs-task │           │
│   │ vice/TaskDef/T │        │                │ s.amazonaws.com  │           │
│   │ askRole.Arn}   │        │                │                  │           │
├───┼────────────────┼────────┼────────────────┼──────────────────┼───────────┤
│ + │ ${MyFargateSer │ Allow  │ logs:CreateLog │ AWS:${MyFargateS │           │
│   │ vice/TaskDef/w │        │ Stream         │ ervice/TaskDef/E │           │
│   │ eb/LogGroup.Ar │        │ logs:PutLogEve │ xecutionRole}    │           │
│   │ n}             │        │ nts            │                  │           │
└───┴────────────────┴────────┴────────────────┴──────────────────┴───────────┘

> Security Group Changes

┌───┬──────────────────────────┬─────┬────────────┬───────────────────────────┐
│   │ Group                    │ Dir │ Protocol   │ Peer                      │
├───┼──────────────────────────┼─────┼────────────┼───────────────────────────┤
│ + │ ${MyFargateService/LB/Se │ In  │ TCP 80     │ Everyone (IPv4)           │
│   │ curityGroup.GroupId}     │     │            │                           │
│ + │ ${MyFargateService/LB/Se │ Out │ TCP 80     │ ${MyFargateService/Servic │
│   │ curityGroup.GroupId}     │     │            │ e/SecurityGroup.GroupId}  │
├───┼──────────────────────────┼─────┼────────────┼───────────────────────────┤
│ + │ ${MyFargateService/Servi │ In  │ TCP 80     │ ${MyFargateService/LB/Sec │
│   │ ce/SecurityGroup.GroupId │     │            │ urityGroup.GroupId}       │
│   │ }                        │     │            │                           │
│ + │ ${MyFargateService/Servi │ Out │ Everything │ Everyone (IPv4)           │
│   │ ce/SecurityGroup.GroupId │     │            │                           │
│   │ }                        │     │            │                           │
└───┴──────────────────────────┴─────┴────────────┴───────────────────────────┘

## Clean Up

```
cdk destroy
```

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
