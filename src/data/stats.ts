export type DownloadAccess = 'public' | 'publisher-only' | 'not-reported';

export interface LibraryStat {
  slug: string;
  name: string;
  language: string;
  stars: number;
  packageStatus: string;
  downloadAccess: DownloadAccess;
  downloadAccessLabel: string;
  recentDownloads: number | null;
  recentWindow: string | null;
  recentUnavailableLabel: string;
  lifetimeDownloads: number | null;
  lifetimeLabel: string | null;
  lifetimeUnavailableLabel: string;
  downloadNote: string;
  downloadOverview: string;
  sourceUrl: string;
  sourceLabel: string;
}

export const statsSnapshot = {
  date: '2026-11-07',
  dateLabel: 'November 7, 2026',
  totalStars: 1_299,
  knownRecentDownloads: 396_987,
  knownLifetimeDownloads: 1_665_071,
  recentWindowLabel: 'Oct 8 to Nov 6, 2026',
  recentWindowNote:
    'The 30-day figures share the latest complete window available across npm, PyPI, and crates.io. The window ends on November 6, the latest complete day before this snapshot.',
};

export const libraryStats: LibraryStat[] = [
  {
    slug: 'typescript',
    name: 'ArchUnitTS',
    language: 'TypeScript',
    stars: 516,
    packageStatus: 'Published on npm',
    downloadAccess: 'public',
    downloadAccessLabel: 'Public download totals',
    recentDownloads: 336_567,
    recentWindow: statsSnapshot.recentWindowLabel,
    recentUnavailableLabel: '',
    lifetimeDownloads: 1_399_855,
    lifetimeLabel: 'May 24, 2025 to Nov 6, 2026',
    lifetimeUnavailableLabel: '',
    downloadNote: 'npm package: archunit',
    downloadOverview:
      'npm reports 1,399,855 downloads since the package was created, including 336,567 from October 8 to November 6. November 6 is its latest available reporting date.',
    sourceUrl: 'https://www.npmjs.com/package/archunit',
    sourceLabel: 'npm',
  },
  {
    slug: 'python',
    name: 'ArchUnitPython',
    language: 'Python',
    stars: 650,
    packageStatus: 'Published on PyPI',
    downloadAccess: 'public',
    downloadAccessLabel: 'Public download totals',
    recentDownloads: 58_620,
    recentWindow: statsSnapshot.recentWindowLabel,
    recentUnavailableLabel: '',
    lifetimeDownloads: 260_689,
    lifetimeLabel: 'Retained Apr 8 to Nov 6, 2026',
    lifetimeUnavailableLabel: '',
    downloadNote: 'Daily PyPI Stats counts excluding mirrors; retained history has gaps',
    downloadOverview:
      'PyPI Stats daily records total 260,689 reported downloads excluding mirrors, including 58,620 from October 8 to November 6. Retained history omits April 15, 18, and 19; this is not a lifetime total.',
    sourceUrl: 'https://pypistats.org/packages/archunitpython',
    sourceLabel: 'PyPI Stats',
  },
  {
    slug: 'rust',
    name: 'ArchUnitRust',
    language: 'Rust',
    stars: 34,
    packageStatus: 'Published on crates.io',
    downloadAccess: 'public',
    downloadAccessLabel: 'Public download totals',
    recentDownloads: 1_800,
    recentWindow: statsSnapshot.recentWindowLabel,
    recentUnavailableLabel: '',
    lifetimeDownloads: 2_014,
    lifetimeLabel: 'All releases through Nov 7, 2026',
    lifetimeUnavailableLabel: '',
    downloadNote: 'archunit 0.0.2; 30-day sum from daily downloads across all releases',
    downloadOverview:
      'crates.io reports 2,014 downloads across all published releases. Its dated daily records total 1,800 from October 8 to November 6 across both releases; the separate 90-day recent counter is not used.',
    sourceUrl: 'https://crates.io/crates/archunit',
    sourceLabel: 'crates.io',
  },
  {
    slug: 'ruby',
    name: 'ArchUnitRuby',
    language: 'Ruby',
    stars: 33,
    packageStatus: 'Published on RubyGems',
    downloadAccess: 'public',
    downloadAccessLabel: 'Public download totals',
    recentDownloads: null,
    recentWindow: null,
    recentUnavailableLabel: 'No comparable 30-day figure',
    lifetimeDownloads: 2_411,
    lifetimeLabel: 'All versions through Nov 7, 2026',
    lifetimeUnavailableLabel: '',
    downloadNote: 'RubyGems package: archunit 1.0.0',
    downloadOverview:
      'RubyGems reports 2,411 downloads across all ArchUnitRuby versions, with 1.0.0 the current release. Its package counter does not provide a comparable rolling 30-day total.',
    sourceUrl: 'https://rubygems.org/gems/archunit',
    sourceLabel: 'RubyGems',
  },
  {
    slug: 'dotnet',
    name: 'ArchUnit.NET',
    language: '.NET',
    stars: 3,
    packageStatus: 'Legacy package on NuGet',
    downloadAccess: 'public',
    downloadAccessLabel: 'Public download totals',
    recentDownloads: null,
    recentWindow: null,
    recentUnavailableLabel: 'No comparable 30-day figure',
    lifetimeDownloads: 102,
    lifetimeLabel: 'Legacy releases through Nov 7, 2026',
    lifetimeUnavailableLabel: '',
    downloadNote: 'Legacy ArchUnit 2.4.0-alpha.2; promoted implementation unpublished',
    downloadOverview:
      'NuGet reports 102 downloads for the legacy ArchUnit 2.4.0-alpha.2 package. The promoted ArchUnitSharp implementation is not yet published. No comparable rolling 30-day total is available.',
    sourceUrl: 'https://www.nuget.org/packages/ArchUnit/',
    sourceLabel: 'NuGet',
  },
  {
    slug: 'zig',
    name: 'ArchUnitZig',
    language: 'Zig',
    stars: 30,
    packageStatus: 'Versioned GitHub prerelease',
    downloadAccess: 'not-reported',
    downloadAccessLabel: 'No ecosystem download counter',
    recentDownloads: null,
    recentWindow: null,
    recentUnavailableLabel: 'Not reported by the ecosystem',
    lifetimeDownloads: null,
    lifetimeLabel: null,
    lifetimeUnavailableLabel: 'Not reported by the ecosystem',
    downloadNote: 'Installed from the pinned v0.0.2 release archive',
    downloadOverview:
      'ArchUnitZig is installed from its versioned GitHub release. Zig has no central package registry that reports a comparable download total.',
    sourceUrl: 'https://github.com/dragonsec-ai/ArchUnitZig/releases/tag/v0.0.2',
    sourceLabel: 'GitHub release',
  },
  {
    slug: 'go',
    name: 'ArchUnitGo',
    language: 'Go',
    stars: 31,
    packageStatus: 'Public Go module',
    downloadAccess: 'not-reported',
    downloadAccessLabel: 'No ecosystem download counter',
    recentDownloads: null,
    recentWindow: null,
    recentUnavailableLabel: 'Not reported by pkg.go.dev',
    lifetimeDownloads: null,
    lifetimeLabel: null,
    lifetimeUnavailableLabel: 'Not reported by pkg.go.dev',
    downloadNote: 'pkg.go.dev publishes documentation, not install totals',
    downloadOverview:
      'ArchUnitGo is available as a public Go module and is documented on pkg.go.dev. The Go module ecosystem does not publish package download counts.',
    sourceUrl: 'https://pkg.go.dev/github.com/LukasNiessen/ArchUnitGo',
    sourceLabel: 'pkg.go.dev',
  },
  {
    slug: 'java',
    name: 'ArchUnitJava',
    language: 'Java',
    stars: 2,
    packageStatus: 'Published on Maven Central',
    downloadAccess: 'publisher-only',
    downloadAccessLabel: 'Download totals are publisher-only',
    recentDownloads: null,
    recentWindow: null,
    recentUnavailableLabel: 'Publisher-only analytics',
    lifetimeDownloads: null,
    lifetimeLabel: null,
    lifetimeUnavailableLabel: 'Publisher-only analytics',
    downloadNote: 'Maven Central 0.1.0; analytics require publisher access',
    downloadOverview:
      'ArchUnitJava 0.1.0 is published on Maven Central for Maven and Gradle users. Central records download analytics, but only publishers can view them.',
    sourceUrl: 'https://central.sonatype.com/artifact/io.github.tristankruse/archunitjava/0.1.0',
    sourceLabel: 'Maven Central',
  },
  {
    slug: 'php',
    name: 'ArchUnitPHP',
    language: 'PHP',
    stars: 0,
    packageStatus: 'No Composer package published',
    downloadAccess: 'public',
    downloadAccessLabel: 'Public totals after publication',
    recentDownloads: null,
    recentWindow: null,
    recentUnavailableLabel: 'No package published',
    lifetimeDownloads: null,
    lifetimeLabel: null,
    lifetimeUnavailableLabel: 'No package published',
    downloadNote: 'Packagist supports public totals; ArchUnitPHP is not published yet',
    downloadOverview:
      'Packagist publishes download statistics for Composer packages, but the ArchUnitPHP README currently describes a delivery skeleton with no package to install.',
    sourceUrl: 'https://github.com/LukasNiessen/ArchUnitPHP',
    sourceLabel: 'Repository status',
  },
];

export const libraryStatBySlug = new Map(
  libraryStats.map((library) => [library.slug, library] as const),
);
