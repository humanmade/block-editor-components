import { useMemo } from 'react';

import { useSelect } from '@wordpress/data';

import { useBlockStyles } from '../..';

const pattern = /^is-style-/;

/**
 * Parse the given class name string into a list of valid block styles.
 *
 * @param {string} className - Class name string.
 * @returns {string[]} List of block styles.
 */
function parseClassName( className = '' ) {
	return className
		.trim()
		.replace( /\s+/, ' ' )
		.split( ' ' )
		.map( ( className ) => pattern.test( className ) ? className.replace( pattern, '' ) : '' )
		.filter( Boolean );
}

/**
 * Get the active block style for the block with the given client ID.
 *
 * @param {string} clientId - Block client ID.
 * @returns {string} Active block style.
 */
export default function useActiveBlockStyle( clientId ) {
	const { blockName, className } = useSelect(
		( select ) => {
			const block = select( 'core/editor' ).getBlock( clientId );

			return {
				blockName: block?.name ?? '',
				className: block?.attributes?.className ?? '',
			};
		},
		[ clientId ]
	);

	const {
		blockStyles,
		defaultStyle,
	} = useBlockStyles( blockName );

	const blockStyleNames = useMemo(
		() => blockStyles.map( ( { name } ) => name ),
		[ blockStyles ]
	);

	const currentBlockStyles = useMemo(
		() => parseClassName( className ),
		[ className ]
	);

	return useMemo(
		() => currentBlockStyles.find( ( blockStyle ) => blockStyleNames.includes( blockStyle ) ) ?? defaultStyle,
		[ blockStyleNames, currentBlockStyles, defaultStyle ]
	);
}
