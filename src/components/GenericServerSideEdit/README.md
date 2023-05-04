# GenericServerSideEdit

The `GenericServerSideEdit` component is a generic block edit component that uses server side rendering to display content.

## Usage

For a minimum working setup, all you need to do is import the `GenericServerSideEdit` component and assign it as the `edit` parameter when registering a block:

```js
import { registerBlockType } from '@wordpress/blocks';

import blockMetadata from './block.json';
import GenericServerSideEdit from '@humanmade/block-editor-components';

registerBlockType( blockMetadata, {
	edit: GenericServerSideEdit,
} );

```

Optionally, you can use it inside an edit component with inspector controls:

```js
import { Panel, PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import GenericServerSideEdit from '@humanmade/block-editor-components';

/**
 * Render the editor interface.
 *
 * @returns {import('react').ReactNode} Rendered editorial UI.
 */
export default function Edit( { attributes, context, setAttributes } ) {
	return <GenericServerSideEdit
		name="my/blockname"
		attributes={ attributes }
		context={ context }
		inspectorControls={
			<InspectorControls>
				<Panel>
					<PanelBody
						title={ __( 'Panel Title', 'mytextdomain' ) }
					>
						<p>{ __( 'Panel Content', 'mytextdomain' ) }</p>
					</PanelBody>
				</Panel>
			</InspectorControls>
		}
	/>;
}
```

## Props

These props with the exception of `inspectorControls` are the same props provided to edit components.

### `name`

The name of the block being rendered.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `string`                             | yes                                  | `undefined`                          |

### `attributes`

The block attributes to use

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `object`                             | yes                                  | `null`                               |

### `context`

Necessary for context aware blocks, currently supports the `post_id` context if available.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `object`                             | no                                   | `null`                               |


### `inspectorControls`

Optional inspector controls component for adding toolbar items, and sidebar inspector controls.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `ReactNode`                          | no                                   | `null`                               |
