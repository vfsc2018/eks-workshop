+++
title = "Run the Unit Test"
weight = 20
pre= "<b>4.2.3. </b>"
+++


#### 🎯 Run the Unit Tests

As you typically would, with any software project, running the unit tests locally is no different for Serverless applications. Developers run them before pushing changes to a code repository. So, go ahead and run the unit tests for your project.

In the terminal, run this command from the `sls-api/hello_world` folder to run the unit tests:

```
cd ~/environment/sls-api
pip install pytest pytest-mock --user
python -m pytest tests/ -v
```


{{% notice note %}}
We can chose any unit tests framework; SAM doesn't enforce any particular one. You can continue to have the same unit testing workflow that you do in a non-serverless application.
{{% /notice%}}
