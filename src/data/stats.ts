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
  date: '2026-10-04',
  dateLabel: 'October 4, 2026',
  totalStars: 1_184,
  knownRecentDownloads: 276_861,
  knownLifetimeDownloads: 1_207_908,
};

export const libraryStats: LibraryStat[] = [
  {
    slug: 'typescript',
    name: 'ArchUnitTS',
    language: 'TypeScript',
    stars: 500,
    packageStatus: 'Published on npm',
    downloadAccess: 'public',
    downloadAccessLabel: 'Public download totals',
    recentDownloads: 230_934,
    recentWindow: 'Sep 4 to Oct 3, 2026',
    recentUnavailableLabel: '',
    lifetimeDownloads: 1_013_805,
    lifetimeLabel: 'May 24, 2025 to Oct 3, 2026',
    lifetimeUnavailableLabel: '',
    downloadNote: 'npm package: archunit',
    downloadOverview:
      'npm reports 1,013,805 downloads since the first retained package date, including 230,934 in the latest completed 30-day window.',
    sourceUrl: 'https://www.npmjs.com/package/archunit',
    sourceLabel: 'npm',
  },
  {
    slug: 'python',
    name: 'ArchUnitPython',
    language: 'Python',
    stars: 667,
    packageStatus: 'Published on PyPI',
    downloadAccess: 'public',
    downloadAccessLabel: 'Public download totals',
    recentDownloads: 45_927,
    recentWindow: 'Sep 4 to Oct 3, 2026',
    recentUnavailableLabel: '',
    lifetimeDownloads: 191_664,
    lifetimeLabel: 'Apr 6 to Oct 3, 2026',
    lifetimeUnavailableLabel: '',
    downloadNote: 'PyPI downloads excluding mirrors',
    downloadOverview:
      'PyPI Stats reports 191,664 downloads in its retained public history, excluding mirrors, with 45,927 in the latest completed 30-day window.',
    sourceUrl: 'https://pypi.org/project/archunitpython/',
    sourceLabel: 'PyPI',
  },
  {
    slug: 'rust',
    name: 'ArchUnitRust',
    language: 'Rust',
    stars: 5,
    packageStatus: 'Published on crates.io',
    downloadAccess: 'public',
    downloadAccessLabel: 'Public download totals',
    recentDownloads: null,
    recentWindow: null,
    recentUnavailableLabel: 'No comparable 30-day figure',
    lifetimeDownloads: 115,
    lifetimeLabel: 'All releases through Oct 4, 2026',
    lifetimeUnavailableLabel: '',
    downloadNote: 'crates.io package: archunit 0.0.2',
    downloadOverview:
      'crates.io lists ArchUnitRust 0.0.2 with 115 downloads across its published releases. Its recent counter has no comparable date range, so it is not mixed into the 30-day total.',
    sourceUrl: 'https://crates.io/crates/archunit',
    sourceLabel: 'crates.io',
  },
  {
    slug: 'ruby',
    name: 'ArchUnitRuby',
    language: 'Ruby',
    stars: 4,
    packageStatus: 'Published on RubyGems',
    downloadAccess: 'public',
    downloadAccessLabel: 'Public download totals',
    recentDownloads: null,
    recentWindow: null,
    recentUnavailableLabel: 'No comparable 30-day figure',
    lifetimeDownloads: 2_242,
    lifetimeLabel: 'All versions through Oct 4, 2026',
    lifetimeUnavailableLabel: '',
    downloadNote: 'RubyGems package: archunit',
    downloadOverview:
      'RubyGems reports 2,242 downloads across all ArchUnitRuby versions. It does not expose a comparable rolling 30-day package total.',
    sourceUrl: 'https://rubygems.org/gems/archunit',
    sourceLabel: 'RubyGems',
  },
  {
    slug: 'dotnet',
    name: 'ArchUnit.NET',
    language: '.NET',
    stars: 2,
    packageStatus: 'Published on NuGet',
    downloadAccess: 'public',
    downloadAccessLabel: 'Public download totals',
    recentDownloads: null,
    recentWindow: null,
    recentUnavailableLabel: 'No comparable 30-day figure',
    lifetimeDownloads: 82,
    lifetimeLabel: 'All versions through Oct 4, 2026',
    lifetimeUnavailableLabel: '',
    downloadNote: 'NuGet package: ArchUnit 2.4.0-alpha.2',
    downloadOverview:
      'NuGet reports 82 downloads for the current ArchUnit alpha package. NuGet does not expose a directly comparable rolling 30-day total.',
    sourceUrl: 'https://www.nuget.org/packages/ArchUnit/',
    sourceLabel: 'NuGet',
  },
  {
    slug: 'zig',
    name: 'ArchUnitZig',
    language: 'Zig',
    stars: 2,
    packageStatus: 'Versioned GitHub release',
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
    sourceUrl: 'https://github.com/LukasNiessen/ArchUnitZig/releases/tag/v0.0.2',
    sourceLabel: 'GitHub release',
  },
  {
    slug: 'go',
    name: 'ArchUnitGo',
    language: 'Go',
    stars: 3,
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
    stars: 1,
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
