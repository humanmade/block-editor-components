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

The *Current Selection* tab shows the selection in `values` order.

```jsx
<PostPickerButton
	postType={ [ 'post', 'page' ] }
	taxonomies={ [ 'category', 'post_tag' ] }
	onChange={ newValue => setAttributes( { postIds: newValue } ) }
	values={ attributes.postIds || [] }
/>
```

#### `deferChanges`

Hold the selection in a draft inside the modal and fire `onChange` once, when
the editor confirms, rather than on every tick.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `Boolean`                            | no                                   | `false`

**Prefer `true` for new code.** With it off — the default, kept so that existing
consumers are unaffected — every tick is committed immediately, which means the
modal's ✕ reads as *Cancel* but behaves as *Close*: there is nothing left to
discard. It also makes swapping one post for another at a low `maxItems`
awkward, because the new post cannot be ticked until the old one is unticked.

With it on, the modal gains a footer with *Confirm selection* and *Cancel*.
Ticking, unticking and reordering all edit a local draft; `onChange` fires once,
on confirm, with the final array. *Cancel*, the ✕ and the Escape key all take
the same route out, and prompt for confirmation first if the draft differs from
`values`.

Leave it off if the consumer renders a live preview from `onChange` and relies
on seeing each change as it is made.

```jsx
<PostPickerButton
	deferChanges
	maxItems={ 4 }
	onChange={ newValue => setAttributes( { postIds: newValue } ) }
	values={ attributes.postIds || [] }
/>
```

#### `maxItems`

The maximum number of posts that can be selected. Omit it for no limit.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `Number`                             | no                                   | `null`

Unticked checkboxes are never disabled at the limit: that gives no route to a
replacement, and leaves the editor guessing why a row is inert.

* **`maxItems={ 1 }`** — picking a post replaces the current one. Replacement is
  the obvious intent of a single-slot picker, so refusing the tick would only be
  an extra step. This applies in both modes.
* **`maxItems` above 1, with `deferChanges`** — the draft may exceed the limit,
  but *Confirm selection* is blocked while it does, with a notice naming the
  limit and the current count. This is what makes the natural motion work: pick
  the replacement first, then prune the old entry from *Current Selection*.
* **`maxItems` above 1, without `deferChanges`** — there is no draft to park an
  over-limit selection in and no confirm step to block, so the only enforcement
  available is to refuse the add. The tick does nothing. This is the main reason
  to pair `maxItems` with `deferChanges`.

A count — `3 of 4 selected` — is shown below the tabs whenever `maxItems` is
set, so the limit is visible before it is reached rather than only when it bites.

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
