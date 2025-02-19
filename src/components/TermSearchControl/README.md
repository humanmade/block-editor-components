# TermSearchControl

The `TermSearchControl` component allows for live searching the terms in a taxonomy. It is ideal for use with taxonomies with a high number of terms, where returning all of them in a single query is not possible. It wraps a [`FormTokenField`](https://github.com/WordPress/gutenberg/tree/trunk/packages/components/src/form-token-field) component, and is based off of the taxonomy controls in the [Query Loop block](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/query/edit/inspector-controls/taxonomy-controls.js).

## Usage

To use this component, you need to pass a `taxonomy` slug and an array of term IDs as `termIds` to `TermSearchControl`, as well as an `onChange` callback that accepts an array of term IDs.

```js
import { TermSearchControl } from '@humanmade/block-editor-components';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

/**
 * Block edit view.
 *
 * @param {object} props - Component props.
 * @returns {ReactNode} Component.
 */
const Edit = ( props ) => {
	const { attributes, setAttributes } = props;
	const { tags } = attributes;

	return (
		<InspectorControls>
			<PanelBody>
				<TermSearchControl
					taxonomy="post_tag"
					termIds={ tags }
					onChange={ ( tags ) =>
						setAttributes( { tags } )
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
```

Additionally, you can pass a `label` to override the default label. The default label displays in the format 'Filter by {taxonomy name}>'.

```js
<TermSearchControl
	label="Override label text"
	taxonomy="post_tag"
	termIds={ tags }
	onChange={ ( tags ) =>
		setAttributes( { tags } )
	}
/>
```

## Dependencies

The `TermSearchControl` component requires the following dependencies, which are expected to be available:

- `@wordpress/components`
- `@wordpress/compose`
- `@wordpress/core-data`
- `@wordpress/data`
- `@wordpress/element`
- `@wordpress/html-entities`
- `@wordpress/i18n`
