import {
	useDispatch,
	useSelect,
} from '@wordpress/data';
import { useCallback } from '@wordpress/element';

/**
 * @typedef {object} postThumbnailUtils
 * @property {?object} postThumbnail The post thumbnail object
 * @property {?number} postThumbnailId The post thumbnail ID
 * @property {Function} setPostThumbnail Function to set the post thumbnail
 */

/**
 * Get the post thumbnail and a function to set it.
 *
 * @returns {postThumbnailUtils} The post thumbnail data and setter function
 */
export default function usePostThumbnail() {

	const { editPost } = useDispatch( 'core/editor' );

	const postThumbnailId = useSelect(
		( select ) => select( 'core/editor' ).getEditedPostAttribute( 'featured_media' )
	);

	const postThumbnail = useSelect(
		( select ) => {
			if ( ! postThumbnailId ) {
				return null;
			}
			return select( 'core' ).getMedia( postThumbnailId );
		},
		[ postThumbnailId ]
	);

	const setPostThumbnail = useCallback(
		( mediaId ) => {
		// If the image has been removed, we can remove the post thumbnail.
			editPost( { featured_media: mediaId } );
		},
		[ editPost ]
	);

	return {
		postThumbnail,
		postThumbnailId,
		setPostThumbnail,
	};
}
