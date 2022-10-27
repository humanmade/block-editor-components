import { useCallback } from 'react';

import { useDispatch } from '@wordpress/data';

/**
 * Return a callback to select and scroll to the block with the given client ID.
 *
 * @returns {Function} Callback for selecting the block with the given client ID.
 */
export default function useSelectBlock() {
	const { selectBlock } = useDispatch( 'core/block-editor' );

	return useCallback(
		( clientId ) => {
			const element = document.getElementById( `block-${ clientId }` );
			if ( ! element ) {
				return;
			}

			selectBlock( clientId );

			setTimeout( () => element.scrollIntoView( {
				behavior: 'smooth',
			} ), 200 );
		},
		[ selectBlock ]
	);
}
