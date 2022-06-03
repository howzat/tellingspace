import {aws_config, SecretValue, Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Artifact, Pipeline} from "aws-cdk-lib/aws-codepipeline";
import {GitHubSourceAction} from "aws-cdk-lib/aws-codepipeline-actions";
import {pipeline} from "stream";
import {sourceArtifactBounds} from "aws-cdk-lib/aws-codepipeline-actions/lib/common";

export class SourceConfig {
    constructor(branchName: string, owner: string, repositoryName: string, githubTokenPath: string) {
        this.branchName = branchName
        this.owner = owner
        this.repositoryName = repositoryName;
        this.githubTokenPath = githubTokenPath
    }

    public readonly branchName: string
    public readonly owner: string
    public readonly repositoryName: string;
    public readonly githubTokenPath: string
}

export class PipelineConfig {
    constructor(appName: string, sourceConfig: SourceConfig) {
        this.appName = appName;
        this.sourceConfig = sourceConfig
    }

    public readonly sourceConfig: SourceConfig;
    public readonly appName: string;
}

export class WebsitePipeline extends Stack {
    constructor(pipelineConfig: PipelineConfig, scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const sourceConfig = pipelineConfig.sourceConfig;

        //CodePipeline object
        const codePipeline = new Pipeline(this, `${pipelineConfig.appName}CodePipeline`, {
            crossAccountKeys: false
        });

        //Source stage
        const sourceStage = new SourceStage(this, pipelineConfig.appName, pipelineConfig.sourceConfig);
        codePipeline.addStage({
            stageName: "SourceGitHub",
            actions: [sourceStage.getGithubSourceAction()]
        });
    }
}

export const PipelineWithSourceConfig =  (source:SourceConfig) => (scope: Construct, id: string, props: StackProps) => {
    return (scope: Construct, id: string, props: StackProps) => {
        return new WebsitePipeline(new PipelineConfig("", source), scope, id, props)
    };
};

export class SourceStage {

    private stack: Stack;
    private readonly appName: string;
    private readonly config: SourceConfig;
    private readonly sourceOutput: Artifact;

    constructor(stack: Stack, appName: string, config: SourceConfig) {
        this.stack = stack;
        this.appName = appName;
        this.config = config;
        this.sourceOutput = new Artifact('SourceArtifact');
    }

    public getGithubSourceAction = (): GitHubSourceAction => {
        const {owner, repositoryName, branchName} = this.config;

        return new GitHubSourceAction({
            actionName: 'GitHubSource',
            owner: this.config.owner,
            repo: this.config.repositoryName,
            oauthToken: SecretValue.secretsManager(this.config.githubTokenPath),
            output: this.sourceOutput,
            branch: this.config.branchName,
        })
    }

    public getSourceOutput = (): Artifact => {
        return this.sourceOutput;
    }
}


/*

const pipeline = new codepipeline.Pipeline(this, 'MyPipeline');
const sourceOutput = new codepipeline.Artifact();
const sourceAction = new codepipeline_actions.GitHubSourceAction({
  actionName: 'GitHub_Source',
  owner: 'awslabs',
  repo: 'aws-cdk',
  oauthToken: SecretValue.secretsManager('my-github-token'),
  output: sourceOutput,
  branch: 'develop', // default: 'master'
});
pipeline.addStage({
  stageName: 'Source',
  actions: [sourceAction],
});


export class PipelineStack extends cdk.Stack {

    public readonly pipeline: CodePipeline

    constructor(source: CodePipelineSource, scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.pipeline = new CodePipeline(this, 'ToldSpacesBuildPipeline', {
            pipelineName: 'toldspaces',
            synth: new ShellStep('Synth', {
                input: source,
                commands: [
                    'npm ci',
                    'npm run build',
                    'npx cdk synth'
                ]
            })
        });

        new DeployWebApplicationStage(this, "DeployWebApplicationStage", {
            env: props?.env
        })
    }
}
 */