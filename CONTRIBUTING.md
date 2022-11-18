Human Made - Block Editor Components - Contribution Guide
=========================================================

* Create a feature branch from `main`.
* Work on your change locally.
* Open a pull request against [`humanmade/block-editor-components`](https://github.com/humanmade/block-editor-components)
* Pull requests should be reviewed and merged by an engineer at Human Made.

## Local development.

You can contribute to Block Editor Components whilst working on a project that is using it with [npm link](https://docs.npmjs.com/cli/v8/commands/npm-link).

Setting this up is a 2 part process. First, clone a copy of block editor components and link it locally.

```bash
# Clone this repo into a new directory (completely separate from any project.)
git clone git@github.com:humanmade/block-editor-components.git
# Change to the block editor components directory.
cd block-editor-components
# Install dependencies and build.
npm install && npm run build
# Link this package.
npm link
```

Next, from your project root directory, run:

```bash
npm link @humanmade/block-editor-components
```

Now, your project will use a version of `block-editor-components` that is symlinked from the repo you just cloned. You can check out a new feature branch, work on a change, test it within a real project,

When you're done, you can unlink the package by running the following:

```
npm unlink @humanmade/block-editor-components
```

### Automatically build after making changes.

Whilst developing, it is useful have webpack watch for changes and rebuild the distributed files automatically. To do this, run `npm run start`.
