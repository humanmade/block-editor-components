/**
 * Get relevant image data for the given image size.
 *
 * Normalizes the difference in data between upload and media library.
 *
 * @param {object} image - Image object.
 * @param {string} size - Image size.
 * @returns {object|null} Image data, or null.
 */
export function getImageDataForSize( image, size ) {
	const sizes = image?.sizes ?? image?.media_details?.sizes;

	const data = sizes?.[ size ];
	if ( ! data ) {
		return null;
	}

	return {
		src: data.url || data.source_url,
		width: data.width,
		height: data.height,
	};
}
