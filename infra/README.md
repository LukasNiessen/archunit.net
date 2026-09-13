# AWS infrastructure

Two Terraform roots keep bootstrapping separate from the public site:

- `bootstrap` adopts the one-time-created S3 backend bucket and manages its hardening, retention, and the GitHub Actions OIDC role.
- `site` manages the private content and log buckets, ACM certificate, CloudFront origin access control, clean-URL function, response headers, distribution, and origin policy.

Terraform and the AWS provider are pinned exact versions. State is encrypted, versioned, remotely locked, excluded from Git, and contains no application secrets. The CI role trusts only the repository's immutable GitHub identity in the `production` environment; that environment accepts deployments only from `main`.

## Delivery model

Pull requests run formatting, validation, application checks, production-build verification, and browser tests without AWS credentials. A successful `main` build assumes the AWS role through GitHub OIDC, saves each Terraform plan, rejects any plan containing a deletion or replacement, applies the exact accepted plan, syncs `dist/`, invalidates CloudFront, and smoke-tests the CloudFront deployment.

## DNS activation

Certificate creation is deliberately two-phase because Squarespace owns DNS. For a new hostname, first plan and apply with `-var="enable_custom_domain=false"`, add the CNAME returned by `certificate_validation_records`, wait for ACM issuance, and then apply the normal configuration. The committed default enables the custom domain.

The canonical site is `www.archunit.net`. Squarespace forwards the apex hostname to `www`, keeping one indexable origin while CloudFront serves the content from AWS.

## Local commands

```bash
terraform -chdir=infra/bootstrap init
terraform -chdir=infra/bootstrap plan -out=bootstrap.tfplan
terraform -chdir=infra/bootstrap apply bootstrap.tfplan

terraform -chdir=infra/site init
terraform -chdir=infra/site plan -out=site.tfplan
terraform -chdir=infra/site apply site.tfplan
```

Never commit `.tfplan`, state, local certificate bundles, or environment files. Destructive plans are a manual recovery operation and are blocked in CI.
