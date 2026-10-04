import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

export class StaticSiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. Create S3 Bucket for Build Artifacts
    const siteBucket = new s3.Bucket(this, 'SiteBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // 2. Create CloudFront CDN Distribution with Origin Access Control (OAC)
    const distribution = new cloudfront.Distribution(this, 'SiteDistribution', {
      defaultBehavior: { 
        origin: origins.S3BucketOrigin.withOriginAccessControl(siteBucket) 
      },
      defaultRootObject: 'index.html',
    });

    // 3. Deploy Local dist/ Output to S3 & Invalidate CloudFront Cache Automatically
    new s3deploy.BucketDeployment(this, 'DeploySite', {
      sources: [s3deploy.Source.asset('../dist')],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ['/*'], // Purges global CDN cache
    });
  }
}