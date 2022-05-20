import {App, aws_s3 as S3, CfnOutput, RemovalPolicy, Stack, StackProps} from 'aws-cdk-lib';
import {BucketProps} from "aws-cdk-lib/aws-s3/lib/bucket";
import {BlockPublicAccess, BucketAccessControl} from "@aws-cdk/aws-s3";
import {OriginAccessIdentity} from "aws-cdk-lib/aws-cloudfront";
import {PolicyStatement} from "aws-cdk-lib/aws-iam";
import {HostedZone} from "aws-cdk-lib/aws-route53";

export interface StaticSiteProps extends StackProps {
    domainName: string;
}

export class WebsiteStack extends Stack {
    constructor(parent: App, name: string, props: StaticSiteProps) {
        super(parent, name, props);

        let bucketProps: BucketProps = {
            autoDeleteObjects: true,
            removalPolicy: RemovalPolicy.DESTROY,
            publicReadAccess: false,
            accessControl: BucketAccessControl.PRIVATE,
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
        };


        const wwwDomainName = `www.${props.domainName}`

        new CfnOutput(this, 'Site', {value: 'https://' + wwwDomainName});


        const domainBucket = new S3.Bucket(this, props.domainName, bucketProps)

        // secure Amazon S3 access to only a special CloudFront user
        const accessIdentity = new OriginAccessIdentity(this, 'CloudfrontAccess', {
            comment: `Origin Access Identity for ${name}`,
        })

        const zone = HostedZone.fromLookup(this, "Zone", {
            domainName: props.domainName,
        });

        new CfnOutput(this, "Site", {value: "https://" + wwwDomainName});

        const cloudfrontPolicyStatement = new PolicyStatement()
        cloudfrontPolicyStatement.addActions('s3:GetObject')
        cloudfrontPolicyStatement.addPrincipals(accessIdentity.grantPrincipal)
        cloudfrontPolicyStatement.addResources(domainBucket.arnForObjects('*'));
    }
}
