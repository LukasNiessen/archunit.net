export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
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
  sections: BlogSection[];
}

export const posts: BlogPost[] = [
  {
    slug: 'why-archunitts-exists',
    title: 'Why ArchUnitTS exists',
    summary:
      'The practical need that started one TypeScript library and grew into an architecture-testing family.',
    category: 'Project',
    published: '2025-10-15',
    publishedLabel: '15 October 2025',
    readingTime: '6 min read',
    sourceNote: 'Adapted from the original ArchUnitTS milestone essay by Lukas Niessen.',
    sections: [
      {
        heading: 'A missing guardrail',
        paragraphs: [
          'ArchUnitTS began during a consulting project. The team needed the kind of executable architecture rules Java developers knew from ArchUnit, but the available TypeScript tools did not cover the project needs. The gap was practical: architectural boundaries existed in diagrams and conversations, but pull requests could still violate them without a deterministic signal.',
          'Lukas Niessen started building the missing tool in his spare time. The first goal was deliberately small: describe a dependency rule in readable TypeScript and run it inside the test suite the project already trusted.',
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
        heading: 'From a rule to a feedback system',
        paragraphs: [
          'Dependency direction was only the starting point. Real systems also need cycle detection, layer and slice policies, code metrics, diagrams, reports, and support for modern TypeScript project resolution. Each capability came from the same question: what evidence would help a team protect an architectural decision while the code is changing?',
          'That framing keeps architecture testing close to delivery. Rules run locally, in pull requests, and in continuous integration. A violation points to source files and dependency paths, giving both people and coding agents a concrete next action.',
        ],
        bullets: [
          'Fail when a selector matches nothing, so a renamed folder cannot create a false green result.',
          'Use current TypeScript configuration, path aliases, and project references.',
          'Export the same dependency graph as test output, JSON, Mermaid, D2, DOT, CSV, or HTML.',
        ],
      },
      {
        heading: 'An open-source family',
        paragraphs: [
          'Contributors joined, applications brought new edge cases, and the TypeScript project became the reference point for implementations in other ecosystems. The libraries do not force identical syntax. They share a recognizable mental model while respecting the language, package manager, and test runner of each community.',
          'The origin still defines the direction: find a real architectural decision, express it as an executable rule, and keep the feedback close enough to the code that teams can act on it.',
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
    readingTime: '7 min read',
    sourceNote: 'Adapted from the original ArchUnitTS and eslint-plugin-import comparison.',
    sections: [
      {
        heading: 'Start with the feedback loop',
        paragraphs: [
          'A linter is excellent at giving immediate, file-local feedback while a developer types. Import plugins can forbid paths, enforce conventions, and often integrate with editor fixes. That speed is a feature, and architecture tests do not replace it.',
          'Architecture tests answer broader questions. They build a dependency graph, select a part of the system, and evaluate relationships, cycles, layers, slices, or metrics across many files. They run as tests because the result represents a system-level invariant, not just one syntax node.',
        ],
      },
      {
        heading: 'Where graph context matters',
        paragraphs: [
          'A direct forbidden import is only one architecture failure. A cycle can span several packages. Coupling can rise gradually. A folder selector can become empty after a refactor. A PlantUML model can drift away from the code. These cases need context beyond the file currently open in an editor.',
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
        heading: 'Use both when both help',
        paragraphs: [
          'The practical answer is often additive. Keep lint rules for fast import feedback and use ArchUnitTS for graph-wide guarantees that belong in the test and delivery pipeline. The architecture rule becomes the durable contract; the linter remains a convenient early warning.',
          'Choose the smallest tool that can prove the decision. If a single import pattern is enough, linting may be enough. If the rule talks about layers, cycles, metrics, diagrams, or a whole project, architecture tests are the clearer home.',
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
    readingTime: '8 min read',
    sourceNote: 'Adapted from the original ArchUnitPython launch article.',
    sections: [
      {
        heading: 'Python moves quickly',
        paragraphs: [
          'Python makes it easy to move from an idea to a working service, pipeline, or model. That is one of its strengths. It also means a notebook can become a package, a script can become an API, and an experiment can become production before its module boundaries have been made explicit.',
          'ArchUnitPython turns imports and source structure into tests. It has no production runtime dependency, works with pytest and unittest, and lets teams start with one boundary instead of adopting a separate architecture platform.',
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
        heading: 'Useful boundaries for Python applications',
        paragraphs: [
          'The first rule should protect the decision that most often erodes. In a FastAPI service, that may mean domain logic cannot import route modules. In a Django project, apps may need explicit dependency direction. In a data platform, orchestration code should not leak into reusable transformations.',
        ],
        bullets: [
          'Keep domain code independent from web frameworks and database adapters.',
          'Detect cycles across packages before import order becomes operational behavior.',
          'Restrict external dependencies to designated integration modules.',
          'Track size, coupling, cohesion, and distance metrics as the project grows.',
        ],
      },
      {
        heading: 'A guardrail for generated code',
        paragraphs: [
          'AI-assisted development increases the amount of code a team can produce, but a generated implementation does not automatically know the local architecture. A deterministic test closes that gap. The prompt can describe the intended boundary; the architecture test proves whether the resulting files respect it.',
          'Start with one rule, make it pass, and run it in CI. Add the next rule when the system reveals a boundary worth protecting. Architecture testing works best as a focused suite of high-value decisions, not a wall of abstract policy.',
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
    readingTime: '6 min read',
    sourceNote: 'Adapted from Lukas Niessen’s writing on architecture fitness functions.',
    sections: [
      {
        heading: 'Working code can still be structurally wrong',
        paragraphs: [
          'A generated change can compile, pass unit tests, and still move the system in the wrong architectural direction. It may import persistence from presentation, create a cycle through a shared package, or place a new capability in the easiest folder instead of the owned module.',
          'Prose helps people understand intent, but it is not a reliable enforcement boundary. A fitness function turns one architectural decision into executable evidence that runs after every change.',
        ],
      },
      {
        heading: 'Close the loop',
        paragraphs: [
          'The useful loop is short: an agent or developer changes code, the ordinary test command evaluates the architecture, and a failure reports the exact dependency path. The next iteration begins with concrete evidence instead of a broad instruction to improve the architecture.',
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
        heading: 'Prefer a few strong invariants',
        paragraphs: [
          'The goal is not to encode every preference. Protect the boundaries whose violation creates real cost: domain independence, allowed package direction, cycle freedom, integration ownership, or a measurable design threshold. A small set of trusted rules is easier to understand and harder to ignore.',
          'As the architecture evolves, change the rule deliberately in the same pull request as the design decision. That keeps the code, the test, and the explanation in one reviewable unit.',
        ],
      },
    ],
  },
];

export const postBySlug = new Map(posts.map((post) => [post.slug, post]));
