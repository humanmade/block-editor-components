# Block Editor Components

> Reusable components, hooks and helper functions for the WordPress block editor(s).

---

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Components](#components)
- [Hooks](#hooks)
- [Utils](#utils)
- [Contributing](#contributing)
- [Release Process](#release-process)

---

## Introduction

The Block Editor Components package provides reusable components, hooks and helper functions to use with the WordPress block editor(s).
This is **not** a WordPress plugin or other production-use library.
Instead, the package is intended to be used as development-time dependency, contributing to your plugin or project codebase build.

## Installation

The recommended way to use the Block Editor Components package is to install as a development-only Node dependency.

Using npm:

```shell
npm install --save-dev @humanmade/block-editor-components
```

Of course, you can also use Yarn, pnpm or any other package manager.

**Note:** As the Block Editor Components package provides a variety of components, hooks and utils that you usually don't all need for a given project, the package does **not** declare any `@wordpress/*` dependencies.
This means that you need to ensure all dependency assets are declared and loaded.

You can read about an individual component's dependencies in the relevant README file.
One way to ensure all dependencies are loaded is to use the [`@wordpress/dependency-extraction-webpack-plugin`](https://github.com/WordPress/gutenberg/tree/trunk/packages/dependency-extraction-webpack-plugin) package.

## Components

- [`ConditionalComponent`](src/components/ConditionalComponent)
- [`FetchAllTermSelectControl`](src/components/FetchAllTermSelectControl)
- [`FileControls`](src/components/FileControls)
- [`ImageControl`](src/components/ImageControl)
- [`LinkToolbar`](src/components/LinkToolbar)
- [`PlainTextWithLimit`](src/components/PlainTextWithLimit)
- [`PostTitleControl`](src/components/PostTitleControl)
- [`PostTypeCheck`](src/components/PostTypeCheck)
- [`RichTextWithLimit`](src/components/RichTextWithLimit)

## Hooks

- [`useActiveBlockStyle`](src/hooks/useActiveBlockStyle)
- [`useBlockStyles`](src/hooks/useBlockStyles)
- [`useDisallowedBlocks`](src/hooks/useDisallowedBlocks)
- [`useMeta`](src/hooks/useMeta)
- [`useRenderAppenderWithBlockLimit`](src/hooks/useRenderAppenderWithBlockLimit)
- [`useSelectBlock`](src/hooks/useSelectBlock)
- [`useSetAttribute`](src/hooks/useSetAttribute)

## Utils

- [Block Utils](src/utils/blocks)
- [Image Utils](src/utils/images)
- [Option Utils](src/utils/options)
- [Variation Utils](src/utils/variations)

## Contributing

This project relies on contributions from those using it!
See the [contribution guidelines](CONTRIBUTING.md) for more information.

## Release Process

The default branch, `main` contains sources only.
Releases are published from a dedicated branch, `release`, which also includes the built assets.

Releasing a new version is done via the `release` script, which must be executed from the default branch:

```shell
npm run release
```

Internally, this is using [`np`](https://github.com/sindresorhus/np), and performs the following individual steps:

- Check Git context, both local and remote.
- Install dependencies to ensure the package works with the latest dependency tree.
- Run tests.
- Bump version using npm.
- Check out the `release` branch, and merge the latest changes.
- Build the assets, and commit.
- Publish the new version to npm.
- Create and push the new tag.
- Open a draft Release on GitHub.
- Push the `main` branch.
