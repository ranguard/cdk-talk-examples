#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { EventS3LambdaStack } from '../lib/event_s3_lambda-stack';

const app = new cdk.App();
new EventS3LambdaStack(app, 'EventS3LambdaStack');
