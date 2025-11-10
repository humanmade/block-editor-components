# VideoControl

The `VideoControl` component allows for selecting a single video from the Media Library in a sidebar panel.
Internally, `VideoControl` is wrapping a [`MediaUpload`](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-editor/src/components/media-upload/index.js) inside a [`BaseControl`](https://github.com/WordPress/gutenberg/blob/trunk/packages/components/src/base-control/index.tsx) component.

| ![image-control--default.png](../../../assets/images/image-control--default.png) |
|------------------------------------------------------------------------------------|
| _`VideoControl` component._                                                        |

| ![image-control--selected.png](../../../assets/images/image-control--selected.png) |
|------------------------------------------------------------------------------------|
| _`VideoControl` component displaying the selected video._                          |

## Usage

For a minimum working setup, all you need to do is pass an video ID as `value`, as well as an `onChange` callback that accepts a video object.

```js
import { VideoControl } from '@humanmade/block-editor-components';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

function BlockEdit( props ) {
	const { attributes, setAttributes } = props;
	const { videoId } = attributes;

	return (
		<InspectorControls>
			<PanelBody>
				<VideoControl
					value={ videoId }
					onChange={ ( video ) => setAttributes( { videoId: video?.id } ) }
				/>
			</PanelBody>
		</InspectorControls>
	);
}
```

You can also customize button texts, as well as the modal title.

```js
import { VideoControl } from '@humanmade/block-editor-components';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

function BlockEdit( props ) {
	const { attributes, setAttributes } = props;
	const { videoId } = attributes;

	return (
		<InspectorControls>
			<PanelBody>
				<VideoControl
					buttonText="Select Video"
					modalTitle="Select Video"
					removeButtonText="Remove Video"
					replaceButtonText="Replace Video"
					value={ videoId }
					onChange={ ( video ) => setAttributes( { videoId: video?.id } ) }
				/>
			</PanelBody>
		</InspectorControls>
	);
}
```

Also, all stable props of `BaseControl` are supported.

## Props

The `VideoControl` component has custom props `value` and `onChange` for managing the image, as well as `buttonText`, `modalTitle`, `removeButtonText` and `replaceButtonText`.
Also, it supports all stable props of the `BaseControl` component.

### `buttonText`

The button text to display if no image has been selected.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `string`                             | no                                   | `'Select image'`                     |

### `modalTitle`

The modal title.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `string`                             | no                                   | `'Select Video'`                     |

### `onChange`

The callback to use for handling changing the video.
Please note that `onChange` will receive a video object from the Media Library.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `Function`                           | yes                                  | `undefined`                          |

### `removeButtonText`

The text to display for the remove button.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `string`                             | no                                   | `'Remove Video'`                     |

### `replaceButtonText`

The button text to display if an video has been selected.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `string`                             | no                                   | `'Replace Video`                     |

### `size`

The video size to display in the sidebar.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `string`                             | no                                   | `undefined`                          |

### `value`

A video ID.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `number`                             | yes                                  | `undefined`                          |

## Dependencies

The `VideoControl` component requires the following dependencies, which are expected to be available:

- `@wordpress/block-editor`
- `@wordpress/components`
- `@wordpress/data`
- `@wordpress/i18n`
