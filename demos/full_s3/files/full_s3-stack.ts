import cdk = require('@aws-cdk/core');
import s3 = require('@aws-cdk/aws-s3');
import lambda = require('@aws-cdk/aws-lambda');
import { S3EventSource } from '@aws-cdk/aws-lambda-event-sources';

export class FullS3DemoStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // object store
    const myBucket = new s3.Bucket(this, 'aBucket', {});

    // create an event source for new objects
    let bucketEvents = new S3EventSource(myBucket, {
      events: [ s3.EventType.OBJECT_CREATED],
    });

    // A function to process the S3 event
    const fn = new lambda.Function(this, 'EchoS3', {
      runtime: lambda.Runtime.NODEJS_8_10,
      handler: 'index.handler',
      code: lambda.Code.fromAsset([__dirname, '../functions/s3_event/'].join('/')),
      events: [bucketEvents],
      environment: {
        SOME: 'value'
      }
    });

    // Remember to let the function read/write to the 
    // bucket if it needs more than just the object key
    myBucket.grantReadWrite(fn);

  }
}
