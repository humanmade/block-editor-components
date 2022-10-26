# PostTypeCheck

The `PostTypeCheck` component allows for conditionally displaying content for a specified post type only.
If the current post type does not match the one specified, nothing is displayed.
It is also possible to provide fallback content to display if the post type does not match.

## Usage

For a minimum working setup, all you need to do is wrap some content in `PostTypeCheck`, and specify a post type slug.

```js
import { PostTypeCheck } from '@humanmade/block-editor-components';

function BlockEdit() {
	return (
		<PostTypeCheck postType="page">
			<p>This is a page!</p>
		</PostTypeCheck>
	);
}
```

Optionally, you can also specify fallback content to display, in case the current post type does not match the one specified.

```js
import { PostTypeCheck } from '@humanmade/block-editor-components';
import XYZ from 'xyz';

function BlockEdit() {
	return (
		<PostTypeCheck
			fallback={ <p>Sorry, XYZ is only supported on pages.</p> }
			postType="page"
		>
			<XYZ />
		</PostTypeCheck>
	);
}
```

## Props

### `children`

The content to conditionally display for the specified post type.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `ReactNode`                          | yes                                  | `undefined`                          |

### `fallback`

Optional content to display in case the current post type does not match the one specified.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `ReactNode`                          | no                                   | `null`                               |

### `postType`

The post type slug that the wrapped content should be displayed for.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `string`                             | yes                                  | `undefined`                          |
