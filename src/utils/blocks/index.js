import { select } from '@wordpress/data';

/**
 * For the given block name, return the first block found in the current post content.
 *
 * @param {string} blockName - Block name.
 * @returns {?object} Block, if found.
 */
export function findBlockByName( blockName ) {
	const { getBlocks } = select( 'core/block-editor' );

	return getBlocks().find( ( { name } ) => name === blockName );
}

/**
 * From the given blocks, return the first one that does not satisfy the given validation callback.
 *
 * @param {object[]} blocks - Blocks.
 * @param {Function} isValid - Validation callback.
 * @returns {?object} Invalid block, if found.
 */
export function findInvalidBlock( blocks, isValid ) {
	return blocks.find( ( block ) => ! isValid( block ) );
}

/**
 * From the given blocks, return the ones that don't satisfy the given validation callback.
 *
 * @param {object[]} blocks - Blocks.
 * @param {Function} isValid - Validation callback.
 * @returns {object[]} Invalid blocks, if found.
 */
export function findInvalidBlocks( blocks, isValid ) {
	return blocks.filter( ( block ) => ! isValid( block ) );
}

/**
 * From the given blocks, return the first one that satisfies the given validation callback.
 *
 * @param {object[]} blocks - Blocks.
 * @param {Function} isValid - Validation callback.
 * @returns {?object} Valid block, if found.
 */
export function findValidBlock( blocks, isValid ) {
	return blocks.find( ( block ) => isValid( block ) );
}

/**
 * From the given blocks, return the ones that satisfy the given validation callback.
 *
 * @param {object[]} blocks - Blocks.
 * @param {Function} isValid - Validation callback.
 * @returns {object[]} Valid blocks, if found.
 */
export function findValidBlocks( blocks, isValid ) {
	return blocks.filter( ( block ) => isValid( block ) );
}
