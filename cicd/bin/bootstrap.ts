#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {PipelineConfig, SourceConfig, WebsitePipeline} from "../lib/pipeline";

const app = new cdk.App();

const appName = "ToldSpaces"
const sourceOwner = app.node.tryGetContext('sourceOwner');
const sourceRepositoryName = app.node.tryGetContext('sourceRepository');
const githubTokenPath = `github/${appName}/${sourceRepositoryName}`;

const environment = {
    account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION
};

let sourceConfig = new SourceConfig("main", sourceOwner, sourceRepositoryName, githubTokenPath);
let pipelineConfig = new PipelineConfig("ToldSpacesBuildPipeline", sourceConfig);
new WebsitePipeline(pipelineConfig, app, 'WebsitePipelineStack', {
    env: environment
})

app.synth();