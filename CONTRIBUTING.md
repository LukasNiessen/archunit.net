# Contributing

Thanks for helping make architecture testing easier to discover and adopt.

1. Create a focused branch and keep copy factual about each implementation's maturity.
2. Run `npm ci`, `npm run lint`, `npm run check`, `npm test`, `npm run build`, and `npm run test:e2e`.
3. For infrastructure changes, run `terraform fmt -recursive` and validate both roots. Include the plan summary in the pull request.
4. Open a pull request. Production deployment runs only after the change reaches `main`.

Never commit credentials, Terraform state, generated plans, or personal data. Contributor avatars and profile links on the site come from public GitHub contribution history.
