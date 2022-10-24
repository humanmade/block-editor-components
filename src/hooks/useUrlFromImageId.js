import { useSelect } from '@wordpress/data';

/**
 * Get the image URL for a given ID and size.
 *
 * @param {number} imageId - Image ID.
 * @param {string} [imageSize='thumbnail'] - Optional. Image size slug. Defaults to 'thumbnail'.
 * @returns {string} Image URL, if found.
 */
export default function useUrlFromImageId( imageId, imageSize = 'thumbnail' ) {
	return useSelect(
		( select ) => {
			const media = select( 'core' ).getMedia( imageId );

			return media?.media_details?.sizes?.[ imageSize ]?.source_url ?? media?.source_url ?? '';
		},
		[ imageId, imageSize ]
	);
}
