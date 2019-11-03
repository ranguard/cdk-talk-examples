import cdk = require('@aws-cdk/core');
import s3 = require('@aws-cdk/aws-s3');

export class HelloCdkStack extends cdk.Stack {
  constructor(
    scope: cdk.App,
    id: string,
    props?: cdk.StackProps
  ) {
    super(scope, id, props);

    new s3.Bucket(this, 'MyFirstBucket', {
      bucketName: "demo-for-you-all",
    });
  }
}

const app = new cdk.App();
new HelloCdkStack(app, 'StoreStack');
app.synth();
