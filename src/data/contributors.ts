export interface Contributor {
  login: string;
  avatarUrl: string;
  profileUrl: string;
  contributions: number;
  repositories: string[];
}

export const contributors: Contributor[] = [
  {
    login: 'LukasNiessen',
    avatarUrl: 'https://avatars.githubusercontent.com/u/64063489?v=4',
    profileUrl: 'https://github.com/LukasNiessen',
    contributions: 320,
    repositories: ['ArchUnitTS', 'ArchUnitPython', 'ArchUnitRust', 'ArchUnitZig'],
  },
  {
    login: 'lukasniessen-bain',
    avatarUrl: 'https://avatars.githubusercontent.com/u/266478297?v=4',
    profileUrl: 'https://github.com/lukasniessen-bain',
    contributions: 309,
    repositories: [
      'ArchUnitTS',
      'ArchUnitPython',
      'ArchUnitNET',
      'ArchUnitRuby',
      'ArchUnitRust',
      'ArchUnitGo',
      'ArchUnitJava',
      'ArchUnitPHP',
    ],
  },
  {
    login: 'draugang',
    avatarUrl: 'https://avatars.githubusercontent.com/u/213574636?v=4',
    profileUrl: 'https://github.com/draugang',
    contributions: 305,
    repositories: ['ArchUnitTS'],
  },
  {
    login: 'TristanKruse',
    avatarUrl: 'https://avatars.githubusercontent.com/u/170350429?v=4',
    profileUrl: 'https://github.com/TristanKruse',
    contributions: 90,
    repositories: ['ArchUnitTS', 'ArchUnitPython', 'ArchUnitRuby'],
  },
  {
    login: 'SinaRezaeiiiii',
    avatarUrl: 'https://avatars.githubusercontent.com/u/209028443?v=4',
    profileUrl: 'https://github.com/SinaRezaeiiiii',
    contributions: 69,
    repositories: ['ArchUnitTS', 'ArchUnitNET'],
  },
  {
    login: 'RobeyBeswick',
    avatarUrl: 'https://avatars.githubusercontent.com/u/88316323?v=4',
    profileUrl: 'https://github.com/RobeyBeswick',
    contributions: 52,
    repositories: ['ArchUnitGo'],
  },
  {
    login: 'DebanKsahu',
    avatarUrl: 'https://avatars.githubusercontent.com/u/140151589?v=4',
    profileUrl: 'https://github.com/DebanKsahu',
    contributions: 13,
    repositories: ['ArchUnitPython'],
  },
  {
    login: 'brutalmaths',
    avatarUrl: 'https://avatars.githubusercontent.com/u/46350376?v=4',
    profileUrl: 'https://github.com/brutalmaths',
    contributions: 4,
    repositories: ['ArchUnitTS'],
  },
  {
    login: 'JanMF',
    avatarUrl: 'https://avatars.githubusercontent.com/u/49913967?v=4',
    profileUrl: 'https://github.com/JanMF',
    contributions: 3,
    repositories: ['ArchUnitTS'],
  },
  {
    login: 'freud14',
    avatarUrl: 'https://avatars.githubusercontent.com/u/1090012?v=4',
    profileUrl: 'https://github.com/freud14',
    contributions: 1,
    repositories: ['ArchUnitPython'],
  },
  {
    login: 'khashalavi',
    avatarUrl: 'https://avatars.githubusercontent.com/u/77242627?v=4',
    profileUrl: 'https://github.com/khashalavi',
    contributions: 1,
    repositories: ['ArchUnitTS'],
  },
  {
    login: 'Pahulmeet',
    avatarUrl: 'https://avatars.githubusercontent.com/u/17105932?v=4',
    profileUrl: 'https://github.com/Pahulmeet',
    contributions: 1,
    repositories: ['ArchUnitTS'],
  },
  {
    login: 'behrad193',
    avatarUrl: 'https://avatars.githubusercontent.com/u/174337080?v=4',
    profileUrl: 'https://github.com/behrad193',
    contributions: 1,
    repositories: ['ArchUnitTS'],
  },
  {
    login: 'algebrajunge',
    avatarUrl: 'https://avatars.githubusercontent.com/u/214626759?v=4',
    profileUrl: 'https://github.com/algebrajunge',
    contributions: 1,
    repositories: ['ArchUnitTS'],
  },
  {
    login: 'janMagnusHeimann',
    avatarUrl: 'https://avatars.githubusercontent.com/u/166109684?v=4',
    profileUrl: 'https://github.com/janMagnusHeimann',
    contributions: 1,
    repositories: ['ArchUnitTS'],
  },
  {
    login: 'nnkphbs',
    avatarUrl: 'https://avatars.githubusercontent.com/u/89984920?v=4',
    profileUrl: 'https://github.com/nnkphbs',
    contributions: 1,
    repositories: ['ArchUnitTS'],
  },
  {
    login: 'khashayarAlavi',
    avatarUrl: 'https://avatars.githubusercontent.com/u/184114254?v=4',
    profileUrl: 'https://github.com/khashayarAlavi',
    contributions: 1,
    repositories: ['ArchUnitTS'],
  },
];

export const coreContributors = contributors.filter(
  (contributor) => contributor.contributions >= 10,
);
