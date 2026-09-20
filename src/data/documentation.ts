export interface DocumentationTopic {
  title: string;
  summary: string;
  points: string[];
}

export interface ProjectDocumentation {
  introduction: string;
  topics: DocumentationTopic[];
}

export const documentationBySlug: Record<string, ProjectDocumentation> = {
  typescript: {
    introduction:
      'ArchUnitTS follows the TypeScript project your compiler already knows, then exposes focused rules, metrics, and graph reports through a fluent API. These are the parts most teams use after the first boundary test.',
    topics: [
      {
        title: 'Select the code that carries the rule',
        summary:
          'Start from projectFiles(), then narrow the subject by filename, folder, or full path. String globs and regular expressions are supported, and repeated selectors narrow the same population.',
        points: [
          'withName() matches only the filename; inFolder() excludes the filename; inPath() sees the complete project-relative path.',
          'The extractor reads tsconfig include and exclude settings, path aliases, and referenced projects instead of inventing a second project model.',
          'Jest, Vitest, Jasmine, and runner-neutral check() calls all execute the same Checkable rule.',
        ],
      },
      {
        title: 'Move from imports to architecture',
        summary:
          'Rules can prohibit a dependency direction, detect circular imports, name layers, cut the project into slices, or compare the graph with a PlantUML component diagram.',
        points: [
          'Cycle checks operate on internal edges and report the complete dependency path that closes each loop.',
          'Graph queries can focus on a pattern, follow reachable dependencies, find dependants, or collapse nodes to a folder depth.',
          'DOT, Mermaid, D2, CSV, JSON, and standalone HTML render the same graph snapshot for different review workflows.',
        ],
      },
      {
        title: 'Measure pressure, not just breakage',
        summary:
          'The metrics API adds file size, declarations, cohesion, coupling, instability, and distance-from-main-sequence constraints to binary dependency rules.',
        points: [
          'Count rules cover lines, statements, methods, fields, classes, interfaces, functions, and imports.',
          'LCOM variants make class cohesion testable, while distance metrics expose abstractness and outgoing-versus-incoming coupling.',
          'Custom predicates and custom metrics keep project-specific decisions inside the same reporting and test integration layer.',
        ],
      },
    ],
  },
  python: {
    introduction:
      'ArchUnitPython analyzes source without importing the target application. It turns ordinary Python modules into a dependency graph, preserves useful import context, and lets pytest, unittest, or any caller assert on structured violations.',
    topics: [
      {
        title: 'Analyze Python without executing it',
        summary:
          'The extractor walks .py files, parses them with Python ASTs, and resolves absolute and relative imports back to project files or external module names.',
        points: [
          '.archignore augments safe defaults for virtual environments, caches, builds, generated code, and project-specific exclusions.',
          'Literal importlib.import_module() and __import__() calls are recognized, while non-literal dynamic behavior is not guessed.',
          'TYPE_CHECKING and conditional ImportError paths retain their import kind, and scoped ignore comments can remove known compatibility edges.',
        ],
      },
      {
        title: 'Express files, layers, and slices',
        summary:
          'File rules check naming, placement, cycles, internal dependencies, external dependencies, or a custom predicate. Layer and slice rules project the same graph into larger architectural units.',
        points: [
          'Named layers support allowlists and blocklists, including sealed layers that may not depend on another named layer.',
          'Slices derive names from paths or regular expressions and can enforce an allowed component diagram.',
          'Selectors fail when they match nothing by default, preventing a renamed folder from turning a useful test into a silent pass.',
        ],
      },
      {
        title: 'Set thresholds from evidence',
        summary:
          'Metric comparisons are exact and evaluate each selected file or class independently. The practical starting point is the current project baseline, tightened deliberately over time.',
        points: [
          'Use strict or inclusive comparisons explicitly, such as should_be_below() versus should_be_below_or_equal().',
          'Count, LCOM, coupling, instability, abstractness, and main-sequence distance cover both local size and graph-level design pressure.',
          'Graph and metric results export to reviewable formats, while because() keeps the architectural reason beside the threshold.',
        ],
      },
    ],
  },
  dotnet: {
    introduction:
      'ArchUnit.NET uses Roslyn to read C# projects and keeps extraction, projection, assertion, and reporting separate. The current alpha is designed for realistic adoption through familiar .NET test runners and structured output.',
    topics: [
      {
        title: 'Read the solution through Roslyn',
        summary:
          'C# syntax trees and project information become normalized dependency edges before any rule is evaluated.',
        points: [
          'Project and solution entry points support file, naming, cycle, and dependency-direction checks.',
          'The same extracted graph is projected into files, layers, slices, and metrics rather than reparsed for every rule family.',
          'Package installation uses ArchUnit, while the C# namespaces remain under ArchUnitNet.',
        ],
      },
      {
        title: 'Adopt rules without hiding legacy debt',
        summary:
          'Violation baselines allow an established solution to record existing findings while failing on newly introduced architectural drift.',
        points: [
          'Architecture presets provide a faster starting point for recurring solution shapes.',
          'xUnit, NUnit, and MSTest adapters sit above the same generic CheckAsync result.',
          'Structured violations make it possible to write organization-specific assertions without parsing console text.',
        ],
      },
      {
        title: 'Bring findings into delivery',
        summary:
          'Text and HTML reports serve people, JSON serves automation, and SARIF can place architecture findings beside other code-scanning results.',
        points: [
          'dotnet test remains the ordinary execution path in local development and CI.',
          'Performance profiling helps teams understand extraction cost on larger solutions.',
          'The alpha status is explicit: APIs may change while extraction and the full test matrix are hardened.',
        ],
      },
    ],
  },
  ruby: {
    introduction:
      'ArchUnitRuby uses Prism for static analysis, so architecture checks do not boot the Rails application or execute gem code. It resolves common Ruby loading forms while staying explicit about dynamic behavior it cannot know safely.',
    topics: [
      {
        title: 'Understand Ruby loading statically',
        summary:
          'require, require_relative, autoload, and load calls become typed graph edges with normalized project-relative paths.',
        points: [
          'Standard-library and gem dependencies retain the module name written in source.',
          'Multiple-gem repositories contribute adjacent lib directories from gemspec locations without evaluating the gemspecs.',
          'Interpolated or variable-driven imports are omitted rather than guessed because resolving them would require running application code.',
        ],
      },
      {
        title: 'Guard Rails and Ruby boundaries',
        summary:
          'File, layer, and slice rules cover dependency direction, cycles, naming, placement, diagrams, and modular-monolith boundaries.',
        points: [
          'RSpec and Minitest helpers format the same underlying violation objects.',
          'PlantUML conformance connects a component diagram to the dependencies present in source.',
          'Inline ignore directives and explicit load paths handle compatibility edges and non-standard repository layouts.',
        ],
      },
      {
        title: 'Inspect the graph and metrics',
        summary:
          'Graph reports and count, cohesion, coupling, and distance measures make architectural pressure visible before a hard boundary breaks.',
        points: [
          'Graph caching includes normalized load-path choices, so equivalent checks reuse extraction work.',
          'Per-check logging can write to an IO stream or timestamped files without a global logger.',
          'Custom predicates extend the grammar for conventions that are unique to a codebase.',
        ],
      },
    ],
  },
  rust: {
    introduction:
      'ArchUnitRust follows Cargo workspace and module semantics, then applies the shared ArchUnit vocabulary through Rust-native ownership, immutable builders, and structured results.',
    topics: [
      {
        title: 'Extract Rust-specific dependency evidence',
        summary:
          'use, pub use, extern crate, mod declarations, and qualified paths are resolved into internal or external graph edges.',
        points: [
          'Cargo packages and workspace sources are discovered with project-relative identifiers and memoized extraction.',
          'Parallel edges keep their import kinds so structural module ownership can be distinguished from executable dependencies.',
          'Scoped archunit ignore comments omit a known path without suppressing unrelated evidence from the same file.',
        ],
      },
      {
        title: 'Write rules as ordinary Rust tests',
        summary:
          'File, layer, slice, metric, and graph builders produce Checkable values consumed by assertion macros or framework-neutral result handling.',
        points: [
          'Cycle rules can exclude mod and pub use edges while retaining a parallel use or path-reference edge.',
          'Layer policies and slices model architectural ownership above individual modules.',
          'The library runs its own public rules against its internal modules as executable self-architecture.',
        ],
      },
      {
        title: 'Keep evidence deterministic',
        summary:
          'Offline graph and metrics reports are designed to produce stable artifacts that can be reviewed beside code.',
        points: [
          'Check options control exclusions, logging, empty selections, dependency kinds, and cache refresh.',
          'Typed violations remain data until the assertion or reporting boundary phrases them for a human.',
          'The Git-based preview is intentionally explicit about its compatibility status and installation source.',
        ],
      },
    ],
  },
  zig: {
    introduction:
      'ArchUnitZig uses Zig 0.16 ASTs and explicit compilation-unit information to model imports without executing build.zig. Ownership and allocation stay visible in the public API.',
    topics: [
      {
        title: 'Classify more than Zig source imports',
        summary:
          'Literal @import, @embedFile, @cImport, and @cInclude references retain target class, availability, import kind, and source location.',
        points: [
          'Relative Zig and ZON files can remain project-owned, while std, builtin, and unresolved aliases stay external and visible.',
          'CompilationUnitOverride maps named imports and root for each library, executable, or test without pretending to understand arbitrary build scripts.',
          'Strict parsing rejects malformed source; permissive parsing returns diagnostics without partial edges from that file.',
        ],
      },
      {
        title: 'Model packages and workspaces honestly',
        summary:
          'Single packages, explicit workspace lists, and discovered build.zig.zon packages use qualified identifiers so equal paths in different packages cannot collapse.',
        points: [
          'Workspace and package .archignore files apply at their documented scope and participate in graph cache identity.',
          'Symlink, cache, output, VCS, documentation, and dependency trees are not followed during discovery.',
          'Every extraction option that changes the graph is included in the cache key.',
        ],
      },
      {
        title: 'Evaluate and report with owned data',
        summary:
          'File, layer, slice, metric, and graph modules return owned violations or artifacts with explicit error context.',
        points: [
          'Architecture disagreements are values; invalid selectors are user errors; parsing, I/O, and allocation failures are technical errors.',
          'assertAllPass combines heterogeneous rules without losing the rule sentence behind each finding.',
          'The v0.0.1 release is a preview pinned to Zig 0.16 rather than a stable compatibility promise.',
        ],
      },
    ],
  },
  go: {
    introduction:
      'ArchUnitGo divides every check into source discovery, language-aware extraction, language-neutral projection, pure assertion, and reporting. That boundary is also how the repository tests and explains itself.',
    topics: [
      {
        title: 'Keep Go knowledge at the extraction edge',
        summary:
          'The nearest go.mod defines the project, Go analysis packages resolve imports, and build tags determine the production source set.',
        points: [
          'Project-relative forward-slash identifiers keep rules stable across operating systems.',
          'Every file receives a self-edge so an isolated file still exists as a graph node.',
          'Extraction is memoized per process and can include test files or alternate build constraints through CheckOptions.',
        ],
      },
      {
        title: 'Project one graph into useful questions',
        summary:
          'Files, layers, slices, metrics, and graph reports reuse the same labels and edges while adding their own selectors and violation types.',
        points: [
          'Layer allowlists and blocklists report one architectural relationship with the concrete imports that prove it.',
          'Slice names are cut from path captures, while graph queries can focus, traverse, or collapse before rendering.',
          'Checkable is the common seam: every rule returns structured violations plus a technical error separately.',
        ],
      },
      {
        title: 'Refuse accidental green tests',
        summary:
          'A rule selecting no files yields an EmptyTestViolation by default, and empty graph or report terminals return a named error.',
        points: [
          'AllowEmptyTests is an explicit opt-out when an empty scope is genuinely intended.',
          'Selectors expose inspection methods so teams can see the files, layers, or slices a pattern actually matched.',
          'README examples and exported identifiers are checked against source to make documentation drift testable.',
        ],
      },
    ],
  },
  java: {
    introduction:
      'ArchUnitJava 0.1.0 is a public beta on Maven Central. It imports compiled Java as data, projects an immutable dependency model, evaluates deterministic policies, and preserves structured evidence for JUnit and CI.',
    topics: [
      {
        title: 'Import compiled Java without loading it',
        summary:
          'Point the importer at class directories, classpaths, or ordinary and multi-release JARs after the target project has compiled.',
        points: [
          'Target classes are never loaded or initialized; bytecode is parsed as untrusted data.',
          'The tested corpus covers javac bytecode from Java 8 through Java 25 while the analyzer itself runs on JDK 25.',
          'Missing external types remain visible as incomplete analysis instead of being guessed or silently discarded.',
        ],
      },
      {
        title: 'Choose the policy surface that fits the team',
        summary:
          'A strict properties interface covers common type and package dependency boundaries, while the Java API opens the complete model.',
        points: [
          'Rules cover dependencies, naming, inheritance, annotations, member access, cycles, layers, slices, JPMS modules, reachability, coverage, diagrams, and presets.',
          'Empty selections fail by default, and incomplete analysis is distinct from a passing or failing architecture policy.',
          'Reviewed baselines let an established codebase reject new findings while existing architecture debt is removed deliberately.',
        ],
      },
      {
        title: 'Integrate with JUnit and delivery systems',
        summary:
          'The recommended public-beta workflow calls CliRunner from an ordinary JUnit test, with lower-level assertions and a JUnit Platform engine available when needed.',
        points: [
          'Add io.github.tristankruse:archunitjava:0.1.0 as a test dependency from Maven Central.',
          'Render findings as console text, canonical JSON, SARIF, or JUnit XML and dependency graphs as DOT, Mermaid, D2, CSV, JSON, or standalone HTML.',
          'The pre-1.0 Java API remains provisional, so minor versions may require reviewed migration work.',
        ],
      },
    ],
  },
  php: {
    introduction:
      'ArchUnitPHP is a delivery skeleton with an explicit design direction. It is not presented as a released package, and the current documentation separates intended behavior from shipped behavior.',
    topics: [
      {
        title: 'Resolve PHP without booting the app',
        summary:
          'The planned extraction layer will read PHP source and Composer autoloading information without loading or executing application code.',
        points: [
          'Namespaces, use declarations, includes, and symbol dependencies need source-backed resolution.',
          'Composer source roots and package boundaries must remain visible rather than being inferred from conventions alone.',
          'Dynamic runtime behavior will require explicit limits instead of guessed graph edges.',
        ],
      },
      {
        title: 'Keep rules portable and PHP-native',
        summary:
          'The target grammar mirrors the family while preserving PHP method chaining and ecosystem conventions.',
        points: [
          'Lazy, immutable builders will describe the rule before project analysis begins.',
          'Structured violations keep the core independent from PHPUnit and Pest.',
          'Pure graph algorithms can be tested apart from real-project extraction.',
        ],
      },
      {
        title: 'Make maturity impossible to misread',
        summary:
          'The repository currently tracks foundation work only, so examples describe direction rather than a Composer package users can install.',
        points: [
          'There is no published package or supported PHP matrix yet.',
          'The issue backlog owns API and delivery decisions.',
          'The planned status remains visible alongside every call to action.',
        ],
      },
    ],
  },
};
