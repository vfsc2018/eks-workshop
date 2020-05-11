---
title: "Cleanup Logging"
weight: 50
---

```
cd ~/environment
kubectl delete -f ~/environment/deploy.files/fluentd.yml
rm -rf ~/environment/deploy.files/
aws es delete-elasticsearch-domain --domain-name kubernetes-logs
aws logs delete-log-group --log-group-name /eks/${CLUSTER_NAME}/containers
rm -rf ~/environment/iam_policy/
```
