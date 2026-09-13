import { describe, expect, it } from 'vitest';

import { contributors, coreContributors } from '../src/data/contributors';
import { projectBySlug, projects, stableProjects } from '../src/data/projects';

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
      expect(project.install.length).toBeGreaterThan(10);
      expect(project.code.split('\n').length).toBeGreaterThan(5);
      expect(project.features.length).toBeGreaterThanOrEqual(6);
      expect(project.useCases.length).toBeGreaterThanOrEqual(4);
      expect(project.repo).toMatch(/^https:\/\/github\.com\/LukasNiessen\//);
      expect(projectBySlug.get(project.slug)).toBe(project);
    }
  });

  it('labels stable releases separately from previews and planned work', () => {
    expect(stableProjects.map((project) => project.slug)).toEqual(['typescript', 'python']);
    expect(projects.filter((project) => project.status === 'planned')).toHaveLength(2);
    expect(projects.filter((project) => project.status === 'preview')).toHaveLength(5);
  });
});

describe('contributors', () => {
  it('contains only human GitHub identities and is ranked by contribution count', () => {
    expect(contributors.length).toBeGreaterThanOrEqual(15);
    expect(contributors.every((person) => !person.login.toLowerCase().includes('bot'))).toBe(true);
    expect(contributors.map((person) => person.contributions)).toEqual(
      [...contributors].map((person) => person.contributions).sort((a, b) => b - a),
    );
  });

  it('derives the core contributor group from the public contribution snapshot', () => {
    expect(coreContributors).toHaveLength(7);
    expect(coreContributors.every((person) => person.contributions >= 10)).toBe(true);
  });
});
