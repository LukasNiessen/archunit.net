export interface EnterpriseResource {
  slug: string;
  type: 'White paper' | 'Case study' | 'Field guide';
  title: string;
  summary: string;
  audience: string;
  readingTime: string;
}

export const enterpriseResources: EnterpriseResource[] = [
  {
    slug: 'architecture-policy-as-code',
    type: 'White paper',
    title: 'Architecture policy as code',
    summary:
      'A practical operating model for turning dependency boundaries, layering decisions, cycle rules, and design metrics into evidence inside continuous delivery.',
    audience: 'Platform and architecture leaders',
    readingTime: '18 min read',
  },
  {
    slug: 'polyglot-guardrails',
    type: 'Field guide',
    title: 'One architecture language across a polyglot estate',
    summary:
      'How to standardize intent while keeping TypeScript, Python, .NET, Ruby, Rust, and other implementations native to their ecosystems.',
    audience: 'Staff engineers and platform teams',
    readingTime: '14 min read',
  },
  {
    slug: 'continuous-modernization',
    type: 'Case study',
    title: 'Protecting boundaries during continuous modernization',
    summary:
      'A platform team uses architecture tests to expose cycles, sequence migrations, and keep new dependencies from rebuilding yesterday’s monolith.',
    audience: 'Engineering transformation teams',
    readingTime: '11 min read',
  },
  {
    slug: 'ai-generated-code',
    type: 'White paper',
    title: 'Governance for AI-generated code',
    summary:
      'A control model for pairing high-throughput code generation with deterministic architecture checks, explicit exceptions, and reviewable evidence.',
    audience: 'AI engineering and governance leaders',
    readingTime: '16 min read',
  },
  {
    slug: 'design-health-scorecard',
    type: 'Field guide',
    title: 'A design-health scorecard teams can act on',
    summary:
      'Choose metrics that reveal coupling and instability without turning architecture into a dashboard disconnected from engineering work.',
    audience: 'Engineering effectiveness teams',
    readingTime: '12 min read',
  },
  {
    slug: 'guardrails-at-scale',
    type: 'Case study',
    title: 'From one critical rule to a shared guardrail program',
    summary:
      'How an engineering organization starts with one high-value boundary, proves the feedback loop, and expands policy ownership across teams.',
    audience: 'CTOs and heads of engineering',
    readingTime: '10 min read',
  },
];
