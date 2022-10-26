# useSetAttribute

The `useSetAttribute` hook allows for comfortably setting a single block attribute.
This is especially useful if there are several places in which the user can edit a block attribute value.

## Usage

For a minimum working setup, all you need to do is pass the attribute name and the block-specific `setAttributes` function to `useSetAttribute`, and then use the returned setter function.

```js
import { useSetAttribute } from '@humanmade/block-editor-components';

function BlockEdit( props ) {
	const { attributes, setAttributes } = props;
	const { deck } = attributes;

	const setDeck = useSetAttribute( 'deck', setAttributes );

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
import { useSetAttribute } from '@humanmade/block-editor-components';

function BlockEdit() {
	const { attributes, setAttributes } = props;
	const { priority } = attributes;

	const setPriority = useSetAttribute( 'priority', setAttributes, 'medium' );

	return (
		<Priority
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
// useSetAttribute :: ( attributeName: string, setAttributes: Function, defaultValue?: any ) => Function
const setAttribute = useSetAttribute( attributeName, setAttributes, defaultValue );
```

## Parameters

### `attributeName`

The block attribute name.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `string`                             | yes                                  | `undefined`                          |

### `setAttributes`

The block-specific `setAttributes` function, usually taken from `props`.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `Function`                           | yes                                  | `undefined`                          |

### `defaultValue`

Optional default value to use.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `*`                                  | no                                   | `undefined`                          |

## Return

The `useSetAttribute` hook returns a setter function that accepts the new attribute value as only argument.

```js
const setAttribute = useSetAttribute( attributeName, setAttributes );

setAttribute( newValue );
```
