import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');
import ssm = require('@aws-cdk/aws-ssm');

const layerParamName = '/layers/baseLayer';

export class LayerEgStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a layer
    const baseLayer = new lambda.LayerVersion(
      this,
      'MyBaseLayer',
      {
        compatibleRuntimes: [
          lambda.Runtime.NODEJS_10_X
        ],
        code: lambda.Code.fromAsset('../layer/base')
      }
    );

    // Record the versionArn into SSM
    new ssm.StringParameter(this, 'VersionArn', {
      parameterName: layerParamName,
      stringValue: baseLayer.layerVersionArn,
    });
  }
}
