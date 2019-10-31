#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { LayerEgStack } from '../lib/layer_eg-stack';

const app = new cdk.App();
new LayerEgStack(app, 'LayerEgStack');
