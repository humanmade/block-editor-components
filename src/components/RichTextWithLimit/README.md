# RichTextWithLimit

The `RichTextWithLimit` component is a special version of [`RichText`](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/rich-text/index.js) that allows for specifying a character limit.
If the limit is reached, further input gets rejected.

## Usage

For a minimum working setup, all you need to do is specify a character limit for the `RichTextWithLimit` component, and supply any props you would normally do for `RichText`.

```js
import { RichTextWithLimit } from '@humanmade/block-editor-components';

function BlockEdit( props ) {
	const { attributes, setAttributes } = props;
	const { deck } = attributes;

	return (
		<RichTextWithLimit
			limit={ 120 }
			value={ deck }
			onChange={ ( deck ) => setAttributes( { deck } ) }
		/>
	);
}
```

Additionally, you can pass anything as props that the nested [`RichText`](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/rich-text/index.js) component accepts.

```js
import { RichTextWithLimit } from '@humanmade/block-editor-components';

function BlockEdit( props ) {
	const { attributes, setAttributes } = props;
	const { deck } = attributes;

	return (
		<RichTextWithLimit
			allowedFormats={ [] }
			className="deck"
			limit={ 120 }
			placeholder="Enter deck..."
			value={ deck }
			onChange={ ( deck ) => setAttributes( { deck } ) }
		/>
	);
}
```

## Styles

Please note that the `RichTextWithLimit` component does not come with styles for valid or invalid state.
Instead, the nested `RichText` component is being passed the custom `limit-text` class.
Additionally, if in an invalid state (i.e., the user tried to enter text beyond the specified limit), the component also has the `invalid` class.

If you wanted to visually indicate the user reaching the specified limit, you could do this like so:

```css
.limit-text.invalid {
	outline: 1px solid red;
}
```

Please note that this would also target any invalid [`PlainTextWithLimit`](../PlainTextWithLimit/README.md) components.
If you only want to target rich text inputs, use `.rich-text.limit-text.invalid` instead.

## Props

The `RichTextWithLimit` component does not have any custom props other than `limit`, but you can pass anything that is supported by the nested [`RichText`](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/rich-text/index.js) component.

### `limit`

The maximum number of characters allowed.
Passing `0` will disable the character restriction, which only really makes sense on a dynamic basis.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `number`                             | yes                                  | `0`                                  |

## Dependencies

The `RichTextWithLimit` component requires the following dependencies, which are expected to be available:

- `@wordpress/block-editor`
- `@wordpress/dom`
