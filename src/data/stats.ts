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
  date: '2026-11-13',
  dateLabel: 'November 13, 2026',
  totalStars: 1_380,
  knownRecentDownloads: 406_990,
  knownLifetimeDownloads: 1_751_211,
  recentWindowLabel: 'Oct 14 to Nov 12, 2026',
  recentWindowNote:
    'The 30-day figures share the latest complete window available across npm, PyPI, and crates.io. The window ends on November 12, the latest complete day before this snapshot.',
};

export const libraryStats: LibraryStat[] = [
  {
    slug: 'typescript',
    name: 'ArchUnitTS',
    language: 'TypeScript',
    stars: 520,
    packageStatus: 'Published on npm',
    downloadAccess: 'public',
    downloadAccessLabel: 'Public download totals',
    recentDownloads: 345_343,
    recentWindow: statsSnapshot.recentWindowLabel,
    recentUnavailableLabel: '',
    lifetimeDownloads: 1_477_535,
    lifetimeLabel: 'May 24, 2025 to Nov 12, 2026',
    lifetimeUnavailableLabel: '',
    downloadNote: 'npm package: archunit',
    downloadOverview:
      'npm reports 1,477,535 downloads since the package was created, including 345,343 from October 14 to November 12. November 12 is its latest available reporting date.',
    sourceUrl: 'https://www.npmjs.com/package/archunit',
    sourceLabel: 'npm',
  },
  {
    slug: 'python',
    name: 'ArchUnitPython',
    language: 'Python',
    stars: 653,
    packageStatus: 'Published on PyPI',
    downloadAccess: 'public',
    downloadAccessLabel: 'Public download totals',
    recentDownloads: 59_702,
    recentWindow: statsSnapshot.recentWindowLabel,
    recentUnavailableLabel: '',
    lifetimeDownloads: 268_577,
    lifetimeLabel: 'Retained May 16 to Nov 12, 2026',
    lifetimeUnavailableLabel: '',
    downloadNote: 'Daily PyPI Stats counts excluding mirrors; retained history only',
    downloadOverview:
      'PyPI Stats daily records total 268,577 reported downloads excluding mirrors, including 59,702 from October 14 to November 12. Retained history covers May 16 to November 12 with no gaps; this is not a lifetime total.',
    sourceUrl: 'https://pypistats.org/packages/archunitpython',
    sourceLabel: 'PyPI Stats',
  },
  {
    slug: 'rust',
    name: 'ArchUnitRust',
    language: 'Rust',
    stars: 58,
    packageStatus: 'Published on crates.io',
    downloadAccess: 'public',
    downloadAccessLabel: 'Public download totals',
    recentDownloads: 1_945,
    recentWindow: statsSnapshot.recentWindowLabel,
    recentUnavailableLabel: '',
    lifetimeDownloads: 2_567,
    lifetimeLabel: 'All releases through Nov 13, 2026',
    lifetimeUnavailableLabel: '',
    downloadNote: 'archunit 0.0.2; 30-day sum from daily downloads across all releases',
    downloadOverview:
      'crates.io reports 2,567 downloads across all published releases. Its dated daily records total 1,945 from October 14 to November 12 across both releases; the separate 90-day recent counter is not used.',
    sourceUrl: 'https://crates.io/crates/archunit',
    sourceLabel: 'crates.io',
  },
  {
    slug: 'ruby',
    name: 'ArchUnitRuby',
    language: 'Ruby',
    stars: 56,
    packageStatus: 'Published on RubyGems',
    downloadAccess: 'public',
    downloadAccessLabel: 'Public download totals',
    recentDownloads: null,
    recentWindow: null,
    recentUnavailableLabel: 'No comparable 30-day figure',
    lifetimeDownloads: 2_429,
    lifetimeLabel: 'All versions through Nov 13, 2026',
    lifetimeUnavailableLabel: '',
    downloadNote: 'RubyGems package: archunit 1.0.0',
    downloadOverview:
      'RubyGems reports 2,429 downloads across all ArchUnitRuby versions, with 1.0.0 the current release. Its package counter does not provide a comparable rolling 30-day total.',
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
    lifetimeDownloads: 103,
    lifetimeLabel: 'Legacy releases through Nov 13, 2026',
    lifetimeUnavailableLabel: '',
    downloadNote: 'Legacy ArchUnit 2.4.0-alpha.2; promoted implementation unpublished',
    downloadOverview:
      'NuGet reports 103 downloads for the legacy ArchUnit 2.4.0-alpha.2 package. The promoted ArchUnitSharp implementation is not yet published. No comparable rolling 30-day total is available.',
    sourceUrl: 'https://www.nuget.org/packages/ArchUnit/',
    sourceLabel: 'NuGet',
  },
  {
    slug: 'zig',
    name: 'ArchUnitZig',
    language: 'Zig',
    stars: 44,
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
    stars: 44,
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
    downloadNote: 'Maven Central 1.0.0; analytics require publisher access',
    downloadOverview:
      'ArchUnitJava 1.0.0 is published on Maven Central for Maven and Gradle users. Central records download analytics, but only publishers can view them.',
    sourceUrl: 'https://central.sonatype.com/artifact/io.github.tristankruse/archunitjava/1.0.0',
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
