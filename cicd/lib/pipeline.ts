import {SecretValue, Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Artifact} from "aws-cdk-lib/aws-codepipeline";
import {GitHubTrigger} from "aws-cdk-lib/aws-codepipeline-actions";
import {CodePipeline, CodePipelineSource, ShellStep} from "aws-cdk-lib/pipelines";
import {StaticWebsiteHostingDeployStage} from "./deploy-stage";
import {BuildSpec} from "aws-cdk-lib/aws-codebuild";

export class SourceConfig {
    constructor(branchName: string, owner: string, repositoryName: string) {
        this.branchName = branchName
        this.owner = owner
        this.repositoryName = repositoryName;
        this.output = new Artifact('SourceStageOutput')
    }

    public readonly branchName: string
    public readonly owner: string
    public readonly repositoryName: string;
    public readonly output: Artifact;

    public repositoryString(): string {
        return `${this.owner}/${this.repositoryName}`
    }

    public gitHubTokenPath(): string {
        return `/github/${this.repositoryString()}`
    }
}

export class BuildConfig {
    constructor() {
        this.output = new Artifact('BuildStageOutput')
    }

    public readonly output: Artifact;
}

export class PipelineConfig {
    constructor(appName: string, sourceConfig: SourceConfig, buildConfig: BuildConfig) {
        this.appName = appName;
        this.sourceStageConfig = sourceConfig
        this.buildStageConfig = buildConfig;
    }

    public readonly sourceStageConfig: SourceConfig;
    public readonly buildStageConfig: BuildConfig;
    public readonly appName: string;
}

export class WebsitePipeline extends Stack {
    private readonly pipelineConfig: PipelineConfig;
    private readonly authentication: SecretValue;

    constructor(scope: Construct, id: string, pipelineConfig: PipelineConfig, props?: StackProps) {
        super(scope, id, props);

        this.pipelineConfig = pipelineConfig;

        //CodePipeline object
        let sourceStageConfig = pipelineConfig.sourceStageConfig;
        let repoString = sourceStageConfig.repositoryString();
        console.log("repoString", repoString)
        console.log("branchName", sourceStageConfig.branchName)
        console.log("githubTokenPath", sourceStageConfig.gitHubTokenPath())

        this.authentication = SecretValue.secretsManager(sourceStageConfig.gitHubTokenPath());
        console.log("authentication", this.authentication)

        const codePipeline = new CodePipeline(this, `${pipelineConfig.appName}BuildPipeline`, {
            selfMutation: false,
            pipelineName: 'ToldSpacesCICDPipeline',
            crossAccountKeys: false,
            codeBuildDefaults: {
                partialBuildSpec: BuildSpec.fromObject({
                    version: "0.2",
                    env: {
                        "exported-variables": ["IS_CODEBUILD"]
                    },
                    phases: {
                        install: {
                            "runtime-versions": {
                                nodejs: 14
                            },
                            commands: [
                                'export IS_CODEBUILD="true"',
                                "npm install -g npm@8",
                                "n 16.15.1",
                                "node -v",
                                "npm -v",
                            ]
                        }
                    }
                })
            },
            synth: new ShellStep('Synth', {
                primaryOutputDirectory: 'cicd/cdk.out',
                input: CodePipelineSource.gitHub(repoString, sourceStageConfig.branchName, {
                    trigger: GitHubTrigger.WEBHOOK,
                    authentication: this.authentication,
                }),
                installCommands: [
                    "cd webapp/toldspaces",
                    "npm install",
                    "npm ci",
                    "cd ../../cicd",
                    "npm install",
                    "npm install -g aws-cdk",
                ],
                commands: [
                    "echo commands",
                    "cd ../webapp/toldspaces",
                    "ls -la",
                    "npm run clean & npm run build",
                    "cd ../../cicd",
                    "cdk synth",
                ],
            }),
        });

        let staticWebsiteHostingDeployStage = new StaticWebsiteHostingDeployStage(this, 'DeployStage', {env: props?.env});
        codePipeline.addStage(staticWebsiteHostingDeployStage, {})
    }
}