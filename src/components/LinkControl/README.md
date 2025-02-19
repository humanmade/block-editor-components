# LinkControl

The `LinkControl` component allows for adding a link. It is intended for use within the block settings UI that appears in the sidebar.

The link control is just a wrapper for the core URL input component. The only difference is the visual appearance and API is more aligned with other sidebar controls such as the TextControl.

## Usage

```js
const { InspectorControls } = wp.blocks;
const { LinkControl } = hm.controls;
const { attributes, setAttributes } = props;

<InspectorControls>
    <LinkControl
        label="Link"
        help="Some description text"
        value={ attributes.link }
        onChange={ link => setAttributes( { link } ) }
    />
</InspectorControls>
```
