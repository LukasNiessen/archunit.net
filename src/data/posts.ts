export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  links?: { label: string; url: string }[];
  code?: string;
  codeLanguage?: string;
  codeFilename?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  category: string;
  published: string;
  publishedLabel: string;
  readingTime: string;
  sourceNote: string;
  authorSlugs?: string[];
  externalUrl?: string;
  imageUrl?: string;
  sections: BlogSection[];
}

export const posts: BlogPost[] = [
  {
    slug: 'your-python-architecture-should-be-tested-not-just-documented',
    title: 'Your Python Architecture Should Be Tested, Not Just Documented',
    summary:
      'How ArchUnitPython turns dependency rules, layer boundaries, diagrams, and code metrics into tests your CI can enforce.',
    category: 'Python',
    published: '2026-07-26',
    publishedLabel: '26 July 2026',
    readingTime: '6 min read',
    sourceNote: 'Published on Medium by Tristan Kruse.',
    authorSlugs: ['tristan-kruse'],
    externalUrl:
      'https://medium.com/@krusetristan1/your-python-architecture-should-be-tested-not-just-documented-23b2e7a18c00',
    imageUrl: 'https://miro.medium.com/v2/resize:fit:1200/1*XGKX9C-m5-b9ZdcdTGaTUg.png',
    sections: [],
  },
  {
    slug: 'archunitts-vs-tsarch',
    title: 'ArchUnitTS vs. tsarch in 2026: which architecture test should you choose?',
    summary:
      'A hands-on comparison of maintenance, correctness, project resolution, features, and performance for TypeScript architecture testing.',
    category: 'TypeScript',
    published: '2026-09-12',
    publishedLabel: '12 September 2026',
    readingTime: '14 min read',
    sourceNote: 'Adapted from Lukas Niessen’s original hands-on ArchUnitTS and tsarch comparison.',
    authorSlugs: ['lukas-niessen'],
    sections: [
      {
        heading: 'The short answer',
        paragraphs: [
          'Angular Architects recently showed how an architecture rule can become a deterministic guardrail for AI coding agents. The central idea is right: an agent may overlook prose, but it cannot negotiate with a failing test that names the dependency it introduced.',
          'Their example uses tsarch. We maintain ArchUnitTS, so this is a maintainer’s comparison rather than a neutral consumer report. To make the conclusion useful, the original analysis reproduced the Angular Architects example, inspected both repositories, and ran both tools against the same source tree.',
          'For a new TypeScript project in 2026, the evidence favors ArchUnitTS. tsarch can still run basic dependency rules, but ArchUnitTS is actively maintained, follows modern TypeScript projects, fails empty selections by default, covers more architecture concerns, and was faster in both reported measurements.',
        ],
        bullets: [
          'ArchUnitTS 2.5.0 was released on 12 September 2026; tsarch 5.4.1 was released on 23 December 2024.',
          'ArchUnitTS supports inherited TypeScript configuration and project references.',
          'ArchUnitTS fails safely when a selector matches nothing unless that behavior is explicitly allowed.',
          'The feature set includes dependency rules, cycles, metrics, reports, and dedicated Jest, Vitest, and Jasmine matchers.',
        ],
      },
      {
        heading: 'Maintenance belongs to correctness',
        paragraphs: [
          'An architecture test sits deep in the delivery loop. It parses the project, resolves imports, runs in continuous integration, and may block every pull request. When it is also used as an agent stop hook, compatibility and maintenance become part of the correctness story rather than background project hygiene.',
          'At the time of the comparison, the latest tsarch release was nearly two years old. Its repository was not archived, and a TypeScript 6 migration pull request existed, but the recent merged history contained documentation updates rather than current source changes. Its package manifest still referenced TypeScript 3.9-era infrastructure and older test and CI tooling.',
          'ArchUnitTS had recently shipped fixes for Vitest 4, TypeScript path aliases, referenced projects, folder exclusions, coupling calculations, and distance metrics. Those are practical examples of why an architecture tool needs a short path from a reported compatibility or correctness problem to a released fix.',
        ],
      },
      {
        heading: 'A guardrail must fail when it checked nothing',
        paragraphs: [
          'The most important behavioral difference is what happens when a selector becomes empty. Imagine that a rule targets src/payment and someone later renames the folder to src/payments. The boundary did not become valid. The test stopped observing it.',
          'The comparison reproduced tsarch returning an empty violation array for a nonexistent selector, which lets the test pass. ArchUnitTS instead returns an EmptyTestViolation by default. Teams can opt out with allowEmptyTests when an empty selection is intentional, but the safe behavior remains the default.',
          'This matters even more in agent-assisted development. Agents can rename directories and reshape modules quickly. A useful verifier must detect when the assumption behind its own selector disappears, otherwise a green check can claim protection without examining a single source file.',
        ],
        code: [
          "projectFiles('tsconfig.json')",
          "  .inFolder('src/payment')",
          '  .shouldNot()',
          '  .dependOnFiles()',
          "  .inFolder('src/web')",
          '  .check();',
          '',
          'Selector no longer matches:',
          'tsarch       → 0 files → 0 violations → green',
          'ArchUnitTS   → 0 files → EmptyTestViolation → red',
        ].join('\n'),
        codeLanguage: 'typescript',
        codeFilename: 'architecture.test.ts',
      },
      {
        heading: 'Modern projects need modern TypeScript resolution',
        paragraphs: [
          'The Angular Architects tutorial creates a dedicated architecture tsconfig and repeats target, module format, module resolution, decorators, aliases, includes, and excludes because tsarch does not resolve an extended configuration in that setup. The duplication is more than cosmetic. It creates a second description of the project that can drift from the build.',
          'ArchUnitTS reads configuration through the TypeScript API and resolves imports in the context of referenced projects. Inherited options, path aliases, composite projects, and monorepo layouts are therefore evaluated through the configuration the application already uses.',
          'The compiler dependency is relevant as well. The benchmark application used TypeScript 5.9.3, while tsarch 5.4.1 installed a nested TypeScript 3.9.10. Older code can remain useful, but module resolution, supported syntax, and project configuration evolve with the language ecosystem.',
        ],
      },
      {
        heading: 'What tsarch still gets right',
        paragraphs: [
          'tsarch still works for basic architecture rules. Its generic check method can run from different test runners, and the four dependency rules in the Angular Architects example passed under Vitest 4 during the reproduction.',
          'It also has a longer history and more accumulated GitHub stars in the dated comparison. Historical attention is useful context, but it does not directly measure current maintenance, modern project compatibility, or whether a check fails safely.',
          'A team with a stable tsarch setup may reasonably decide that migration cost is greater than the immediate benefit. The recommendation changes for a new or long-lived project, where adopting the actively maintained option avoids taking ownership of compatibility work from the first day.',
        ],
        bullets: [
          'Only stores may access clients.',
          'Only smart components may access stores, with defined locality exceptions.',
          'Stores must not access other stores.',
          'Dumb components must not access smart components.',
        ],
      },
      {
        heading: 'The shared rules are only the starting point',
        paragraphs: [
          'Both libraries can express common import boundaries. The distinction grows when an architecture program moves beyond a handful of allowed and forbidden edges. ArchUnitTS provides selectors, exclusions, custom predicates, empty-test controls, cycle checks, slice rules, Nx rules, and PlantUML conformance through one integrated model.',
          'It also treats structural metrics as first-class signals. File and dependency counts, cohesion, afferent and efferent coupling, instability, abstractness, distance from the main sequence, zones, and custom metrics help teams observe design pressure before it becomes a broken boundary.',
          'The dependency model can be exported as DOT, Mermaid, D2, CSV, JSON, or standalone HTML. That lets the same extracted graph drive a test assertion, a CI failure, machine-readable agent feedback, and a reviewable visualization instead of rebuilding a separate model for every consumer.',
        ],
        bullets: [
          'Use dependency rules to answer whether an edge is allowed.',
          'Use cycle checks to find complete paths that prevent independent change.',
          'Use metrics as team-owned sensors rather than universal quality scores.',
          'Use reports to make the evaluated graph visible to reviewers and automation.',
        ],
      },
      {
        heading: 'Performance on the same source tree',
        paragraphs: [
          'The original comparison used the Angular Architects flights42 demonstration at commit caaac81 with Angular 21.2, TypeScript 5.9.3, and Vitest 4.0.18. Both libraries found the same 198 internal dependency edges, so the timing compared equivalent graph results rather than different amounts of work.',
          'In the initial order-balanced four-run measurement, ArchUnitTS had a median of 3.812 seconds and tsarch 7.434 seconds. A clean rerun with ArchUnitTS 2.5.0 measured 4.274 seconds against 5.171 seconds for tsarch.',
          'That places the observed ArchUnitTS advantage between roughly 21 and 95 percent across the two measurements. A benchmark is a snapshot of one project and environment, not a universal guarantee, but it removes the concern that the broader feature set necessarily makes the newer tool slower for this workload.',
        ],
        bullets: [
          'Initial median: ArchUnitTS 3.812 s; tsarch 7.434 s.',
          'Clean rerun median: ArchUnitTS 4.274 s; tsarch 5.171 s.',
          'Both tools identified 198 internal dependency edges.',
        ],
      },
      {
        heading: 'Security, dependencies, and lineage',
        paragraphs: [
          'A minimal consumer installation of tsarch reported no known npm audit vulnerability during the comparison. The maintenance concern appeared in the repository development tree and CI toolchain, which included substantially older dependencies and a failing current workflow at the snapshot date. That is maintenance risk, not evidence of a shipped exploit.',
          'ArchUnitTS also has a clear lineage. Its beginnings used code from the MIT-licensed tsarch project, which brought ideas from Java’s ArchUnit into TypeScript. Since then, ArchUnitTS has developed its own maintenance cadence, rules, metrics, reporting, integrations, and project-resolution behavior.',
          'Both facts should remain visible. tsarch made an important early contribution to TypeScript architecture testing, and ArchUnitTS is now the stronger default for a new project. Respecting the origin does not require treating the current packages as equivalent.',
        ],
      },
      {
        heading: 'Recommendation and reproduction',
        paragraphs: [
          'For an existing tsarch installation that protects a stable project, evaluate the migration cost against the specific gaps that affect the codebase. Confirm that selectors still match, pin the supported toolchain, and make ownership of future compatibility explicit.',
          'For a new project, choose ArchUnitTS. It follows current TypeScript configuration, fails safely on empty selectors, provides broader rules and architecture signals, integrates directly with common test runners, and performed better in both documented measurements.',
          'Whichever library a team uses, keep the rule in the ordinary delivery loop. A useful architecture test should run locally and in CI, report the source-backed reason for a failure, and stay protected from changes that merely weaken the verifier to make the build green.',
        ],
        code: 'npm install --save-dev archunit',
        codeLanguage: 'bash',
        codeFilename: 'terminal',
        links: [
          {
            label: 'Angular Architects: tsarch for AI coding agents',
            url: 'https://www.angulararchitects.io/en/blog/architecture-beyond-layers-tsarch-for-ai-agents/',
          },
          {
            label: 'Benchmark source: flights42 at caaac81',
            url: 'https://github.com/angular-architects/flights42/tree/caaac81f414188d2ca7410a6e1e236d4a200e5e4',
          },
          { label: 'ArchUnitTS repository', url: 'https://github.com/LukasNiessen/ArchUnitTS' },
          { label: 'tsarch repository', url: 'https://github.com/ts-arch/ts-arch' },
          {
            label: 'tsarch empty-selector issue',
            url: 'https://github.com/ts-arch/ts-arch/issues/73',
          },
        ],
      },
    ],
  },
  {
    slug: 'why-archunitts-exists',
    title: 'Why ArchUnitTS exists',
    summary:
      'The practical need that started one TypeScript library and grew into an architecture-testing family.',
    category: 'Project',
    published: '2025-10-15',
    publishedLabel: '15 October 2025',
    readingTime: '12 min read',
    sourceNote: 'Adapted from the original ArchUnitTS milestone essay by Lukas Niessen.',
    authorSlugs: ['lukas-niessen'],
    sections: [
      {
        heading: 'A missing guardrail',
        paragraphs: [
          'ArchUnitTS began during a consulting project. The team needed the kind of executable architecture rules Java developers knew from ArchUnit, but the available TypeScript tools did not cover the project needs. The gap was practical: architectural boundaries existed in diagrams and conversations, but pull requests could still violate them without a deterministic signal.',
          'Lukas Niessen started building the missing tool in his spare time. The first goal was deliberately small: describe a dependency rule in readable TypeScript and run it inside the test suite the project already trusted.',
          'That delivery context shaped the library. The rule could not require a separate governance server, a new review ceremony, or a specialist to interpret the result. It had to live beside ordinary tests, follow the project configuration already in source control, and identify the relationship that made the decision fail.',
        ],
        code: [
          "import { projectFiles } from 'archunit';",
          '',
          "it('keeps presentation away from persistence', async () => {",
          '  const rule = projectFiles()',
          "    .inFolder('src/presentation/**')",
          '    .shouldNot()',
          '    .dependOnFiles()',
          "    .inFolder('src/persistence/**');",
          '',
          '  await expect(rule).toPassAsync();',
          '});',
        ].join('\n'),
        codeLanguage: 'typescript',
        codeFilename: 'architecture.test.ts',
      },
      {
        heading: 'Why the boundary belongs in a test',
        paragraphs: [
          'Architecture documentation is useful for explaining a system, but it is passive. It cannot notice that a controller imported a repository, that two feature packages formed a cycle, or that a supposedly isolated domain started depending on a framework. Code review can notice those changes, but only when the reviewer knows the decision, sees the relevant edge, and has enough time to follow the dependency path.',
          'An architecture test turns that memory problem into repeatable evaluation. The test selects a part of the source tree, asks a structural question, and fails with evidence when the graph disagrees. The decision stays reviewable because it is expressed as code, and it stays current because the same check runs after every change.',
          'This does not replace architecture diagrams or senior review. It gives both of them a feedback loop. Diagrams communicate the intended shape, review handles context and exceptions, and the executable rule protects the narrow invariant the team has agreed should always hold.',
        ],
        bullets: [
          'Run the rule with Jest, Vitest, Jasmine, or a generic check call.',
          'Keep the architectural rationale beside the selector and condition.',
          'Return concrete source paths instead of a generic policy failure.',
          'Review changes to the rule in the same pull request as the design decision.',
        ],
      },
      {
        heading: 'From a rule to a feedback system',
        paragraphs: [
          'Dependency direction was only the starting point. Real systems also need cycle detection, layer and slice policies, code metrics, diagrams, reports, and support for modern TypeScript project resolution. Each capability came from the same question: what evidence would help a team protect an architectural decision while the code is changing?',
          'That framing keeps architecture testing close to delivery. Rules run locally, in pull requests, and in continuous integration. A violation points to source files and dependency paths, giving both people and coding agents a concrete next action.',
          'The internal dependency graph became the reusable center of the product. A file rule can inspect direct edges, a layer rule can group endpoints by responsibility, a slice rule can derive repeated modules, and a report can render the same relationships for a different audience. The graph is not an incidental implementation detail. It is the shared evidence from which each architectural view is projected.',
        ],
        bullets: [
          'Fail when a selector matches nothing, so a renamed folder cannot create a false green result.',
          'Use current TypeScript configuration, path aliases, and project references.',
          'Export the same dependency graph as test output, JSON, Mermaid, D2, DOT, CSV, or HTML.',
        ],
      },
      {
        heading: 'Follow the TypeScript project, not a shadow copy',
        paragraphs: [
          'Modern TypeScript systems are rarely a flat directory of relative imports. They use inherited tsconfig files, path aliases, package exports, project references, generated declarations, and different source roots across applications and libraries. An architecture test that resolves a different project from the compiler can be internally consistent and still answer the wrong question.',
          'ArchUnitTS therefore uses TypeScript project configuration and compiler-backed module resolution. The analyzer follows include and exclude rules, compiler options, aliases, and referenced projects so that an import such as @payments/domain is connected to the source file the application actually builds.',
          'This becomes especially important in monorepos. A duplicated architecture-only configuration drifts as workspaces evolve. Reading the real project removes that synchronization point and makes a failed rule easier to reproduce locally because the architecture test and the compiler begin from the same model.',
        ],
      },
      {
        heading: 'A green test must prove that it checked something',
        paragraphs: [
          'Structural rules have a failure mode that ordinary assertions rarely face: the selector itself can become stale. If src/payment is renamed to src/payments, a naive rule may match no subjects, find no violations, and turn green. The architecture did not improve. The test stopped observing it.',
          'ArchUnitTS treats an empty subject selection as a violation by default. A team can explicitly allow an empty result for optional modules, but the safe behavior is to report the unmatched filter. This protects the rule against directory moves, glob mistakes, and generated-code changes that would otherwise create false confidence.',
          'The same principle applies to diagnostics more broadly. A useful guardrail makes its scope visible, preserves structured violations, and separates graph evaluation from the final test-runner assertion. That lets CI, reports, custom tooling, and coding agents consume the same result without scraping console text.',
        ],
        code: [
          'selector matches files  -> evaluate condition -> pass or violations',
          'selector matches nothing -> EmptyTestViolation',
          'intentional empty scope   -> allowEmptyTests: true',
        ].join('\n'),
        codeLanguage: 'text',
        codeFilename: 'safe-selection.txt',
      },
      {
        heading: 'One model, several delivery surfaces',
        paragraphs: [
          'The test result is only one representation of the architecture model. Teams also need to inspect a graph during a migration, attach an HTML or Mermaid artifact to a pull request, compare metrics over time, or give an automated tool machine-readable findings. Keeping violations and graph records structured makes those workflows possible without re-analyzing the repository for every consumer.',
          'This matters in enterprise delivery because the people who define a boundary are not always the people who encounter it. A concise test failure helps the author of a change. A report helps a reviewer understand the surrounding shape. A stored JSON artifact helps platform automation aggregate recurring violations without inventing a second parser.',
          'The objective is not a central dashboard for its own sake. It is one trustworthy extraction step with several views, each close to the decision being made.',
        ],
      },
      {
        heading: 'An open-source family',
        paragraphs: [
          'Contributors joined, applications brought new edge cases, and the TypeScript project became the reference point for implementations in other ecosystems. The libraries do not force identical syntax. They share a recognizable mental model while respecting the language, package manager, and test runner of each community.',
          'The origin still defines the direction: find a real architectural decision, express it as an executable rule, and keep the feedback close enough to the code that teams can act on it.',
          'The family now provides a place to test that idea across very different language systems. Python uses its AST, .NET uses Roslyn, Ruby uses Prism, Rust follows Cargo and module semantics, Zig starts from explicit compilation units, and Go uses its own package tooling. Shared concepts can move between implementations, but source extraction and developer experience remain language-native responsibilities.',
          'For a team adopting ArchUnit today, the recommended path is still the original one: choose a boundary whose violation creates real cost, express it in the smallest clear rule, make the current code pass, and add it to the existing delivery pipeline. A durable architecture suite grows from useful decisions, not from a template containing every possible policy.',
        ],
      },
    ],
  },
  {
    slug: 'architecture-tests-and-lint-rules',
    title: 'Architecture tests and lint rules solve different problems',
    summary:
      'A practical guide to choosing editor-fast import rules, graph-aware architecture tests, or both.',
    category: 'TypeScript',
    published: '2025-10-18',
    publishedLabel: '18 October 2025',
    readingTime: '11 min read',
    sourceNote: 'Adapted from the original ArchUnitTS and eslint-plugin-import comparison.',
    authorSlugs: ['lukas-niessen'],
    sections: [
      {
        heading: 'Start with the feedback loop',
        paragraphs: [
          'A linter is excellent at giving immediate, file-local feedback while a developer types. Import plugins can forbid paths, enforce conventions, and often integrate with editor fixes. That speed is a feature, and architecture tests do not replace it.',
          'Architecture tests answer broader questions. They build a dependency graph, select a part of the system, and evaluate relationships, cycles, layers, slices, or metrics across many files. They run as tests because the result represents a system-level invariant, not just one syntax node.',
          'The distinction is less about syntax than about the unit of reasoning. A lint rule usually starts from the file currently being parsed. An architecture rule starts from a project model. Both may inspect an import statement, but only the project model can ask how that edge participates in a cycle, crosses a layer, changes coupling, or violates a repeated module pattern.',
        ],
      },
      {
        heading: 'What linting does exceptionally well',
        paragraphs: [
          'Linting belongs in the tightest feedback loop. It runs while a file is open, points to a source location, and can often suggest or apply a correction. Rules such as restricted imports, naming conventions, dependency allowlists, and forbidden package entry points are valuable precisely because a developer sees them before running the full test suite.',
          'The configuration is also familiar to TypeScript teams. Editors, pre-commit hooks, and CI already know how to execute ESLint. If the architectural decision can be proved from one file and its resolved import, introducing a graph engine may add cost without adding information.',
          'That is why the useful comparison is not which tool is more powerful in the abstract. It is which feedback boundary matches the decision. Fast and local is better when local evidence is sufficient.',
        ],
        bullets: [
          'Prefer linting for immediate file-local import restrictions.',
          'Use auto-fixes where the correction is deterministic and safe.',
          'Keep style and syntax conventions out of the architecture suite.',
          'Let the editor surface failures that do not need a whole-project graph.',
        ],
      },
      {
        heading: 'Where graph context matters',
        paragraphs: [
          'A direct forbidden import is only one architecture failure. A cycle can span several packages. Coupling can rise gradually. A folder selector can become empty after a refactor. A PlantUML model can drift away from the code. These cases need context beyond the file currently open in an editor.',
          'Consider a dependency cycle across orders, billing, and notifications. Every individual import may be allowed, and no single file contains the full failure. The problem appears only when the directed edges are traversed together. The same is true for slice independence and for layer policies that allow one direction while excluding all others.',
          'Metrics also depend on aggregation. Instability compares incoming and outgoing coupling. Cohesion relates methods to the fields they use. Distance from the main sequence combines abstractness and instability. These are not richer forms of linting. They are different questions over a different model.',
        ],
        bullets: [
          'Cycle detection with the complete dependency path',
          'Layer and slice rules across a project or monorepo',
          'Cohesion, coupling, instability, abstractness, and size metrics',
          'Empty-selector protection and structured violations',
          'Reports for CI artifacts, reviews, and automation',
        ],
        code: [
          "import { metrics, projectFiles } from 'archunit';",
          '',
          'const cycles = projectFiles()',
          "  .inFolder('src/**')",
          '  .should()',
          '  .haveNoCycles();',
          '',
          'const fileSize = metrics()',
          '  .count()',
          '  .linesOfCode()',
          '  .shouldBeBelow(1000);',
        ].join('\n'),
        codeLanguage: 'typescript',
        codeFilename: 'fitness-functions.ts',
      },
      {
        heading: 'Project resolution is part of correctness',
        paragraphs: [
          'A graph-wide rule is only as correct as the project it extracted. TypeScript path aliases, inherited compiler options, package exports, and project references determine which source node an import reaches. If a tool guesses at those rules or relies on a duplicated configuration, the architecture graph can drift from the build graph.',
          'ArchUnitTS reads the TypeScript configuration and resolves modules through compiler-backed behavior. That costs more than checking one syntax node, but it produces a reusable model aligned with the project that ships. The extracted graph can then support dependency rules, cycles, slices, metrics, and reports without resolving the same repository independently for each check.',
          'This is also why architecture tests normally run after the fastest local checks. They provide broader evidence at a slightly wider feedback boundary, usually a focused test command, pre-push check, or CI job.',
        ],
      },
      {
        heading: 'Operate the two layers as one policy',
        paragraphs: [
          'Teams often duplicate the same boundary in lint configuration and architecture tests without deciding which one is authoritative. That creates two rule languages, two exception mechanisms, and two places that can drift. A clearer operating model assigns each policy to the smallest tool that can prove it, then uses overlap only when the faster feedback is worth the maintenance cost.',
          'For example, a domain package may use a lint restriction to reject direct imports from a database adapter immediately. The architecture suite can protect the broader layer direction, detect transitive cycles, fail empty selectors, and publish a graph artifact. Both checks reinforce the same decision, but each has a distinct responsibility.',
          'Exceptions need the same discipline. Keep them narrow, named, and reviewable. A broad ignore pattern can make either system look green while removing the part of the project that most needs observation.',
        ],
        code: [
          'editor       -> local import restriction -> feedback in seconds',
          'test suite   -> graph-wide invariant      -> feedback before push',
          'CI           -> complete architecture set -> merge gate and artifacts',
        ].join('\n'),
        codeLanguage: 'text',
        codeFilename: 'feedback-boundaries.txt',
      },
      {
        heading: 'A practical decision guide',
        paragraphs: [
          'Start by writing the decision as a sentence without naming a tool. If it refers to the current file, one import target, or a naming convention, begin with linting. If it refers to a path through the system, a relationship between groups, a cycle, an aggregate metric, or a diagram, use an architecture test.',
          'Then decide how quickly the team needs the answer. A critical local restriction may deserve both an editor rule and a graph-level regression test. A heavier report can stay in CI or a scheduled workflow. Not every check belongs on every keystroke.',
          'Finally, verify the failure mode. Change a path so the selector matches nothing, introduce one known forbidden edge, and confirm that the output names the source and target. A tool choice is only complete when the team has seen how it fails.',
        ],
      },
      {
        heading: 'Use both when both help',
        paragraphs: [
          'The practical answer is often additive. Keep lint rules for fast import feedback and use ArchUnitTS for graph-wide guarantees that belong in the test and delivery pipeline. The architecture rule becomes the durable contract; the linter remains a convenient early warning.',
          'Choose the smallest tool that can prove the decision. If a single import pattern is enough, linting may be enough. If the rule talks about layers, cycles, metrics, diagrams, or a whole project, architecture tests are the clearer home.',
          'This division also scales better organizationally. Product teams retain immediate feedback in the tools they already use, while platform or architecture teams can publish a small set of system-level invariants as reusable test helpers. The result is continuous governance without forcing every design question through a central review meeting.',
        ],
      },
    ],
  },
  {
    slug: 'architecture-testing-for-python',
    title: 'Architecture testing for fast-growing Python systems',
    summary:
      'How executable boundaries help Python services, data platforms, and AI projects grow without losing their shape.',
    category: 'Python',
    published: '2026-07-02',
    publishedLabel: '2 July 2026',
    readingTime: '15 min read',
    sourceNote: 'Adapted from the original ArchUnitPython launch article.',
    authorSlugs: ['lukas-niessen'],
    sections: [
      {
        heading: 'Python moves quickly',
        paragraphs: [
          'Python makes it easy to move from an idea to a working service, pipeline, or model. That is one of its strengths. It also means a notebook can become a package, a script can become an API, and an experiment can become production before its module boundaries have been made explicit.',
          'ArchUnitPython turns imports and source structure into tests. It has no production runtime dependency, works with pytest and unittest, and lets teams start with one boundary instead of adopting a separate architecture platform.',
          'The library analyzes source statically, so the application does not have to be imported or started. That matters for services with expensive initialization, data projects with environment-specific connectors, and AI systems whose runtime dependencies are unavailable in a lightweight CI job.',
        ],
        code: [
          'from archunitpython import project_files, assert_passes',
          '',
          'def test_domain_does_not_import_routes():',
          '    rule = (',
          "        project_files('src/')",
          "        .in_folder('**/domain/**')",
          '        .should_not()',
          '        .depend_on_files()',
          "        .in_folder('**/routes/**')",
          '    )',
          '    assert_passes(rule)',
        ].join('\n'),
        codeLanguage: 'python',
        codeFilename: 'test_architecture.py',
      },
      {
        heading: 'What the analyzer reads',
        paragraphs: [
          'ArchUnitPython walks Python files beneath the selected project root and parses each file with the standard abstract syntax tree. It recognizes ordinary import statements, from imports, relative imports, literal calls to importlib.import_module and __import__, imports guarded by TYPE_CHECKING, and common conditional ImportError fallbacks.',
          'The extractor records source-backed evidence without executing module code. Literal dynamic imports can be represented because their target is visible in the syntax tree. A module name assembled from runtime values cannot be resolved safely, so the analyzer does not invent an edge. This is a deliberate static-analysis boundary rather than an attempt to simulate the interpreter.',
          'Project-level defaults exclude virtual environments, caches, build output, and generated package metadata. A repository can add .archignore entries and scoped exclusions for generated clients, migrations, fixtures, or other files that should not participate in a particular architectural question.',
        ],
        code: [
          'source discovery',
          '    -> ast.parse()',
          '    -> import evidence',
          '    -> internal or external resolution',
          '    -> normalized dependency graph',
        ].join('\n'),
        codeLanguage: 'text',
        codeFilename: 'python-extraction.txt',
      },
      {
        heading: 'Useful boundaries for Python applications',
        paragraphs: [
          'The first rule should protect the decision that most often erodes. In a FastAPI service, that may mean domain logic cannot import route modules. In a Django project, apps may need explicit dependency direction. In a data platform, orchestration code should not leak into reusable transformations.',
          'A layered rule is useful when responsibilities have a clear direction. A slice rule is better when the system repeats a vertical structure such as customers, orders, and billing. File rules handle precise source relationships, while external dependency restrictions can keep frameworks and vendor SDKs behind designated adapters.',
          'Folder names are not architecture by themselves. They become an architectural model when the selectors have a stable meaning, the allowed relationships are explicit, and the test fails with the source path that crossed the boundary.',
        ],
        bullets: [
          'Keep domain code independent from web frameworks and database adapters.',
          'Detect cycles across packages before import order becomes operational behavior.',
          'Restrict external dependencies to designated integration modules.',
          'Track size, coupling, cohesion, and distance metrics as the project grows.',
        ],
      },
      {
        heading: 'Keep domain code independent from frameworks',
        paragraphs: [
          'Hexagonal and clean architectures depend on an inward direction: domain policy can define ports, while web frameworks, database clients, message brokers, and model providers stay in outer adapters. Python will not enforce that direction. A route can import a SQLAlchemy model or a domain object can instantiate a vendor client, and both may work perfectly in production until a later change makes the coupling expensive.',
          'An external-dependency rule can restrict FastAPI, Django, SQLAlchemy, boto3, or an AI provider SDK to adapter modules. A file-dependency rule can prevent domain packages from importing routes or infrastructure. Together they protect both sides of the boundary: where vendor code may appear and which internal layer may reach it.',
          'This is particularly useful in AI systems. Retrieval, model access, vector storage, and orchestration libraries change quickly. Keeping them behind application ports lets teams replace infrastructure without rewriting the policy and evaluation logic that gives the system its meaning.',
        ],
        code: [
          'def test_domain_stays_framework_independent():',
          '    rule = (',
          '        project_files("src/")',
          '        .in_folder("**/domain/**")',
          '        .should_not()',
          '        .depend_on_files()',
          '        .in_folder("**/infrastructure/**")',
          '        .because("domain policy must stay portable")',
          '    )',
          '    assert_passes(rule)',
        ].join('\n'),
        codeLanguage: 'python',
        codeFilename: 'test_domain_boundary.py',
      },
      {
        heading: 'Cycles are a graph problem',
        paragraphs: [
          'Python circular imports sometimes fail immediately and sometimes remain latent until import order, type annotations, or initialization behavior changes. Even when the interpreter accepts the cycle, the design cost remains: two modules can no longer be understood, tested, or moved independently.',
          'Cycle detection starts from the internal dependency graph rather than inspecting one file at a time. ArchUnitPython isolates strongly connected components and enumerates the simple cycles within the relevant component, then reports complete dependency paths. That turns a vague circularity warning into a sequence a developer can break deliberately.',
          'Scope matters. A project-wide cycle check can be valuable, but a focused rule over services or domain modules often produces a clearer first adoption step. Once the existing region is clean, the scope can expand without introducing a permanently red suite.',
        ],
      },
      {
        heading: 'Metrics are sensors, not quality scores',
        paragraphs: [
          'Structural metrics add a different kind of evidence. Lines of code and method counts can reveal growing units. Cohesion can identify classes whose methods operate on unrelated fields. Afferent and efferent coupling describe how a component is depended on and what it depends on. Abstractness and instability can be combined as distance from the main sequence.',
          'The threshold is a team decision, not a universal constant. Measure comparable code, inspect the current distribution, and start with a ceiling that prevents regression. A fixed limit copied from another repository can reward superficial splitting or create noise around code that is large for a legitimate reason.',
          'Metrics work best as ratchets. Establish the baseline, prevent new outliers, and lower the threshold as cleanup lands. Keep any exception narrow and explain why the measured component differs from the population around it.',
        ],
        code: [
          'from archunitpython import metrics, assert_passes',
          '',
          'def test_source_files_do_not_keep_growing():',
          '    rule = (',
          '        metrics("src/")',
          '        .count()',
          '        .lines_of_code()',
          '        .should_be_below(600)',
          '    )',
          '    assert_passes(rule)',
        ].join('\n'),
        codeLanguage: 'python',
        codeFilename: 'test_architecture_metrics.py',
      },
      {
        heading: 'Make adoption observable in CI',
        paragraphs: [
          'Architecture tests are ordinary tests, so the first CI integration can be a focused pytest command. Keep the suite near the source, use descriptive test names, and publish logs or reports when they add useful context for review. A failure should identify the rule, rationale, subject, and offending dependency rather than force a reviewer to reconstruct the graph.',
          'Protect the guardrail itself. Changes to architecture tests, thresholds, ignore files, and CI steps deserve the same ownership as the design they encode. In an agent-assisted repository, that can mean CODEOWNERS or an explicit review rule so automation cannot make the pipeline green by weakening the verifier.',
          'For a brownfield codebase, avoid a permanent all-project exception. Start with one clean module or one high-cost boundary, record narrow temporary exclusions, and expand the observed scope as violations are removed.',
        ],
        code: [
          'name: Architecture checks',
          'on: [pull_request]',
          'jobs:',
          '  architecture:',
          '    runs-on: ubuntu-latest',
          '    steps:',
          '      - uses: actions/checkout@v4',
          '      - uses: actions/setup-python@v5',
          '        with:',
          '          python-version: "3.12"',
          '      - run: pip install -r requirements-dev.txt',
          '      - run: python -m pytest tests/test_architecture.py -q',
        ].join('\n'),
        codeLanguage: 'yaml',
        codeFilename: '.github/workflows/architecture.yml',
      },
      {
        heading: 'A guardrail for generated code',
        paragraphs: [
          'AI-assisted development increases the amount of code a team can produce, but a generated implementation does not automatically know the local architecture. A deterministic test closes that gap. The prompt can describe the intended boundary; the architecture test proves whether the resulting files respect it.',
          'Start with one rule, make it pass, and run it in CI. Add the next rule when the system reveals a boundary worth protecting. Architecture testing works best as a focused suite of high-value decisions, not a wall of abstract policy.',
          'The most useful agent loop is explicit: change code, run behavioral tests, run the focused architecture suite, inspect source-backed violations, and correct production code. The agent should not delete the rule, broaden an ignore, or raise a threshold simply to reach green. Humans retain ownership of what the architecture is allowed to become.',
        ],
      },
    ],
  },
  {
    slug: 'fitness-functions-for-ai-generated-code',
    title: 'Fitness functions for AI-generated code',
    summary:
      'Why deterministic architecture feedback matters when software changes faster than humans can review every edge.',
    category: 'Architecture',
    published: '2026-08-20',
    publishedLabel: '20 August 2026',
    readingTime: '12 min read',
    sourceNote: 'Adapted from Lukas Niessen’s writing on architecture fitness functions.',
    authorSlugs: ['lukas-niessen'],
    sections: [
      {
        heading: 'Working code can still be structurally wrong',
        paragraphs: [
          'A generated change can compile, pass unit tests, and still move the system in the wrong architectural direction. It may import persistence from presentation, create a cycle through a shared package, or place a new capability in the easiest folder instead of the owned module.',
          'Prose helps people understand intent, but it is not a reliable enforcement boundary. A fitness function turns one architectural decision into executable evidence that runs after every change.',
          'The problem is not that generated code is uniquely careless. Human teams have always created duplicated logic, giant modules, hidden coupling, and misplaced dependencies. What changes with coding agents is the production rate. More changes reach review, so any control that depends on a person noticing every structural edge becomes less reliable.',
        ],
      },
      {
        heading: 'Behavioral tests do not measure architectural shape',
        paragraphs: [
          'Unit and integration tests answer whether software behaves as expected for the scenarios they exercise. Type checking answers whether values and interfaces satisfy language constraints. Neither one proves that a domain package stayed independent, that feature slices remain acyclic, or that a new adapter entered through the intended port.',
          'A pleasant-looking diff is not enough either. Reviewers see the files that changed, but an architectural effect can travel through existing edges elsewhere in the graph. A locally reasonable import may close a project-wide cycle or increase the coupling of a package the author never opened.',
          'Architecture fitness functions add a separate evidence layer. They do not judge business behavior or design taste. They evaluate the objective structural decisions a team has chosen to encode.',
        ],
        bullets: [
          'Behavioral tests protect observable outcomes.',
          'Type systems protect language-level contracts.',
          'Linters protect local syntax and import conventions.',
          'Architecture tests protect graph-wide structural invariants.',
          'Human review handles context, tradeoffs, and intentional change.',
        ],
      },
      {
        heading: 'Close the loop',
        paragraphs: [
          'The useful loop is short: an agent or developer changes code, the ordinary test command evaluates the architecture, and a failure reports the exact dependency path. The next iteration begins with concrete evidence instead of a broad instruction to improve the architecture.',
          'Source-backed feedback changes the quality of the correction. Instead of telling an agent to respect clean architecture, the test can report that src/shop/api/subscriptions.py depends on src/shop/adapters/postgres.py even though API code may only reach application ports. The next action is constrained: introduce or reuse the port, move the dependency, and rerun the check.',
          'The loop should use the same command locally and in CI. If an architecture rule requires a private dashboard or a manual export to evaluate, the result arrives too late for autonomous iteration and is harder for developers to reproduce.',
        ],
        bullets: [
          'Write the rule in the language of the repository.',
          'Run it with the test framework already used by the team.',
          'Fail on missing selections so refactors cannot silently disable the guardrail.',
          'Return source-backed violations that a person or agent can act on.',
        ],
        code: [
          'architecture decision',
          '        ↓',
          'executable architecture rule',
          '        ↓',
          'test and CI feedback',
          '        ↓',
          'targeted code correction',
        ].join('\n'),
        codeLanguage: 'text',
        codeFilename: 'feedback-loop.txt',
      },
      {
        heading: 'Keep deterministic and fuzzy checks separate',
        paragraphs: [
          'Some quality concerns are deterministic. A forbidden dependency exists or it does not. A cycle has a concrete path. A selector matched zero files. A source unit crossed a size threshold. These checks are strong candidates for merge-blocking automation because the same input produces the same answer and the failure can cite evidence.',
          'Other concerns are interpretive. Two implementations may be semantically duplicated even when their syntax differs. A name may be technically valid but misleading. A module may have too many responsibilities without crossing a measurable threshold. Static graph rules should not pretend to settle those questions.',
          'Use clone detection, language models, and human review to find fuzzy candidates, then use behavioral and architecture tests to verify objective parts of the cleanup. Keeping the boundaries clear prevents a probabilistic suggestion from masquerading as a deterministic policy.',
        ],
      },
      {
        heading: 'Protect the verifier from the optimizer',
        paragraphs: [
          'A coding agent is often optimizing for a green test suite. If it can edit the rule, raise the threshold, broaden an ignore, or remove the CI step, the shortest path to green may be to weaken the verifier instead of improve the production design.',
          'Architecture tests, ignore files, thresholds, and workflow definitions should therefore have explicit ownership. CODEOWNERS, branch protections, or a review policy can require a person who understands the decision to approve those changes. The agent remains free to refactor production code and rerun the suite, but it cannot silently redefine success.',
          'Rule rationales help here. A because clause captures why the boundary exists, which lets a reviewer distinguish a legitimate architectural change from a workaround. If the decision truly changed, update the production code, rule, and rationale together.',
        ],
        code: [
          '# Architecture policy requires explicit review',
          '/tests/test_architecture.py  @architecture-owners',
          '/.archignore                @architecture-owners',
          '/.github/workflows/         @platform-owners',
        ].join('\n'),
        codeLanguage: 'text',
        codeFilename: 'CODEOWNERS',
      },
      {
        heading: 'Start brownfield work with a ratchet',
        paragraphs: [
          'A legacy system may produce hundreds of findings on its first scan. Making that complete result merge-blocking creates a permanently red suite, and permanently red checks become invisible. Adoption should reduce uncertainty without requiring a rewrite.',
          'Begin with one boundary that is already clean or one painful region the team is ready to repair. Prevent new violations there, fix a neighboring module, and expand the selector. For metrics, set the first ceiling near the current maximum and lower it as cleanup work lands. For cycles, protect a clean component before attempting the whole repository.',
          'Exceptions should be narrow, documented, owned, and time-limited. A broad ignore for legacy code describes a second ungoverned architecture. A named exception with an owner and removal condition describes a migration step.',
        ],
        bullets: [
          'Track new and removed architecture violations, not generated lines of code.',
          'Measure cycle count, post-merge rework, review rounds, and the size of exceptions.',
          'Expand protected scope only after the current scope produces a trusted signal.',
          'Schedule small cleanup changes that preserve behavior and reduce one measured risk.',
        ],
      },
      {
        heading: 'Use one graph for prevention and cleanup',
        paragraphs: [
          'The same dependency model can support two complementary loops. Pull-request checks prevent known boundaries from getting worse. Scheduled analysis can identify cycles, coupling hotspots, metric outliers, or repeated exceptions that deserve a focused cleanup proposal.',
          'A scheduled coding agent can then work from a bounded finding, change a small set of files, run behavioral tests, run the architecture suite, and present the result for review. It should not perform an open-ended rewrite. The graph supplies the target and the tests define the stopping condition.',
          'This is architecture garbage collection in practical terms: prevent objective new debt at the change boundary, then continuously collect existing debt in small, independently verifiable steps.',
        ],
      },
      {
        heading: 'Prefer a few strong invariants',
        paragraphs: [
          'The goal is not to encode every preference. Protect the boundaries whose violation creates real cost: domain independence, allowed package direction, cycle freedom, integration ownership, or a measurable design threshold. A small set of trusted rules is easier to understand and harder to ignore.',
          'As the architecture evolves, change the rule deliberately in the same pull request as the design decision. That keeps the code, the test, and the explanation in one reviewable unit.',
          'The strongest suite is not the one with the most rules. It is the one the team believes, maintains, and uses to make changes safely. Every green result should mean that a valuable claim was actually evaluated over the source that ships.',
        ],
      },
    ],
  },
];

export const postsByNewest = [...posts].sort((a, b) => b.published.localeCompare(a.published));

export const postBySlug = new Map(
  posts.filter((post) => !post.externalUrl).map((post) => [post.slug, post]),
);
