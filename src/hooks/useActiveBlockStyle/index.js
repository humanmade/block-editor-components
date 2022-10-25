import { useMemo } from 'react';

import { useBlockStyles } from '..';

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
 * Get the active block style for the block with the given name and the class name string.
 *
 * @param {string} blockName - Block name.
 * @param {string} [className] - Optional. Class name string.
 * @returns {string} Active block style.
 */
export default function useActiveBlockStyle( blockName, className ) {
	const {
		blockStyles,
		defaultStyle,
	} = useBlockStyles( blockName );

	const currentBlockStyles = useMemo(
		() => parseClassName( className ),
		[ className ]
	);

	return useMemo(
		() => currentBlockStyles.find( ( blockStyle ) => blockStyles.includes( blockStyle ) ) ?? defaultStyle,
		[ blockStyles, currentBlockStyles, defaultStyle ]
	);
}
