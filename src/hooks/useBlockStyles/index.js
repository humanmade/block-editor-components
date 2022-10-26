import { useMemo } from 'react';

import { useSelect } from '@wordpress/data';

/**
 * Get the registered block styles, as well as the default style for the block with the given name.
 *
 * @param {string} blockName - Block name.
 * @returns {object} Block styles data.
 */
export default function useBlockStyles( blockName ) {
	const blockStyles = useSelect(
		( select ) => select( 'core/blocks' ).getBlockStyles( blockName ),
		[ blockName ]
	);

	return useMemo(
		() => ( {
			blockStyles,
			defaultStyle: blockStyles.find( ( { isDefault } ) => isDefault )?.name ?? '',
		} ),
		[ blockStyles ]
	);
}
