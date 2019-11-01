import cdk = require("@aws-cdk/core");
import lambda = require("@aws-cdk/aws-lambda");
import ssm = require("@aws-cdk/aws-ssm");

const layerParamName = "/layers/baseLayer";

export class LayerUseStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // fetch the Arn from param store
    const baseLayerArn = ssm.StringParameter.valueForStringParameter(
      this,
      layerParamName
    );
    // Create Event Source

    // generate layer version from arn
    const layer1 = lambda.LayerVersion.fromLayerVersionArn(
      this,asd
      "BaseLayerFromArn",
      baseLayerArn
    );

    // Then supply when you create a lambda
    new lambda.Function(this, "SomeName", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset("../lambda/aFunction"),
      handler: "index.handler",
      layers: [layer1]
    });
  }
}
