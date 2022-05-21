#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {StaticWebsiteStack} from '../lib/static-website-stack';

console.log("environment ACCOUNT variables " + JSON.stringify(process.env.CDK_DEFAULT_ACCOUNT));
console.log("environment REGION variables " + JSON.stringify(process.env.CDK_DEFAULT_REGION));

const app = new cdk.App();
new StaticWebsiteStack(app, 'ToldSpacesWebsite', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
    },
    domainName: "toldspaces.com",
    subdomain: "api",
});