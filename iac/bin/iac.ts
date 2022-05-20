#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {WebsiteStack} from '../lib/website-stack';

const app = new cdk.App();
console.log("environment ACCOUNT variables " + JSON.stringify(process.env.CDK_DEFAULT_ACCOUNT));
console.log("environment REGION variables " + JSON.stringify(process.env.CDK_DEFAULT_REGION));
console.log("environment DOMAIN_NAME variables " + JSON.stringify(process.env.DOMAIN_NAME));

const envInUse = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
};

const domainNameInUse = process.env.DOMAIN_NAME
if (!domainNameInUse) throw new Error('Set an environment variable for DOMAIN_NAME')

new WebsiteStack(app, 'TellingSpaceIaCWebsiteStack', {
    env: envInUse,
    domainName: domainNameInUse,
});