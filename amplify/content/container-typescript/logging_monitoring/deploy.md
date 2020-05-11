---
title: "Deploy Fluentd"
weight: 30
---

```
mkdir ~/environment/deploy.files
cd ~/environment/deploy.files
wget https://modern-apps.aws.job4u.io/container-typescript/logging_monitoring/deploy.files/fluentd.yml
```
Explore the fluentd.yml to see what is being deployed. There is a link at the bottom of this page. The Fluentd log agent configuration is located in the Kubernetes ConfigMap. Fluentd will be deployed as a DaemonSet, i.e. one pod per worker node. In our case, a 3 node cluster is used and so 3 pods will be shown in the output when we deploy.

{{% notice warning %}}
Update REGION and CLUSTER_NAME environment variables in fluentd.yml to the ones for your values. Currently, they are set to ap-southeast-1 and ${CLUSTER_NAME} by default. Adjust this change in the 'env' section of the fluentd.yml file:

        env:
          - name: REGION
            value: ap-southeast-1
          - name: CLUSTER_NAME
            value: ${CLUSTER_NAME}
            
{{% /notice %}}

```
sed -e "s/{{AWS_REGION}}/$AWS_REGION/" -i ~/environment/deploy.files/fluentd.yml
sed -e "s/{{CLUSTER_NAME}}/${CLUSTER_NAME}/" -i ~/environment/deploy.files/fluentd.yml

kubectl apply -f ~/environment/deploy.files/fluentd.yml
```

Watch for all of the pods to change to running status

```
kubectl get pods -w --namespace=kube-system
```

We are now ready to check that logs are arriving in [CloudWatch Logs](https://console.aws.amazon.com/cloudwatch/home?#logStream:group=/eks/${CLUSTER_NAME}/containers)

Select the region that is mentioned in fluentd.yml to browse the Cloudwatch Log Group if required.

{{%attachments title="Related files" pattern=".yml"/%}}
