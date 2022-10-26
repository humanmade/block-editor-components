# useRenderAppenderWithBlockLimit

The `useRenderAppenderWithBlockLimit` hook allows for conditionally displaying a (custom) render appender component for inner blocks.
If the block already has the defined maximum number of inner blocks, no appender is displayed.
If there are fewer blocks than the defined limit, the (default or custom) appender component is displayed.

## Usage

For a minimum working setup, all you need to do is pass the block client ID and the desired maximum number of blocks, and then use the returned render appender component, if any.

```js
import { useRenderAppenderWithBlockLimit } from '@humanmade/block-editor-components';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

function BlockEdit( props ) {
	const { clientId } = props;

	// Allow up to four inner blocks.
	const renderAppender = useRenderAppenderWithBlockLimit( clientId, 4 );

	const blockProps = useBlockProps();

	const innerBlocksProps = useInnerBlocksProps(
		blockProps,
		{
			renderAppender,
		}
	);

	return (
		<div { ...innerBlocksProps } />
	);
}
```

Optionally, you can also specify a custom render appender component to use.

```js
import { useRenderAppenderWithBlockLimit } from '@humanmade/block-editor-components';
import { InnerBlocks, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

function BlockEdit( props ) {
	const { clientId } = props;

	// Allow up to four inner blocks.
	const renderAppender = useRenderAppenderWithBlockLimit( clientId, 4, InnerBlocks.ButtonBlockAppender );

	const blockProps = useBlockProps();

	const innerBlocksProps = useInnerBlocksProps(
		blockProps,
		{
			renderAppender,
		}
	);

	return (
		<div { ...innerBlocksProps } />
	);
}
```

## Signature

```js
// useRenderAppenderWithBlockLimit :: ( clientId: string, blockLimit: number, appender?: ReactNode ) => ?ReactNode|false
const renderAppender = useRenderAppenderWithBlockLimit( clientId, blockLimit, appender );
```

## Parameters

### `clientId`

The block client ID.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `string`                             | yes                                  | `undefined`                          |

### `blockLimit`

The maximum number of inner blocks.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `number`                             | yes                                  | `undefined`                          |

### `appender`

Optional custom appender component to use; by default, the [`DefaultBlockAppender`](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/default-block-appender/index.js) component will display.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `ReactNode`                          | no                                   | `undefined`                          |

## Return

The `useRenderAppenderWithBlockLimit` hook returns a render appender component to use for inner blocks.
If the maximum number of blocks is reached, the hook will return `false`, preventing a render appender from displaying.

```js
const renderAppender = useRenderAppenderWithBlockLimit( clientId, blockLimit );
```
