import { useCallback } from 'react';

import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Return the current meta value and a setter function.
 *
 * @param {string} metaKey - Meta key.
 * @param {*} [defaultValue] - Optional. Default value to use.
 * @returns {Array} Array containing the current meta value and a function to update it.
 */
export default function useMeta( metaKey, defaultValue ) {
	const { editPost } = useDispatch( 'core/editor' );

	const meta = useSelect(
		( select ) => select( 'core/editor' ).getEditedPostAttribute( 'meta' )
	);

	const setMeta = useCallback(
		( value ) => editPost( { meta: { [metaKey]: value } } ),
		[ editPost, metaKey ]
	);

	return [
		meta?.[ metaKey ] ?? defaultValue,
		setMeta,
	];
}
