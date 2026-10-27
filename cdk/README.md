# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   type-check the project
* `npm run watch`   watch for changes and type-check
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

## Static site deployment

The `Deploy Static Site via AWS CDK` GitHub Actions workflow deploys on pushes to
`main` and can also be started with **Run workflow** on `main`. Pull requests and
other branches build the site but do not use AWS credentials or deploy
infrastructure.

The Astro build keeps the Node adapter and server output enabled. The homepage,
about page, blog index, and blog posts are prerendered into `dist/client` for
the private S3/CloudFront site; server-rendered routes and the server bundle
remain available to the container deployment. After deployment, find the
CloudFront URL in the `StaticSiteStack` output named `CloudFrontDomainName`.
