export interface Contributor {
  login: string;
  avatarUrl: string;
  profileUrl: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  linkedinUrl: string;
  githubUrl?: string;
}

export const team: TeamMember[] = [
  {
    name: 'Lukas Niessen',
    role: 'Creator and maintainer',
    bio: 'Lukas started ArchUnitTS to solve a real architecture-testing gap and now stewards the shared direction across the library family.',
    photoUrl: '/team/lukas-niessen.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/lukasniessen/',
    githubUrl: 'https://github.com/LukasNiessen',
  },
  {
    name: 'Jan Heimann',
    role: 'AI and platform engineering',
    bio: 'Jan brings applied AI, MLOps, and platform experience to the question of how architecture guardrails support fast-moving engineering teams.',
    photoUrl: '/team/jan-heimann.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/jan-heimann/',
    githubUrl: 'https://github.com/janMagnusHeimann',
  },
  {
    name: 'Robey Beswick',
    role: 'Cloud and developer experience',
    bio: 'Robey connects cloud engineering with pragmatic developer workflows, helping the project keep delivery and usability in the same conversation.',
    photoUrl: '/team/robey-beswick.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/robey-beswick/',
    githubUrl: 'https://github.com/RobeyBeswick',
  },
  {
    name: 'Tristan Kruse',
    role: 'Product and ecosystem contributor',
    bio: 'Tristan has contributed across the TypeScript, Python, and Ruby projects, with a focus on making the family useful across different engineering contexts.',
    photoUrl: '/team/tristan-kruse.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/tristan-kruse/',
    githubUrl: 'https://github.com/TristanKruse',
  },
  {
    name: 'Deban Kumar Sahu',
    role: 'Python engineering',
    bio: 'Deban develops ArchUnitPython and brings hands-on experience with Python APIs, data tooling, and maintainable backend design.',
    photoUrl: '/team/deban-kumar-sahu.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/debankumarsahu/',
    githubUrl: 'https://github.com/DebanKsahu',
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
    avatarUrl: 'https://avatars.githubusercontent.com/u/209028443?v=4',
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
