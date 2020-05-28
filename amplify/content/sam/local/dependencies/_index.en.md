+++
title = "Install dependencies"
weight = 5
pre= "<b>4.2.1. </b>"
+++

Before we run the application locally, it's a common practice to install third-party libraries or dependencies that your application might be using. These dependencies are defined in a file that varies depending on the runtime, for example _package.json_ for NodeJS projects or _requirements.txt_ for Python ones. 

In the terminal, go into the `sls-api/hello_world` folder.
```
cd ~/environment/sls-api/hello_world
```

And install the dependencies:
```
pip install --upgrade -r requirements.txt
```