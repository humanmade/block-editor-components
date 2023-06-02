# PostPicker

The `PostPicker` controls allows a user to select one or more posts from a given post type, which can be filtered by a taxonomy.

Note there are several components exposed under PostPicker.

* `PostPickerButton` A simple button.
* `PostPickerToolbarButton` A button for use within `BlockControls` toolbar.
* `PostPickerModal` The actual modal interface, that can be integrated into your own UI.

## `PostPickerButton`

```
import PostPicker from '@humanmade/block-editor-components';

...

<PostPicker
	taxonomies={ [ 'category', 'post_tag' ] }
	onChange={ newValue => setAttributes( { postIds: newValue } ) }
	values={ attributes.postIds || [] }
/>
```

### Props

The `LinkToolbar` component does not have any custom props other than `opensInNewTab`, `value` and `onChange`, which are all passed on as is to the nested [`LinkControl`](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/link-control/index.js) component.

#### `values`

The saved values. Array of post IDs.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `Array`                              | yes                                  | `undefined`                          |


#### `onChange`

The callback to use for handling changing the selected posts. `onChange` will receive an array of post IDs.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `Function`                           | yes                                  | `undefined`                          |

#### `title`

The title, used by button and modal title.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `String`                             | no                                   | `Select Posts`

#### `postType`

Post type to select from.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `String`                             | no                                   | `post`

#### `taxonomies`

Taxonomies that results can be filtered by. Array of taxonomy slugs. e.g. `[ 'category', 'post_tag' ]`.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `Array`                              | no                                   | `[]`


## Post Picker Toolbar Button

There is also a `PostPickerToolbarButton` component available if you import it directly from the source file, which is intended for use within the BlockControls. It supports all the same props as the PostPicker component, with the addition of an `icon`.

## props

#### `icon`

Button icon. Passed through to `ToolbarButton`, refer to the documentation of that component for more info.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `string`                              | no                                   | `edit`
