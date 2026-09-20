import { describe, expect, it } from 'vitest';

import { contributors, team } from '../src/data/contributors';
import { documentationBySlug } from '../src/data/documentation';
import { jobs } from '../src/data/jobs';
import { posts, postsByNewest } from '../src/data/posts';
import { projectBySlug, projects, stableProjects } from '../src/data/projects';
import { enterpriseResources } from '../src/data/resources';
import { libraryStats, statsSnapshot } from '../src/data/stats';

describe('project catalogue', () => {
  it('contains one unique page for every primary implementation', () => {
    expect(projects).toHaveLength(9);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
    expect(new Set(projects.map((project) => project.repo)).size).toBe(projects.length);
    expect(projects.map((project) => project.slug)).toEqual(
      expect.arrayContaining([
        'typescript',
        'python',
        'dotnet',
        'ruby',
        'rust',
        'zig',
        'go',
        'java',
        'php',
      ]),
    );
  });

  it('provides complete, linkable SEO content for every implementation', () => {
    for (const project of projects) {
      expect(project.name.length).toBeGreaterThan(4);
      expect(project.description.length).toBeGreaterThan(40);
      expect(project.longDescription.length).toBeGreaterThan(100);
      expect(project.languageOverview.length).toBeGreaterThan(180);
      expect(project.ecosystemHighlights).toHaveLength(3);
      expect(project.install.length).toBeGreaterThan(10);
      expect(project.code.split('\n').length).toBeGreaterThan(5);
      expect(project.deepDiveCode.split('\n').length).toBeGreaterThan(5);
      expect(project.features.length).toBeGreaterThanOrEqual(6);
      expect(project.useCases.length).toBeGreaterThanOrEqual(4);
      expect(project.repo).toMatch(/^https:\/\/github\.com\/LukasNiessen\//);
      expect(projectBySlug.get(project.slug)).toBe(project);
      const documentation = documentationBySlug[project.slug];
      expect(documentation).toBeDefined();
      expect(documentation!.introduction.length).toBeGreaterThan(100);
      expect(documentation!.topics).toHaveLength(3);
      expect(documentation!.topics.every((topic) => topic.points.length === 3)).toBe(true);
    }
  });

  it('labels stable releases separately from previews and planned work', () => {
    expect(stableProjects.map((project) => project.slug)).toEqual(['typescript', 'python']);
    expect(projects.filter((project) => project.status === 'planned')).toHaveLength(1);
    expect(projects.filter((project) => project.status === 'preview')).toHaveLength(6);
  });
});

describe('contributors', () => {
  it('contains only human GitHub identities without duplicate Lukas accounts', () => {
    expect(contributors.length).toBeGreaterThanOrEqual(15);
    expect(contributors.every((person) => !person.login.toLowerCase().includes('bot'))).toBe(true);
    expect(contributors.map((person) => person.login)).not.toContain('draugang');
    expect(contributors.map((person) => person.login)).not.toContain('lukasniessen-bain');
    expect(contributors.map((person) => person.login)).toContain('SinaRezaeiiiii');
  });

  it('presents the requested five-person team with LinkedIn links and local photos', () => {
    expect(team).toHaveLength(5);
    expect(team.map((person) => person.name)).toEqual([
      'Lukas Niessen',
      'Tristan Kruse',
      'Jan Heimann',
      'Deban Kumar Sahu',
      'Robey Beswick',
    ]);
    expect(
      team.every((person) => person.linkedinUrl.startsWith('https://www.linkedin.com/in/')),
    ).toBe(true);
    expect(team.every((person) => person.photoUrl.startsWith('/team/'))).toBe(true);
    expect(new Set(team.map((person) => person.slug)).size).toBe(team.length);
    expect(team.every((person) => person.profile.length >= 3)).toBe(true);
    expect(team.every((person) => person.focusAreas.length === 3)).toBe(true);
    expect(team.every((person) => person.projectWork.length >= 3)).toBe(true);
    expect(team.every((person) => person.workingPrinciple.length > 50)).toBe(true);
    expect(team.find((person) => person.slug === 'tristan-kruse')?.email).toBe(
      'krusetristan1@gmail.com',
    );
  });
});

describe('statistics snapshot', () => {
  it('contains one sourced entry for every library and internally consistent totals', () => {
    expect(libraryStats).toHaveLength(projects.length);
    expect(new Set(libraryStats.map((library) => library.slug))).toEqual(
      new Set(projects.map((project) => project.slug)),
    );
    expect(libraryStats.reduce((sum, library) => sum + library.stars, 0)).toBe(
      statsSnapshot.totalStars,
    );
    expect(libraryStats.reduce((sum, library) => sum + (library.recentDownloads ?? 0), 0)).toBe(
      statsSnapshot.knownRecentDownloads,
    );
    expect(libraryStats.reduce((sum, library) => sum + (library.lifetimeDownloads ?? 0), 0)).toBe(
      statsSnapshot.knownLifetimeDownloads,
    );
    expect(libraryStats.every((library) => library.sourceUrl.startsWith('https://'))).toBe(true);
  });
});

describe('blog', () => {
  it('contains adapted, indexable project articles', () => {
    expect(posts).toHaveLength(6);
    expect(new Set(posts.map((post) => post.slug)).size).toBe(posts.length);
    expect(posts.map((post) => post.slug)).toContain('archunitts-vs-tsarch');
    const internalPosts = posts.filter((post) => !post.externalUrl);
    const externalPosts = posts.filter((post) => post.externalUrl);
    expect(internalPosts.every((post) => post.sections.length >= 7)).toBe(true);
    expect(internalPosts.every((post) => Number.parseInt(post.readingTime, 10) >= 10)).toBe(true);
    expect(internalPosts.every((post) => post.authorSlugs?.join(',') === 'lukas-niessen')).toBe(
      true,
    );
    expect(externalPosts).toHaveLength(1);
    expect(externalPosts[0]).toMatchObject({
      title: 'Your Python Architecture Should Be Tested, Not Just Documented',
      authorSlugs: ['tristan-kruse'],
      published: '2026-07-26',
      externalUrl:
        'https://medium.com/@krusetristan1/your-python-architecture-should-be-tested-not-just-documented-23b2e7a18c00',
    });
    expect(postsByNewest.map((post) => post.published)).toEqual(
      [...posts.map((post) => post.published)].sort().reverse(),
    );
    expect(
      internalPosts.every(
        (post) =>
          post.sections.reduce(
            (length, section) => length + section.paragraphs.join(' ').length,
            0,
          ) > 4_000,
      ),
    ).toBe(true);
  });
});

describe('jobs', () => {
  it('publishes five realistic roles without salary claims', () => {
    expect(jobs).toHaveLength(5);
    expect(jobs.filter((job) => job.discipline === 'Engineering')).toHaveLength(3);
    expect(jobs.filter((job) => job.discipline === 'Go to market')).toHaveLength(2);
    expect(jobs.every((job) => /Remote Europe|Munich/.test(job.location))).toBe(true);
    expect(JSON.stringify(jobs)).not.toMatch(/salary|compensation/i);
  });
});

describe('enterprise resources', () => {
  it('publishes a balanced library of papers, field guides, and case studies', () => {
    expect(enterpriseResources).toHaveLength(6);
    expect(new Set(enterpriseResources.map((resource) => resource.slug)).size).toBe(6);
    expect(enterpriseResources.filter((resource) => resource.type === 'White paper')).toHaveLength(
      2,
    );
    expect(enterpriseResources.filter((resource) => resource.type === 'Field guide')).toHaveLength(
      2,
    );
    expect(enterpriseResources.filter((resource) => resource.type === 'Case study')).toHaveLength(
      2,
    );
    expect(enterpriseResources.every((resource) => resource.summary.length > 100)).toBe(true);
  });
});
