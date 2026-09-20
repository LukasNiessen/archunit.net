export interface JobOpening {
  slug: string;
  title: string;
  discipline: 'Engineering' | 'Go to market';
  location: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
}

export const jobs: JobOpening[] = [
  {
    slug: 'backend-engineer',
    title: 'Backend Engineer',
    discipline: 'Engineering',
    location: 'Remote in Europe or Munich',
    summary:
      'Build dependable services and tooling around architecture analysis, project metadata, and developer feedback.',
    responsibilities: [
      'Design and implement APIs that turn source analysis into clear, durable product capabilities.',
      'Improve reliability, observability, and performance across our service and data boundaries.',
      'Work directly with open-source maintainers to bring library workflows into production systems.',
    ],
    qualifications: [
      'Professional experience with a modern backend language and relational or document databases.',
      'A practical understanding of testing, API design, and production operations.',
      'Clear written communication and comfort working in a small, remote-first team.',
    ],
  },
  {
    slug: 'senior-backend-engineer',
    title: 'Senior Backend Engineer',
    discipline: 'Engineering',
    location: 'Remote in Europe or Munich',
    summary:
      'Own backend architecture for services that need to stay predictable as repositories, languages, and workloads grow.',
    responsibilities: [
      'Lead the design of resilient service boundaries, asynchronous workflows, and analysis pipelines.',
      'Set engineering standards for delivery, security, data integrity, and operational readiness.',
      'Mentor engineers and turn ambiguous product requirements into focused technical plans.',
    ],
    qualifications: [
      'Several years of backend engineering experience with ownership of production systems.',
      'Strong judgment in distributed systems, data modeling, and performance tradeoffs.',
      'Experience improving an existing architecture without interrupting product delivery.',
    ],
  },
  {
    slug: 'senior-software-engineer-typescript-rust',
    title: 'Senior Software Engineer, TypeScript and Rust',
    discipline: 'Engineering',
    location: 'Remote in Europe or Munich',
    summary:
      'Advance language-native analyzers and developer APIs for teams that want architecture feedback inside their ordinary test suites.',
    responsibilities: [
      'Develop static-analysis, graph, and rule-evaluation capabilities in TypeScript and Rust.',
      'Design fluent APIs that feel native while preserving a coherent model across ecosystems.',
      'Build benchmarks, integration tests, examples, and documentation that make correctness visible.',
    ],
    qualifications: [
      'Deep production experience in TypeScript or Rust, with motivation to work seriously in both.',
      'Knowledge of compilers, ASTs, dependency graphs, build systems, or developer tooling.',
      'A record of shipping libraries or tools with careful compatibility and documentation practices.',
    ],
  },
  {
    slug: 'account-executive',
    title: 'Account Executive',
    discipline: 'Go to market',
    location: 'Remote in Europe or Munich',
    summary:
      'Help engineering leaders connect architecture quality, delivery speed, and measurable operational outcomes.',
    responsibilities: [
      'Own opportunities from first conversation through a clear, trusted decision process.',
      'Translate technical product value into business cases for engineering and platform leaders.',
      'Bring customer evidence back into positioning, product priorities, and go-to-market programs.',
    ],
    qualifications: [
      'Experience selling technical software to engineering or platform organizations.',
      'Strong discovery skills and the ability to navigate both technical and executive conversations.',
      'A low-ego, evidence-led approach to building long-term customer relationships.',
    ],
  },
  {
    slug: 'forward-deployed-engineer',
    title: 'Forward Deployed Engineer',
    discipline: 'Go to market',
    location: 'Remote in Europe or Munich',
    summary:
      'Work alongside customer teams to turn their architecture decisions into useful checks, integrations, and adoption plans.',
    responsibilities: [
      'Map real repositories, delivery workflows, and architecture goals into practical implementations.',
      'Prototype integrations, write reference rules, and help teams move from evaluation to trusted use.',
      'Partner with product and engineering on patterns that should become repeatable capabilities.',
    ],
    qualifications: [
      'Hands-on software engineering experience and confidence working in unfamiliar codebases.',
      'The ability to explain technical tradeoffs clearly to developers, architects, and leaders.',
      'Comfort balancing implementation work, customer communication, and product judgment.',
    ],
  },
];
