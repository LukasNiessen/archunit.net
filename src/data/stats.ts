export interface LibraryStat {
  slug: string;
  name: string;
  language: string;
  stars: number;
  recentDownloads: number | null;
  recentWindow: string | null;
  lifetimeDownloads: number | null;
  lifetimeLabel: string | null;
  downloadNote: string;
  sourceUrl: string;
  sourceLabel: string;
}

export const statsSnapshot = {
  date: '2026-09-13',
  dateLabel: 'September 13, 2026',
  totalStars: 733,
  knownRecentDownloads: 213_497,
  knownLifetimeDownloads: 962_975,
};

export const libraryStats: LibraryStat[] = [
  {
    slug: 'typescript',
    name: 'ArchUnitTS',
    language: 'TypeScript',
    stars: 479,
    recentDownloads: 172_892,
    recentWindow: 'Aug 13 to Sep 11',
    lifetimeDownloads: 804_221,
    lifetimeLabel: 'Since May 24, 2025',
    downloadNote: 'npm package: archunit',
    sourceUrl: 'https://www.npmjs.com/package/archunit',
    sourceLabel: 'npm',
  },
  {
    slug: 'python',
    name: 'ArchUnitPython',
    language: 'Python',
    stars: 241,
    recentDownloads: 40_605,
    recentWindow: 'Aug 14 to Sep 12',
    lifetimeDownloads: 156_464,
    lifetimeLabel: 'Since Apr 2, 2026',
    downloadNote: 'PyPI downloads excluding mirrors',
    sourceUrl: 'https://pypi.org/project/archunitpython/',
    sourceLabel: 'PyPI',
  },
  {
    slug: 'rust',
    name: 'ArchUnitRust',
    language: 'Rust',
    stars: 4,
    recentDownloads: null,
    recentWindow: null,
    lifetimeDownloads: null,
    lifetimeLabel: null,
    downloadNote: 'Installed from Git; Git does not publish install counts',
    sourceUrl: 'https://github.com/LukasNiessen/ArchUnitRust',
    sourceLabel: 'GitHub',
  },
  {
    slug: 'ruby',
    name: 'ArchUnitRuby',
    language: 'Ruby',
    stars: 3,
    recentDownloads: null,
    recentWindow: null,
    lifetimeDownloads: 2_214,
    lifetimeLabel: 'All versions',
    downloadNote: 'RubyGems does not expose a comparable 30-day total',
    sourceUrl: 'https://rubygems.org/gems/archunit',
    sourceLabel: 'RubyGems',
  },
  {
    slug: 'dotnet',
    name: 'ArchUnit.NET',
    language: '.NET',
    stars: 2,
    recentDownloads: null,
    recentWindow: null,
    lifetimeDownloads: 76,
    lifetimeLabel: 'All versions',
    downloadNote: 'NuGet does not expose a comparable 30-day total',
    sourceUrl: 'https://www.nuget.org/packages/ArchUnit/',
    sourceLabel: 'NuGet',
  },
  {
    slug: 'zig',
    name: 'ArchUnitZig',
    language: 'Zig',
    stars: 2,
    recentDownloads: null,
    recentWindow: null,
    lifetimeDownloads: null,
    lifetimeLabel: null,
    downloadNote: 'One release-asset download; no package-registry total',
    sourceUrl: 'https://github.com/LukasNiessen/ArchUnitZig/releases/tag/v0.0.1',
    sourceLabel: 'GitHub release',
  },
  {
    slug: 'go',
    name: 'ArchUnitGo',
    language: 'Go',
    stars: 2,
    recentDownloads: null,
    recentWindow: null,
    lifetimeDownloads: null,
    lifetimeLabel: null,
    downloadNote: 'The public Go module proxy does not report download counts',
    sourceUrl: 'https://pkg.go.dev/github.com/LukasNiessen/ArchUnitGo',
    sourceLabel: 'pkg.go.dev',
  },
  {
    slug: 'java',
    name: 'ArchUnitJava',
    language: 'Java',
    stars: 0,
    recentDownloads: null,
    recentWindow: null,
    lifetimeDownloads: null,
    lifetimeLabel: null,
    downloadNote: 'Planned library; no package has been published',
    sourceUrl: 'https://github.com/LukasNiessen/ArchUnitJava',
    sourceLabel: 'GitHub',
  },
  {
    slug: 'php',
    name: 'ArchUnitPHP',
    language: 'PHP',
    stars: 0,
    recentDownloads: null,
    recentWindow: null,
    lifetimeDownloads: null,
    lifetimeLabel: null,
    downloadNote: 'Planned library; no package has been published',
    sourceUrl: 'https://github.com/LukasNiessen/ArchUnitPHP',
    sourceLabel: 'GitHub',
  },
];
