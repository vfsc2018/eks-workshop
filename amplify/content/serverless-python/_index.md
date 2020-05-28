+++
title = "Serverless & Python-CDK"
chapter = true
weight = 30
pre= "<b>3. </b>"
+++

# Serverless Application using Python CDK

![Serverless Appplication using Python CDK](/images/serverless-python/serverless-app-python-cdk.png)

```
git clone https://github.com/nnthanh101/sls-app.git

cp -avr sls-app/sls-api/ .
cd ~/environment/sls-api

cdk init
pip install --upgrade -r requirements.txt

cdk synth
cdk bootstrap aws://$ACCOUNT_ID/$AWS_REGION
cdk deploy sls-api
```

{{% children showhidden="false" %}}
