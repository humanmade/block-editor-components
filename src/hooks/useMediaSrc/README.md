# useMediaSrc

The `useMediaSrc` hook allows for the easy retrieval of source media URLs from an ID.

## Usage

The `useMediaSrc` hook takes an ID and returns a URL or undefined.

```js
import { useMediaSrc } from '@humanmade/block-editor-components';

function BlockEdit( { attributes, setAttributes } ) {
	const {
		videoId
	} = attributes;
	const videoUrl = useMediaSrc( videoId );

	return (
		<>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={ ( media ) =>
						setAttributes( { videoId: media.id } )
					}
					value={ videoId }
					render={ ( { open } ) => (
						<Button onClick={ open }>Open Media Library</Button>
					) }
				/>
			</MediaUploadCheck>
			<video src={ videoUrl } />
		<>
	);
}
```

## Return

The `useMediaSrc` hook returns either a URL string or undefined.

## Dependencies

The `useMediaSrc` hook requires the following dependencies, which are expected to be available:

- `@wordpress/data`
