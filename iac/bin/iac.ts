#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {WebSiteCertificates} from "../lib/website-certificates";
import {StaticWebsiteStack} from "../lib/static-website-stack";

const account = process.env.CDK_DEFAULT_ACCOUNT;
const region = process.env.CDK_DEFAULT_REGION;

const app = new cdk.App();

const webCerts = new WebSiteCertificates(app, 'WebSiteCertificates', {
    env: {
        account: account,
        region: region
    },
    apexDomain: app.node.tryGetContext('apexDomain'),
});

/*
export interface StaticWebsiteStackProps extends StackProps {
    apexDomain: string;
    webSubdomain: string;
    webCerts: WebSiteCertificates
}
 */
new StaticWebsiteStack(app, 'ToldSpacesWebsite', {
    env: {
        account: account,
        region: region
    },
    apexDomain: app.node.tryGetContext('apexDomain'),
    webSubdomain: app.node.tryGetContext('wwwSubdomain'),
    webCerts: webCerts,
});

app.synth();