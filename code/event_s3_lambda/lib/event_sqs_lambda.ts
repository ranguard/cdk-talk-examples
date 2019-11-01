import cdk = require("@aws-cdk/core");
import sqs = require("@aws-cdk/aws-sqs");
import { SqsEventSource } from "@aws-cdk/aws-lambda-event-sources";
import { Duration } from "@aws-cdk/core";
import lambda = require("@aws-cdk/aws-lambda");

export class EventSQSLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, "MyQueue", {
      visibilityTimeout: Duration.seconds(30),
      receiveMessageWaitTime: Duration.seconds(20)
    });

    let queueEvents = new SqsEventSource(queue, {
      batchSize: 10
    });

    // A function to process the SQS event(s)
    new lambda.Function(this, "EchoS3", {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("./lib/funcs/echo_s3/"),
      events: [queueEvents]
    });
  }
}
