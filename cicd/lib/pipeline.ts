import {SecretValue, Stack, StackProps, Stage, StageProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Artifact, Pipeline} from "aws-cdk-lib/aws-codepipeline";
import {CodeBuildAction, GitHubSourceAction, GitHubTrigger} from "aws-cdk-lib/aws-codepipeline-actions";
import {BuildSpec, Project} from "aws-cdk-lib/aws-codebuild";
import {Bucket, IBucket} from "aws-cdk-lib/aws-s3";
import {CodePipeline, CodePipelineSource, ShellStep} from "aws-cdk-lib/pipelines";
import yaml from "js-yaml";
import fs from "fs";
import * as path from "path";

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
    public readonly githubTokenPath: string
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

    constructor(pipelineConfig: PipelineConfig, scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.pipelineConfig = pipelineConfig;

        //CodePipeline object
        let sourceStageConfig = pipelineConfig.sourceStageConfig;
        let repoString = sourceStageConfig.repositoryString();
        console.log(repoString)
        console.log(sourceStageConfig.branchName)
        console.log(sourceStageConfig.gitHubTokenPath())

        this.authentication = SecretValue.secretsManager(sourceStageConfig.gitHubTokenPath());
        console.log(this.authentication)
        console.log(this.authentication.unsafeUnwrap())

        const codePipeline = new CodePipeline(this, `${pipelineConfig.appName}BuildPipeline`, {
            pipelineName: 'ToldSpacesCICDPipeline',
            crossAccountKeys: false,
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.gitHub(repoString, sourceStageConfig.branchName, {
                    trigger: GitHubTrigger.WEBHOOK,
                    authentication: this.authentication,
                }),
                installCommands: ["npm install -g aws-cdk"],
                commands: [
                    'ls -la',
                    'cd webapp',
                    'ls -la',
                ],
            }),
        });

        let buildStage = new BuildStage(this, this.pipelineConfig);
        let buildStageAction: CodeBuildAction = buildStage.getBuildStageAction();
        codePipeline.addStage({
            stageName: "BuildStaticWebsite",
            actions:
        });
    }
}

export class SourceStage {
    constructor(stack: Stack, artifactBucket: IBucket, config: PipelineConfig) {
        this.artifactBucket = artifactBucket;
        this.stack = stack;
        this.appName = config.appName;
        this.config = config;
    }

    public getGithubSourceAction = (): GitHubSourceAction => {
        const {owner, repositoryName, branchName, githubTokenPath} = this.config.sourceStageConfig;

        return new GitHubSourceAction({
            actionName: 'GitHubSource',
            owner: owner,
            repo: repositoryName,
            oauthToken: SecretValue.secretsManager(githubTokenPath),
            output: this.config.sourceStageConfig.output,
            branch: branchName,
            trigger: GitHubTrigger.WEBHOOK,
        })
    }

    private artifactBucket: IBucket;
    private stack: Stack;
    private readonly appName: string;
    private readonly config: PipelineConfig;
}


export class BuildToldSpacesWebsite extends Stage {

    constructor(scope: Construct, id: string, config: PipelineConfig, props?: StageProps) {
        super(scope, id, props);
        this.config = config;
    }

    public getBuildStageAction = (): CodeBuildAction => {
        let buildspecYaml = path.resolve(__dirname, '../webapp/buildspec.yml');
        console.log(`computed buildspec location ${buildspecYaml}`)
        let exists = fs.existsSync(buildspecYaml);
        console.log(`buildspecYaml exists at path ${path}=${exists}`)

        let fileContents = fs.readFileSync(buildspecYaml, 'utf8');
        let buildspec = yaml.load(fileContents) as { [key: string]: any };

        console.log(`read buildspec successfully ${buildspec}`);

        return new CodeBuildAction({
            actionName: "Build Static Website",
            project: new Project(this.stack, "BuildWebsite", {
                buildSpec: BuildSpec.fromObject(buildspec),
            }),
            input: this.config.sourceStageConfig.output,
            outputs: [this.config.buildStageConfig.output],
        })
    }

    private config: PipelineConfig;
    private readonly stack: Stack;
}


class DoNothingStage extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        console.log("Nothing to deploy");
    }
}