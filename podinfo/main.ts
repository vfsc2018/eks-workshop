import { Construct } from 'constructs';
import { App, Chart } from 'cdk8s';
/** imported constructs */
import { Deployment, Service, IntOrString } from './imports/k8s';
// import { Deployment, Service } from "../lib";
import { PodinfoContainer } from "./podinfo";

export class MyChart extends Chart {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    // define resources here
    const label = { app: 'podinfo-k8s' };

    /** Deploys hello-kubernetes as a Service behind a LoadBalancer */
    new Service(this, 'service', {
      spec: {
        type: 'LoadBalancer',
        ports: [ { port: 80, targetPort: IntOrString.fromNumber(8080) } ],
        selector: label
      }
    });

    new Deployment(this, 'deployment', {
      spec: {
        replicas: 2,
        selector: {
          matchLabels: label
        },
        template: {
          metadata: { labels: label },
          spec: {
            containers: [
              {
                name: 'podinfo-kubernetes',
                image: 'paulbouwer/hello-kubernetes:1.8',
                ports: [ { containerPort: 8080 } ]
              }
            ]
          }
        }
      }
    });

  }
}

const app = new App();
new MyChart(app, 'podinfo');
app.synth();
