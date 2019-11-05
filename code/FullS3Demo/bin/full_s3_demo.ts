#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { FullS3DemoStack } from '../lib/full_s3_demo-stack';

const app = new cdk.App();
new FullS3DemoStack(app, 'FullS3DemoStack');
