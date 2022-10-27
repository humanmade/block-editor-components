import { useMemo } from 'react';

import { getBlockTypes } from '@wordpress/blocks';

/**
 * Get the list of allowed inner blocks, given a list of blocks to disallow.
 *
 * @param {string[]} disallowedBlocks - Array of disallowed block names.
 * @returns {string[]} Array of allowed block names.
 */
export default function useDisallowedBlocks( disallowedBlocks ) {
	return useMemo(
		() => {
			const registeredBlocks = getBlockTypes();
			if ( ! registeredBlocks?.length ){
				return [];
			}

			// Filter out blocks that are only meant to be used as child blocks, otherwise these will show.
			return registeredBlocks.filter( ( { name, parent } ) => (
				! parent && ! disallowedBlocks.includes( name )
			) ).map( ( { name } ) => name );
		},
		[ disallowedBlocks ]
	);
}
