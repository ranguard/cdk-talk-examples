import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import LayerEg = require('../lib/layer_eg-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new LayerEg.LayerEgStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});