import { useSelect } from '@wordpress/data';

/**
 * Return an image url for a given image ID.
 *
 * @param {number} imageId - the image ID
 * @param {?string} imageSize - the thumbail size. Defaults to 'thumbnail'.
 * @returns {?string} - the image URL, if found.
 */
export default function useUrlFromImageId( imageId, imageSize = 'thumbnail' ) {
	return useSelect( select => {
		const media = select( 'core' ).getMedia( imageId );

		return media?.media_details?.sizes?.[ imageSize ]?.source_url ?? media?.source_url;
	}, [ imageId, imageSize ] );
}
