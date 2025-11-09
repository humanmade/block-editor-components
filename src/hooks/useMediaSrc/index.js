import { useSelect } from "@wordpress/data";

/**
 * Returns the original source URL of media if available, or undefined, given an ID.
 *
 * @param {number} id attachment ID.
 * @returns {string|undefined} Media source URL or undefined.
 */
export default function useMediaSrc( id ) {
	const url = useSelect(
		( select ) => {
			const media = select( 'core' ).getMedia( id, { context: 'view' } );
			if ( ! media ) {
				return undefined;
			}
			return media.source_url;
		},
		[ id ]
	);
	return url;
}
