import { decodeEntities } from '@wordpress/html-entities';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Create an option data object to be used with SelectControl for the given post object.
 *
 * @param {object} post - Post object.
 * @param {string} [prefix=''] - Optional. Prefix to use for the title. Defaults to empty string.
 * @returns {object} Option data to use with SelectControl.
 */
export function createOptionFromPost( post, prefix = '' ) {
	const { id, title } = post;

	return {
		label: prefix + decodeEntities( title.rendered || sprintf( __( '#%d (no title)', 'block-editor-components' ), id ) ),
		value: id,
	};
}

/**
 * Create an option data object to be used with SelectControl for the given term object.
 *
 * @param {object} term - Term object.
 * @param {string} [prefix=''] - Optional. Prefix to use for the name. Defaults to empty string.
 * @returns {object} Option data to use with SelectControl.
 */
export function createOptionFromTerm( term, prefix = '' ) {
	const { id, name } = term;

	return {
		label: prefix + decodeEntities( name || sprintf( __( '#%d (no name)', 'block-editor-components' ), id ) ),
		value: id,
	};
}

/**
 * Create an options array to be used with SelectControl for the given array of post objects.
 *
 * @param {object[]} posts - Array with post objects as elements.
 * @returns {object[]} Options data to use with SelectControl.
 */
export function createOptionsFromPosts( posts ) {
	return posts.map( ( post ) => createOptionFromPost( post ) );
}

/**
 * Create an options array to be used with SelectControl for the given array of post objects, visualizing the hierarchy.
 *
 * @param {object[]} posts - Array with post objects as elements.
 * @param {string} [prefix='— '] - Optional. Prefix to use for the label. Defaults to "— ".
 * @param {number} [level=0] - Optional. Hierarchy level. Defaults to 0.
 * @returns {object[]} Options data to use with SelectControl.
 */
export function createOptionsFromPostsWithHierarchy( posts, prefix= '— ', level = 0 ) {
	return posts.map( ( { children = [], ...post } ) => [
		createOptionFromPost( post, prefix.repeat( level ) ),
		...createOptionsFromPostsWithHierarchy( children, prefix, level + 1 ),
	] ).flat();
}

/**
 * Create an options array to be used with SelectControl for the given array of term objects.
 *
 * @param {object[]} terms - Array with term objects as elements.
 * @returns {object[]} Options data to use with SelectControl.
 */
export function createOptionsFromTerms( terms ) {
	return terms.map( ( term ) => createOptionFromTerm( term ) );
}

/**
 * Create an options array to be used with SelectControl for the given array of term objects, visualizing the hierarchy.
 *
 * @param {object[]} terms - Array with term objects as elements.
 * @param {string} [prefix='— '] - Optional. Prefix to use for the label. Defaults to "— ".
 * @param {number} [level=0] - Optional. Hierarchy level. Defaults to 0.
 * @returns {object[]} Options data to use with SelectControl.
 */
export function createOptionsFromTermsWithHierarchy( terms, prefix = '— ', level = 0 ) {
	return terms.map( ( { children = [], ...term } ) => [
		createOptionFromTerm( term, prefix.repeat( level ) ),
		...createOptionsFromTermsWithHierarchy( children, prefix, level + 1 ),
	] ).flat();
}
