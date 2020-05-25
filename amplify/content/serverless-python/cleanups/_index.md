+++
title = "Clean up"
weight = 50
pre= "<b>3.5. </b>"
+++

# Clean up your stack

To avoid unexpected charges, please clean up the CDK Stack.

You can either delete the stack through the AWS CloudFormation console or use
`cdk destroy`:

```
cdk destroy
```

You'll be asked:

```
Are you sure you want to delete: sls-api (y/n)?
```

Hit `y` and you'll see your stack being destroyed.
