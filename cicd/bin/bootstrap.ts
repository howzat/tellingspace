#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {BuildConfig, PipelineConfig, SourceConfig, WebsitePipeline} from "../lib/pipeline";

const app = new cdk.App();

const appName = "ToldSpaces"
const sourceOwner = app.node.tryGetContext('sourceOwner');
const sourceRepositoryName = app.node.tryGetContext('sourceRepository');

const environment = {
    account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION
};


const sourceConfig = new SourceConfig("main", sourceOwner, sourceRepositoryName);
const pipelineConfig = new PipelineConfig(appName, sourceConfig, new BuildConfig());

new WebsitePipeline(pipelineConfig, app, 'WebsitePipelineStack', {
    env: environment
})

app.synth();