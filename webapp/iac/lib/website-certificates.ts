import {Stack, StackProps} from 'aws-cdk-lib';
import {HostedZone, IHostedZone} from "aws-cdk-lib/aws-route53";
import {DnsValidatedCertificate, ICertificate} from "aws-cdk-lib/aws-certificatemanager";
import {Construct} from "constructs";

export interface WebSiteCertificatesProps extends StackProps {
    apexDomain: string;
}

export class WebsiteCertificatesStack extends Stack {
    public readonly siteCertificate: ICertificate;
    public readonly hostedZone: IHostedZone;

    constructor(parent: Construct, name: string, props: WebSiteCertificatesProps) {
        super(parent, name, props);

        const wwwSubdomain = "www"
        const siteDomain = `${wwwSubdomain}.${props.apexDomain}`
        console.log(`creating certificates from HostedZone: ${props.apexDomain}`);
        console.log(`auto generated www subdomain: ${siteDomain}`);

        const zone = HostedZone.fromLookup(this, "Zone", {
            domainName: props.apexDomain,
        });

        this.hostedZone = zone;
        console.log(`hosted zone found: ${zone}`);

        this.siteCertificate = new DnsValidatedCertificate(
            this,
            "SiteCertificate",
            {
                domainName: props.apexDomain,
                subjectAlternativeNames: [siteDomain],
                hostedZone: zone,
                region: "us-east-1", // Cloudfront only checks this region for certificates.
            }
        );
    }
}
