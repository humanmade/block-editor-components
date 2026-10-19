# PostPicker

There are several `PostPicker` controls.

* `PostPickerButton` A simple button.
* `PostPickerToolbarButton` A button for use within `BlockControls` toolbar.
* `PostPickerModal` The actual modal interface, that can be integrated into your own UI.

## `PostPickerButton`

```jsx
import { PostPickerButton } from '@humanmade/block-editor-components';

...

<PostPickerButton
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

Post type(s) to select from. Either a single post type slug, or an array of slugs.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `String\|Array`                      | no                                   | `post`

When passed an array of more than one post type, the *Browse Posts* tab gains a
post type selector at the top of the filter sidebar. It is deliberately single
choice: a REST collection request cannot span post types, so the browse list
queries one type at a time and the results are never merged. The first type in
the array is selected by default.

The taxonomy filters follow the selected post type — only taxonomies registered
for that type are offered, and a filter that no longer applies is cleared rather
than left active but hidden. Changing the post type, the search term or a
taxonomy filter resets the browse list to page one.

Below 782px — WordPress's own admin breakpoint — the browse panel stacks, with
the filters above the list rather than beside it. Two columns are unusable at
phone widths.

The *Current Selection* tab does fetch every post type, because `values` can
span types and an exact `include` query has no pagination ambiguity. The
selection is shown in `values` order.

```jsx
<PostPickerButton
	postType={ [ 'post', 'page' ] }
	taxonomies={ [ 'category', 'post_tag' ] }
	onChange={ newValue => setAttributes( { postIds: newValue } ) }
	values={ attributes.postIds || [] }
/>
```

#### `taxonomies`

Taxonomies that results can be filtered by. Array of taxonomy slugs. e.g. `[ 'category', 'post_tag' ]`.

Only those registered for the post type currently being browsed are shown.

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
