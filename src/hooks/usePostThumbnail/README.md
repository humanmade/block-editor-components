# usePostThumbnail

The `usePostThumbnail` hook allows for easy use and updates of the post thumbnail from within a

## Usage

The `usePostThumbnail` hook provides 2 values, and a setter function

```js
import { usePostThumbnail } from '@humanmade/block-editor-components';

function BlockEdit() {
	const { postThumbnail, postThumbnailId, setPostThumbnail } = usePostThumbnail();

	return (
		<>
		<MediaUploadCheck>
			<MediaUpload
				onSelect={ ( media ) =>
					setPostThumbnail( media.id )
				}
				allowedTypes={ ALLOWED_MEDIA_TYPES }
				value={ postThumbnailId }
				render={ ( { open } ) => (
					<Button onClick={ open }>Open Media Library</Button>
				) }
			/>
		</MediaUploadCheck>
		<img alt={ postThumbnail?.alt_text } src={ postThumbnail?.source_url } />
		<>
	);
}
```

## Return

The `usePostThumbnail` hook returns an object with 3 properties:

- `postThumbnail` - The full media object for the post thumbnail (as returned from `select( 'core' ).getMedia()`)
- `postThumbnailId` - The ID of the thumbnail as an integer
- `setPostThumbnail` - A function to set the current post's thumbnail by ID


## Dependencies

The `usePostThumbnail` hook requires the following dependencies, which are expected to be available:

- `@wordpress/data`
- `@wordpress/element`
