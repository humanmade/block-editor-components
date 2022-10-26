# useMeta

The `useMeta` hook allows for comfortably managing a single post meta field.

## Usage

For a minimum working setup, all you need to do is pass the meta key to `useMeta`, and then use the returned value and setter function.

```js
import { useMeta } from '@humanmade/block-editor-components';
import { PlainText } from '@wordpress/block-editor';

function BlockEdit() {
	const [ deck, setDeck ] = useMeta( 'deck' );

	return (
		<PlainText
			value={ deck }
			onChange={ setDeck }
		/>
	);
}
```

Optionally, you can also specify a default value to use.

```js
import { useMeta } from '@humanmade/block-editor-components';
import { PlainText } from '@wordpress/block-editor';

function BlockEdit() {
	const [ priority, setPriority ] = useMeta( 'priority', 'medium' );

	return (
		<PlainText
			value={ priority }
			onChange={ setPriority }
		/>
	);
}
```

Please note that the default value will only be used if no value is supplied (i.e., `undefined`).
Any other falsy value such as an empty string or Boolean `false` will be used as is.

## Signature

```js
// useMeta :: ( metaKey: string, defaultValue?: any ) => [ meta: any, setMeta: Function ]
const [ meta, setMeta ] = useMeta( metaKey, defaultValue );
```

## Parameters

### `metaKey`

The post meta key.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `string`                             | yes                                  | `undefined`                          |

### `defaultValue`

Optional default value to use.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `*`                                  | no                                   | `undefined`                          |

## Return

The `useMeta` hook returns an array with the current meta value as first element and a function to update the meta value as second element.
The setter function accepts the new meta value as only argument.

```js
const [ meta, setMeta ] = useMeta( metaKey );

setMeta( newValue );
```
