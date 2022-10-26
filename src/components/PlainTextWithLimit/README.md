# PlainTextWithLimit

The `PlainTextWithLimit` component is a special version of [`PlainText`](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/plain-text/index.js) that allows for specifying a character limit.
If the limit is reached, further input gets rejected.

## Usage

For a minimum working setup, all you need to do is specify a character limit for the `PlainTextWithLimit` component, and supply any props you would normally do for `PlainText`.

```js
import { PlainTextWithLimit } from '@humanmade/block-editor-components';

function BlockEdit( props ) {
	const { attributes, setAttributes } = props;
	const { deck } = attributes;

	return (
		<PlainTextWithLimit
			limit={ 120 }
			value={ deck }
			onChange={ ( deck ) => setAttributes( { deck } ) }
		/>
	);
}
```

Additionally, you can pass anything as props that the nested [`PlainText`](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/plain-text/index.js) component accepts.

```js
import { PlainTextWithLimit } from '@humanmade/block-editor-components';

function BlockEdit( props ) {
	const { attributes, setAttributes } = props;
	const { deck } = attributes;

	return (
		<PlainTextWithLimit
			className="deck"
			limit={ 120 }
			value={ deck }
			onChange={ ( deck ) => setAttributes( { deck } ) }
		/>
	);
}
```

## Styles

Please note that the `PlainTextWithLimit` component does not come with styles for valid or invalid state.
Instead, the nested `PlainText` component is being passed the custom `limit-text` class.
Additionally, if in an invalid state (i.e., the user tried to enter text beyond the specified limit), the component also has the `invalid` class.

If you wanted to visually indicate the user reaching the specified limit, you could do this like so:

```css
.limit-text.invalid {
	outline: 1px solid red;
}
```

Please note that this would also target any invalid [`RichTextWithLimit`](../RichTextWithLimit/README.md) components.
If you only want to target plain text inputs, use `.block-editor-plain-text.limit-text.invalid` instead.

## Props

The `PlainTextWithLimit` component does not have any custom props other than `limit`, but you can pass anything that is supported by the nested [`PlainText`](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/plain-text/index.js) component.

### `limit`

The maximum number of characters allowed.
Passing `0` will disable the character restriction, which only really makes sense on a dynamic basis.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `number`                             | yes                                  | `0`                                  |
