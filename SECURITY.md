# Security policy

Report website or infrastructure vulnerabilities privately through GitHub's security advisory feature for this repository. Do not open a public issue with exploit details.

The site is static, its S3 origin is private, and production deployment uses short-lived GitHub OIDC credentials scoped to this repository's immutable identity and its main-only production environment. The application intentionally collects no visitor data.
