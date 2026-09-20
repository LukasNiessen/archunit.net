export interface Contributor {
  login: string;
  avatarUrl: string;
  profileUrl: string;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio: string;
  headline: string;
  profile: string[];
  focusAreas: { title: string; description: string }[];
  projectWork: string[];
  workingPrinciple: string;
  photoUrl: string;
  cutoutUrl: string;
  linkedinUrl: string;
  githubUrl?: string;
  email?: string;
}

export const contactEmail = 'lks.niessen@gmail.com';

export const team: TeamMember[] = [
  {
    slug: 'lukas-niessen',
    name: 'Lukas Niessen',
    role: 'Creator and maintainer',
    bio: 'Lukas started ArchUnitTS to solve a real architecture-testing gap and now stewards the shared direction across the library family.',
    headline: 'Turning architectural intent into a testable interface.',
    profile: [
      'Lukas created ArchUnitTS after encountering a practical gap on a consulting project: TypeScript teams could describe architectural boundaries, but they lacked a sufficiently capable way to test those decisions inside the delivery loop.',
      'What began as a focused dependency-rule library developed into a broader family of language-native tools. Lukas works across their product direction, implementation model, release quality, documentation, and the shared vocabulary that makes an ArchUnit rule recognizable without making every ecosystem behave identically.',
      'His focus is the distance between an architectural idea and useful feedback. A rule should read clearly in code, evaluate the project the team actually ships, and return enough evidence for a developer or coding agent to correct the violation without reverse-engineering the test.',
    ],
    focusAreas: [
      {
        title: 'Architecture as feedback',
        description:
          'Moving decisions out of static diagrams and into deterministic checks that run with ordinary tests and pull requests.',
      },
      {
        title: 'Cross-ecosystem coherence',
        description:
          'Keeping a shared mental model across TypeScript, Python, .NET, Ruby, Rust, Zig, Go, Java, and PHP while respecting each language.',
      },
      {
        title: 'Delivery quality',
        description:
          'Treating documentation, release integrity, self-testing, CI, reports, and performance as parts of the product rather than finishing work.',
      },
    ],
    projectWork: [
      'Created ArchUnitTS and developed the original fluent architecture-testing model.',
      'Stewards the expansion from dependency rules into layers, slices, metrics, diagrams, structured reports, and ecosystem integrations.',
      'Coordinates the shared direction and release quality of the wider ArchUnit library family.',
    ],
    workingPrinciple:
      'An architecture rule earns its place when it is precise enough to trust and clear enough to act on.',
    photoUrl: '/team/lukas-niessen.jpg',
    cutoutUrl: '/team/lukas-niessen-cutout.png',
    linkedinUrl: 'https://www.linkedin.com/in/lukasniessen/',
    githubUrl: 'https://github.com/LukasNiessen',
  },
  {
    slug: 'tristan-kruse',
    name: 'Tristan Kruse',
    role: 'Language & Ecosystem Lead',
    email: 'krusetristan1@gmail.com',
    bio: 'Tristan contributes across ArchUnitPython and leads the development of ArchUnitRuby and ArchUnitJava. His work focuses on translating a shared architecture-testing model into language-native APIs, analyzers, test integrations, and developer workflows across different ecosystems.',
    headline: 'Making architecture tests useful outside the happy path.',
    profile: [
      'Tristan works across ArchUnitPython and leads ArchUnitRuby and ArchUnitJava. He focuses on the details that determine whether an architecture test remains useful in a real repository: accurate extraction, explicit configuration, trustworthy rule evaluation, and documentation that explains the result rather than merely listing an API.',
      'In ArchUnitPython, his work includes conditional-import classification, reusable configuration, project-level .archignore support, because rationales, and clearer guidance for metrics and graph exports. In ArchUnitRuby, he translates the shared architecture-testing model into Prism-based analysis, Ruby-native fluent rules, and RSpec, Minitest, and framework-neutral assertions.',
      'For ArchUnitJava, Tristan helped take the project from an early foundation to a published public beta on Maven Central. The implementation reads compiled classes and JARs without loading application code, then connects deterministic policies, structured evidence, JUnit, CLI workflows, and generated documentation. Across all three ecosystems, the goal is a familiar ArchUnit mental model expressed through the language and toolchain developers already use.',
    ],
    focusAreas: [
      {
        title: 'Source edge cases',
        description:
          'Making conditional imports, exclusions, and repository-specific configuration explicit in the project model.',
      },
      {
        title: 'Explainable rules',
        description:
          'Connecting a failed relationship to its rationale, threshold, and actionable evidence.',
      },
      {
        title: 'Ecosystem fit',
        description:
          'Adapting the shared ArchUnit model to Python, Ruby, and Java without flattening their different analyzers, APIs, and test workflows.',
      },
    ],
    projectWork: [
      'Added conditional-import classification, common rule configuration, project exclusions, and human-readable rationales to ArchUnitPython.',
      'Leads ArchUnitRuby across Prism-based extraction, graph and metric capabilities, language-native rules, test integrations, and documentation.',
      'Leads ArchUnitJava as a compiled-bytecode architecture engine with Maven Central distribution, JUnit and CLI integration, deterministic reports, and public documentation.',
    ],
    workingPrinciple:
      'Trust comes from handling the awkward repository cases with the same care as the clean example.',
    photoUrl: '/team/tristan-kruse.jpg',
    cutoutUrl: '/team/tristan-kruse-cutout.png',
    linkedinUrl: 'https://www.linkedin.com/in/tristan-kruse/',
    githubUrl: 'https://github.com/TristanKruse',
  },
  {
    slug: 'jan-heimann',
    name: 'Jan Heimann',
    role: 'AI and platform engineering',
    bio: 'Jan brings applied AI, MLOps, and platform experience to the question of how architecture guardrails support fast-moving engineering teams.',
    headline: 'Connecting architecture guardrails to modern platform delivery.',
    profile: [
      'Jan brings the perspective of applied AI, MLOps, and platform engineering to ArchUnit. His interest is the operating environment around the library: teams shipping frequently, automation creating more code, and shared platforms that need strong boundaries without adding a central review bottleneck.',
      'That perspective matters because an architecture test is not valuable in isolation. It has to fit the build, produce feedback at the right moment, and remain understandable to teams that did not create the original rule. The same evidence should support local development, CI, platform policy, and automated remediation workflows.',
      'Jan helps frame architecture as a delivery capability. Deterministic rules complement human review and probabilistic AI systems by providing a stable contract for the parts of the design a team has decided must not drift.',
    ],
    focusAreas: [
      {
        title: 'Applied AI systems',
        description:
          'Using deterministic structural checks alongside generated code, model workflows, and agent-driven development.',
      },
      {
        title: 'Platform integration',
        description:
          'Placing architecture feedback inside reusable CI, repository, and developer-platform workflows.',
      },
      {
        title: 'Scalable governance',
        description:
          'Encoding high-value decisions without turning an architecture group into a manual approval queue.',
      },
    ],
    projectWork: [
      'Shapes the project perspective on architecture testing for AI-assisted and platform-oriented delivery.',
      'Connects rule design to MLOps, CI, automation, and the realities of fast-moving engineering organizations.',
      'Contributes to the product language used to explain deterministic architecture feedback to teams and leaders.',
    ],
    workingPrinciple:
      'A guardrail should make the safe path easier to ship, not create another queue around the team.',
    photoUrl: '/team/jan-heimann.jpg',
    cutoutUrl: '/team/jan-heimann-cutout.png',
    linkedinUrl: 'https://www.linkedin.com/in/jan-heimann/',
    githubUrl: 'https://github.com/janMagnusHeimann',
  },
  {
    slug: 'deban-kumar-sahu',
    name: 'Deban Kumar Sahu',
    role: 'Python engineering',
    bio: 'Deban develops ArchUnitPython and brings hands-on experience with Python APIs, data tooling, and maintainable backend design.',
    headline: 'Strengthening the Python engine from extraction to explanation.',
    profile: [
      'Deban contributes hands-on Python engineering to ArchUnitPython. His work sits close to the implementation details that turn source analysis into dependable test feedback, including performance-sensitive lookup behavior, data consistency, and documentation of the graph and report model.',
      'A Python architecture library has to handle the flexibility of the language without becoming vague. Static analysis should be conservative about what it can prove, efficient over a growing project, and explicit when an import or selector cannot be interpreted safely.',
      'Deban also brings experience with APIs, database tooling, and backend design. That makes the rules concrete: domain isolation, adapter ownership, package direction, and code organization are daily engineering concerns rather than abstract governance terms.',
    ],
    focusAreas: [
      {
        title: 'Python internals',
        description:
          'Improving the extraction and lookup paths that support static dependency analysis at project scale.',
      },
      {
        title: 'Data correctness',
        description:
          'Keeping graph records, keys, and report output consistent so downstream checks receive trustworthy inputs.',
      },
      {
        title: 'Backend architecture',
        description:
          'Translating practical API, persistence, and domain boundaries into useful Python examples and documentation.',
      },
    ],
    projectWork: [
      'Optimized type-checking range lookup in ArchUnitPython with binary search.',
      'Corrected duplicate-key behavior in the project data model.',
      'Expanded README guidance for dependency graph reports and everyday usage.',
    ],
    workingPrinciple:
      'Static analysis should be honest about the source, efficient over the project, and specific in its result.',
    photoUrl: '/team/deban-kumar-sahu.png',
    cutoutUrl: '/team/deban-kumar-sahu-cutout.png',
    linkedinUrl: 'https://www.linkedin.com/in/debankumarsahu/',
    githubUrl: 'https://github.com/DebanKsahu',
  },
  {
    slug: 'robey-beswick',
    name: 'Robey Beswick',
    role: 'Cloud and developer experience',
    bio: 'Robey connects cloud engineering with pragmatic developer workflows, helping the project keep delivery and usability in the same conversation.',
    headline: 'Building the path from a graph engine to a usable Go workflow.',
    profile: [
      'Robey works at the intersection of cloud engineering and developer experience. Within the ArchUnit family, his public contributions are centered on ArchUnitGo and the work required to turn a language engine into a usable, self-explaining development tool.',
      'That work spans slices, metrics, logging, dogfooding, continuous integration, and documentation. Together, those capabilities establish more than feature breadth. They make it possible to see what the analyzer understood, test the library against its own boundaries, and ship changes through a repeatable quality gate.',
      'Robey keeps delivery and usability in the same conversation. A technically correct engine still needs discoverable documentation, stable automation, and feedback that works naturally for Go teams and their toolchain.',
    ],
    focusAreas: [
      {
        title: 'Go architecture testing',
        description:
          'Developing slices, metrics, and language-native workflows for the ArchUnitGo implementation.',
      },
      {
        title: 'Observable analysis',
        description:
          'Using explicit logging and reports to make project extraction and rule evaluation easier to understand.',
      },
      {
        title: 'Delivery systems',
        description:
          'Connecting self-testing, documentation, CI, and release discipline into one dependable contributor workflow.',
      },
    ],
    projectWork: [
      'Expanded ArchUnitGo with slices, metrics, explicit logging, self-testing rules, and CI coverage.',
      'Developed source-verified README and documentation-site guidance for Go users.',
      'Brings cloud and developer-workflow considerations into the wider product discussion.',
    ],
    workingPrinciple:
      'The engine, its documentation, and the path to release are one developer experience.',
    photoUrl: '/team/robey-beswick.jpg',
    cutoutUrl: '/team/robey-beswick-cutout.png',
    linkedinUrl: 'https://www.linkedin.com/in/robey-beswick/',
    githubUrl: 'https://github.com/RobeyBeswick',
  },
];

export const contributors: Contributor[] = [
  {
    login: 'LukasNiessen',
    avatarUrl: 'https://avatars.githubusercontent.com/u/64063489?v=4',
    profileUrl: 'https://github.com/LukasNiessen',
  },
  {
    login: 'TristanKruse',
    avatarUrl: 'https://avatars.githubusercontent.com/u/170350429?v=4',
    profileUrl: 'https://github.com/TristanKruse',
  },
  {
    login: 'RobeyBeswick',
    avatarUrl: 'https://avatars.githubusercontent.com/u/88316323?v=4',
    profileUrl: 'https://github.com/RobeyBeswick',
  },
  {
    login: 'DebanKsahu',
    avatarUrl: 'https://avatars.githubusercontent.com/u/140151589?v=4',
    profileUrl: 'https://github.com/DebanKsahu',
  },
  {
    login: 'brutalmaths',
    avatarUrl: 'https://avatars.githubusercontent.com/u/46350376?v=4',
    profileUrl: 'https://github.com/brutalmaths',
  },
  {
    login: 'JanMF',
    avatarUrl: 'https://avatars.githubusercontent.com/u/49913967?v=4',
    profileUrl: 'https://github.com/JanMF',
  },
  {
    login: 'freud14',
    avatarUrl: 'https://avatars.githubusercontent.com/u/1090012?v=4',
    profileUrl: 'https://github.com/freud14',
  },
  {
    login: 'khashalavi',
    avatarUrl: 'https://avatars.githubusercontent.com/u/77242627?v=4',
    profileUrl: 'https://github.com/khashalavi',
  },
  {
    login: 'Pahulmeet',
    avatarUrl: 'https://avatars.githubusercontent.com/u/17105932?v=4',
    profileUrl: 'https://github.com/Pahulmeet',
  },
  {
    login: 'SinaRezaeiiiii',
    avatarUrl: '/team/sina-rezaei.png',
    profileUrl: 'https://github.com/SinaRezaeiiiii',
  },
  {
    login: 'algebrajunge',
    avatarUrl: 'https://avatars.githubusercontent.com/u/214626759?v=4',
    profileUrl: 'https://github.com/algebrajunge',
  },
  {
    login: 'behrad193',
    avatarUrl: 'https://avatars.githubusercontent.com/u/174337080?v=4',
    profileUrl: 'https://github.com/behrad193',
  },
  {
    login: 'janMagnusHeimann',
    avatarUrl: 'https://avatars.githubusercontent.com/u/166109684?v=4',
    profileUrl: 'https://github.com/janMagnusHeimann',
  },
  {
    login: 'nnkphbs',
    avatarUrl: 'https://avatars.githubusercontent.com/u/89984920?v=4',
    profileUrl: 'https://github.com/nnkphbs',
  },
  {
    login: 'khashayarAlavi',
    avatarUrl: 'https://avatars.githubusercontent.com/u/184114254?v=4',
    profileUrl: 'https://github.com/khashayarAlavi',
  },
];
