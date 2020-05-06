+++
title = "Container Stack"
chapter = true
weight = 20
pre= "<b>2.2. </b>"
+++


> 🎯 We'll add a **EKS Cluster** with an **API-Gateway Endpoint** in front of it.

![Container Stack Architecture](/images/container-typescript/container-stack.png)

> 🎯 Install the related Construct Library

```
npm install
```

> [Install the Kubectl CLI - EKS 1.15](https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html):

```
curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.15.10/2020-02-22/bin/linux/amd64/kubectl && chmod +x ./kubectl && mkdir -p $HOME/bin && cp ./kubectl $HOME/bin/kubectl && export PATH=$PATH:$HOME/bin

echo 'export PATH=$PATH:$HOME/bin' >> ~/.bashrc

kubectl version --short --client
```

> [Installing aws-iam-authenticator](https://docs.aws.amazon.com/eks/latest/userguide/install-aws-iam-authenticator.html)

```
curl -o aws-iam-authenticator https://amazon-eks.s3.us-west-2.amazonaws.com/1.16.8/2020-04-16/bin/linux/amd64/aws-iam-authenticator

chmod +x ./aws-iam-authenticator

mkdir -p $HOME/bin && cp ./aws-iam-authenticator $HOME/bin/aws-iam-authenticator && export PATH=$PATH:$HOME/bin

echo 'export PATH=$PATH:$HOME/bin' >> ~/.bashrc

aws-iam-authenticator help
```

> [Connect to the Amazon EKS API server](https://aws.amazon.com/premiumsupport/knowledge-center/eks-api-server-unauthorized-error/)