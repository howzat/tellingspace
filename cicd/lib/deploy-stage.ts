import {Stage, StageProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import {WebsiteCertificatesStack} from "./website-certificates";
import {StaticWebsiteStack} from "./static-website";

export class StaticWebsiteHostingDeployStage extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        const webCerts = new WebsiteCertificatesStack(this, 'WebSiteCertificates', {
            env: props?.env,
            apexDomain: this.node.tryGetContext('apexDomain'),
        });

        new StaticWebsiteStack(this, 'ToldSpacesWebsite', {
            env: props?.env,
            apexDomain: this.node.tryGetContext('apexDomain'),
            webSubdomain: this.node.tryGetContext('wwwSubdomain'),
            webCerts: webCerts,
        });
    }
}
