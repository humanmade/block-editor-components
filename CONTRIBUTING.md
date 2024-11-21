Block Editor Components - Contribution Guide
===

## Process

* Create a feature branch from `main`.
* Work on your branch locally.
* Open a pull request against [`humanmade/block-editor-components`](https://github.com/humanmade/block-editor-components).
* Pull requests should be reviewed and merged by an engineer at Human Made.

## Local Development

**NOTE: This workflow doesn't seem to actually be working**

You can contribute to Block Editor Components whilst working on a project that is using it with [npm link](https://docs.npmjs.com/cli/v8/commands/npm-link).

Setting this up is a two-part process.
First, clone the block editor components repository and link it locally.

```shell
# Clone this repo into a new directory (completely separate from any project).
git clone git@github.com:humanmade/block-editor-components.git

# Change to the block editor components directory.
cd block-editor-components

# Install dependencies and build.
npm ci && npm run build

# Link this package.
npm link
```

Next, from your project root directory, run:

```shell
npm link @humanmade/block-editor-components
```

Now, your project will use a version of `block-editor-components` that is symlinked from the repo you just cloned.
You can check out a new feature branch, work on a change, and test it within a real project.

When you're done, you can unlink the package by running the following:

```shell
npm unlink @humanmade/block-editor-components
```

**Note on usage with `@humanmade/webpack-helpers`:** You may hit errors trying to build your assets when linked to a local copy of this. 

For ESLint errors you can work around by restricting eslint to the current project directory when configuring your webpack build. Do this by filtering the loader options. 

```
const path = require( 'node:path' );

presets.production( {
    // ...
}, {
    filterLoaders: ( loader, loaderType ) => {
        // Handle symlinked node_modules.
        if ( loaderType === 'eslint' ) {
            loader.include = path.dirname( path.resolve( __dirname ) );
        }

        return loader;
    }
} );
```

### Automatic Build

Whilst developing, it is useful have Webpack watch for changes and rebuild the distributed files automatically.
To do this, run:

```shell
npm run start
```

### Releasing a new version

Note: You will need to have publishing access to the package on npmjs.com in order to release a new version..

To release a new **production** version:

* Check out main branch and ensure no local changes: `git checkout main && git fetch && git reset origin/main --hard`
* Bump version: `npm version major|minor|patch` (select the appropriate version type). This updates the version in the package.json, runs build script, commits changes and creates a tag from the commit.
* Push changes: `git push --follow-tags`
* Publish to NPM: `npm publish`

Release a **beta** version:

* Check out main branch and ensure no local changes: `git checkout main && git fetch && git reset origin/main --hard`
* Run `npm version premajor|preminor|prepatch --preid beta` (select appropriate version type).
* Push changes: `git push --follow-tags`
* Publish to NPM: `npm publish --tag beta`
