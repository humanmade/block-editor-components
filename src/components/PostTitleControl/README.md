# PostTitleControl

The `PostTitleControl` component allows for editing the current post's title, anywhere in the block editor.
This can be for something like a Hero block that features the post title, or a block for managing title and metadata.

## Usage

For a minimum working setup, all you need to do is use the `PostTitleControl` component.

```js
import { PostTitleControl } from '@humanmade/block-editor-components';

function BlockEdit() {
	return (
		<PostTitleControl />
	);
}
```

Additionally, you can pass anything as props that the nested [`RichText`](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/rich-text/index.js) component accepts, except for `value` and `onChange`, which will be taken care of by `PostTitleControl`, as well as `allowedFormats`, which is hard-coded to not allow any formatting.

```js
import { PostTitleControl } from '@humanmade/block-editor-components';

function BlockEdit() {
	return (
		<PostTitleControl
			className="my-component__title"
			placeholder="Title..."
			tagName="h1"
		/>
	);
}
```

## Props

The `PostTitleControl` component does not have any custom props, but you can pass anything that is supported by the nested [`RichText`](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/rich-text/index.js) component.

## Dependencies

The `PostTitleControl` component requires the following dependencies, which are expected to be available:

- `@wordpress/block-editor`
- `@wordpress/data`
