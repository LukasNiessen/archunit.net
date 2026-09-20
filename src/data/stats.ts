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
  date: '2026-09-20',
  dateLabel: 'September 20, 2026',
  totalStars: 1_166,
  knownRecentDownloads: 193_166,
  knownLifetimeDownloads: 1_006_921,
};

export const libraryStats: LibraryStat[] = [
  {
    slug: 'typescript',
    name: 'ArchUnitTS',
    language: 'TypeScript',
    stars: 488,
    recentDownloads: 155_390,
    recentWindow: 'Aug 21 to Sep 19',
    lifetimeDownloads: 839_642,
    lifetimeLabel: 'May 24, 2025 to Sep 19, 2026',
    downloadNote: 'npm package: archunit',
    sourceUrl: 'https://www.npmjs.com/package/archunit',
    sourceLabel: 'npm',
  },
  {
    slug: 'python',
    name: 'ArchUnitPython',
    language: 'Python',
    stars: 663,
    recentDownloads: 37_776,
    recentWindow: 'Rolling 30 days through Sep 19',
    lifetimeDownloads: 164_978,
    lifetimeLabel: 'Apr 2 to Sep 19, 2026',
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
    lifetimeDownloads: 2_225,
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
    stars: 3,
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
    stars: 1,
    recentDownloads: null,
    recentWindow: null,
    lifetimeDownloads: null,
    lifetimeLabel: null,
    downloadNote: 'Published on Maven Central; no comparable public download total is available',
    sourceUrl: 'https://central.sonatype.com/artifact/io.github.tristankruse/archunitjava/0.1.0',
    sourceLabel: 'Maven Central',
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
