import cdk = require('@aws-cdk/core');

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // FIXME: do stuff!

  }
}

const app = new cdk.App();
new HelloCdkStack(app, 'StoreStack');
app.synth();
