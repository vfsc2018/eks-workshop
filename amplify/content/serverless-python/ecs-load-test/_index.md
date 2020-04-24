+++
title = "Load Test on AWS ECS"
chapter = true
weight = 30
pre= "<b>3.3. </b>"
+++


> 🎯 We'll generate some traffic for Load Test on AWS ECS


![Serverless Stack Architecture](/images/serverless-stack.png)

### 3.3.1. Pinger

```
curl https://shortener.aws.job4u.io?targetUrl=amazon.com
```

Created URL: https://shortener.aws.job4u.io/f84b55e1

```
chmod +x ./ping.sh

URL=https://shortener.aws.job4u.io/f84b55e1 ./ping.sh
```

### 3.3.2. pinger Docker

```
docker build -t pinger .

docker run -it -e URL=https://shortener.aws.job4u.io/f84b55e1 pinger
```