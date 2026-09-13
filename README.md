# archunit.net

The official home of **ArchUnit**: architecture-testing libraries for TypeScript, Python, .NET, Ruby, Rust, Zig, Go, Java, and PHP.

The site is built as static HTML with Astro and deployed to AWS through Terraform and GitHub Actions.

## Local development

```bash
npm ci
npm run dev
```

## Quality gates

```bash
npm run lint
npm run check
npm run test
npm run build
npx playwright install chromium
npm run test:e2e
```

## Infrastructure

Terraform roots live in `infra/bootstrap` and `infra/site`. See `infra/README.md` for the delivery and recovery model.

## License

Website source is released under the MIT License. Each linked ArchUnit implementation retains the license declared in its own repository.
