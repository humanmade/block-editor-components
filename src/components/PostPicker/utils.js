import { __, sprintf } from '@wordpress/i18n';

/**
 * Normalise the postType prop to an array of post type slugs.
 *
 * The prop accepts either a single slug or an array of slugs.
 *
 * @param {string|string[]} postType Post type slug, or array of slugs.
 * @returns {string[]} Array of post type slugs.
 */
export function toPostTypes( postType ) {
	return Array.isArray( postType ) ? postType : [ postType ];
}

/**
 * The parts of a post's checkbox label.
 *
 * Returns the pieces rather than one assembled string so the caller can style
 * the type prefix without this module reaching for React — the helpers here
 * stay pure so they can be unit tested without a DOM.
 *
 * The colon lives inside the translated prefix because languages punctuate
 * differently; only the space between prefix and title is fixed.
 *
 * @param {object} post Post record.
 * @param {?object} postTypeLabels Singular labels keyed by slug, or null for no prefix.
 * @returns {{prefix: ?string, title: string}} Prefix, or null when the selection is one post type, and the title.
 */
export function labelPartsForPost( post, postTypeLabels ) {
	const title = post.title?.rendered || __( '(No title)', 'block-editor-components' );

	if ( ! postTypeLabels ) {
		return {
			prefix: null,
			title,
		};
	}

	return {
		prefix: sprintf(
			/* translators: %s: post type singular label, prefixed to a post title. */
			__( '%s:', 'block-editor-components' ),
			postTypeLabels[ post.type ] || post.type
		),
		title,
	};
}

/**
 * Stable dependency key for a list of post type slugs.
 *
 * A hook cannot depend on an array — a literal has a fresh identity every
 * render — so the slugs are reduced to a primitive. Sorted first because the
 * consumer's order is presentation only: a picker given `post,page` and one
 * given `page,post` are the same query, and an order-sensitive key would
 * refetch and cache them twice.
 *
 * Only the key is sorted. The array itself keeps the consumer's order, whose
 * first entry is the post type the picker opens on.
 *
 * @param {string[]} postTypes Post type slugs.
 * @returns {string} Comma separated slugs, sorted.
 */
export function getPostTypesKey( postTypes ) {
	return [ ...postTypes ].sort().join( ',' );
}

/**
 * Canonical, display-order-independent key for a set of selected IDs.
 *
 * Reordering the selection must not look like a new query — the order is
 * applied client-side via `sortOrder` — but adding or removing a post
 * genuinely is one.
 *
 * @param {number[]} values Selected post IDs, in display order.
 * @returns {string} Comma separated IDs, ascending.
 */
export function getSelectionIdsKey( values ) {
	return [ ...values ].sort( ( a, b ) => a - b ).join( ',' );
}

/**
 * Query args for fetching the current selection.
 *
 * `per_page` has a REST minimum of 1, and an empty `include` would return
 * everything, so an empty selection is not worth a request at all.
 *
 * @param {string} selectionIdsKey Key from `getSelectionIdsKey`.
 * @returns {?object} Query args, or null when there is nothing to fetch.
 */
export function getSelectionQueryArgs( selectionIdsKey ) {
	const ids = selectionIdsKey ? selectionIdsKey.split( ',' ).map( Number ) : [];

	return ids.length > 0 ? {
		include: ids,
		per_page: ids.length,
		context: 'view',
	} : null;
}

/**
 * Taxonomies registered for a given post type.
 *
 * Querying any other taxonomy against this post type is a 400 from the REST
 * API, so a filter that does not apply is dropped rather than left active but
 * hidden.
 *
 * @param {string[]} taxonomies Taxonomy slugs to consider.
 * @param {object[]} taxObjects Resolved taxonomy objects, which may contain nulls while loading.
 * @param {string} postType Post type slug.
 * @returns {string[]} The subset of `taxonomies` that applies.
 */
export function getApplicableTaxonomies( taxonomies, taxObjects, postType ) {
	return taxonomies.filter( taxonomy => {
		const taxObject = taxObjects.find( t => t && t.slug === taxonomy );

		return !! taxObject && ( taxObject.types ?? [] ).includes( postType );
	} );
}
