import {App, aws_s3 as S3, CfnOutput, Duration, RemovalPolicy, Stack, StackProps} from 'aws-cdk-lib';
import {BucketProps} from "aws-cdk-lib/aws-s3/lib/bucket";
import {BlockPublicAccess, BucketAccessControl} from "aws-cdk-lib/aws-s3";
import {AllowedMethods, Distribution, OriginAccessIdentity, ViewerProtocolPolicy} from "aws-cdk-lib/aws-cloudfront";
import {PolicyStatement} from "aws-cdk-lib/aws-iam";
import {HostedZone, PublicHostedZone} from "aws-cdk-lib/aws-route53";
import {S3Origin} from "aws-cdk-lib/aws-cloudfront-origins";
import {DnsValidatedCertificate} from "aws-cdk-lib/aws-certificatemanager";

export interface StaticWebsiteStackProps extends StackProps {
    domainName: string;
    subdomain: string;
}

export class StaticWebsiteStack extends Stack {
    constructor(parent: App, name: string, props: StaticWebsiteStackProps) {
        super(parent, name, props);

        const hostedZone = HostedZone.fromLookup(this, "Zone", {
            domainName: props.domainName,
        });

        const wwwDomainName = `www.${props.domainName}`
        new CfnOutput(this, 'SiteDomainName', {value: 'https://' + props.domainName});
        new CfnOutput(this, 'WWWSiteDomainName', {value: 'https://' + wwwDomainName});
        new CfnOutput(this, "HostedZoneArn", {value: hostedZone.hostedZoneArn});

        const cert = new DnsValidatedCertificate(
            this,
            "SiteCertificate",
            {
                domainName: props.domainName,
                subjectAlternativeNames: [wwwDomainName],
                hostedZone: hostedZone,
                region: "us-east-1", // Cloudfront only checks this region for certificates.
            }
        );

        new CfnOutput(this, "Certificate", {value: cert.certificateArn});

        // The behaviour of the distribution is dynamic see: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cloudfront-readme.html
        // This bucket is handled as a bucket origin and CloudFront's redirect and error handling will be used.
        // The Origin will create an origin access identity and grant it access to the underlying bucket.
        // This can be used in conjunction with a bucket that is not public to require that your users access your content using CloudFront URLs and not S3 URLs directly.
        let bucketProps: BucketProps = {
            websiteIndexDocument: 'index.html',
            bucketName: `site-${props.domainName}`,
            autoDeleteObjects: true,
            removalPolicy: RemovalPolicy.DESTROY,
            publicReadAccess: false,
            accessControl: BucketAccessControl.PRIVATE,
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
        };

        const siteContentBucket = new S3.Bucket(this, props.domainName, bucketProps)

        new Distribution(this, 'CloudFrontDistribution', {
            domainNames: [props.domainName],
            defaultRootObject: 'index.html',
            certificate: cert,
            defaultBehavior: {
                compress: true,
                origin: new S3Origin(siteContentBucket),
                allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
                viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            },
            errorResponses: [
                {
                    httpStatus: 403,
                    responseHttpStatus: 403,
                    responsePagePath: '/error.html',
                    ttl: Duration.minutes(30),
                }
            ],
        })
    }
}