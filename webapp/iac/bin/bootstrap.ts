#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {WebsiteCertificatesStack} from "../lib/website-certificates";
import {StaticWebsiteStack} from "../lib/static-website";

const app = new cdk.App();

const environment = {
    account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION
};

const webCerts = new WebsiteCertificatesStack(app, 'WebSiteCertificates', {
    env: environment,
    apexDomain: app.node.tryGetContext('apexDomain'),
});

new StaticWebsiteStack(app, 'ToldSpacesWebsite', {
    env: environment,
    apexDomain: app.node.tryGetContext('apexDomain'),
    webSubdomain: app.node.tryGetContext('wwwSubdomain'),
    webCerts: webCerts,
});

app.synth();