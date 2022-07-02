# Toldspaces CICD IaC

The project directory contains both the code that creates the code building pipeline and the code the pipeline is
going to build and deploy. The CICD `bootstrap.ts` CDK project creates the CodeBuild Pipeline that builds and 
deploys a Gatsby static site to an S3 bucket with a Cloudfront distribution.

# Building the Pipeline
The pipeline relies on a Github token stored (by hand) in AWS `SecretsManager` to register hooks for triggering the build.
Running the script should produce somthing like the following output.

This should only need to be done when a change to the pipeline is required.

```shell
cd cicd
aws-vault exec tsdev -- cdk deploy -c sourceOwner=howzat -c sourceRepository=toldspaces
Enter token for arn:aws:iam::678975692412:mfa/tsdev: 926768
SecretValue {
  creationStack: [ 'stack traces disabled' ],
  value: CfnDynamicReference {
    creationStack: [ 'stack traces disabled' ],
    value: '{{resolve:secretsmanager:/github/howzat/toldspaces:SecretString:::}}'
  },
  rawValue: CfnDynamicReference {
    creationStack: [ 'stack traces disabled' ],
    value: '{{resolve:secretsmanager:/github/howzat/toldspaces:SecretString:::}}'
  }
}
${Token[TOKEN.198]}

✨  Synthesis time: 7.23s

WebsitePipelineStack: deploying...
[0%] start: Publishing c21926fa4cbb9eb34d01c33edecc868ba74f072ad695a87ba2012aa3fee3acff:678975692412-eu-west-1
[100%] success: Published c21926fa4cbb9eb34d01c33edecc868ba74f072ad695a87ba2012aa3fee3acff:678975692412-eu-west-1
WebsitePipelineStack: creating CloudFormation changeset...

 ✅  WebsitePipelineStack

✨  Deployment time: 33.95s
```

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
