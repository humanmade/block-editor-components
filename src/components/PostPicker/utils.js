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
 * Build a checkbox label for a post.
 *
 * When a selection spans post types the type is prefixed into the label
 * itself, so assistive technology reads it as part of the accessible name
 * rather than as a separate element.
 *
 * @param {object} post Post record.
 * @param {?object} postTypeLabels Singular labels keyed by slug, or null for no prefix.
 * @returns {string} Label.
 */
export function labelForPost( post, postTypeLabels ) {
	const title = post.title?.rendered || __( '(No title)', 'block-editor-components' );

	if ( ! postTypeLabels ) {
		return title;
	}

	return sprintf(
		/* translators: 1: post type singular label. 2: post title. */
		__( '%1$s: %2$s', 'block-editor-components' ),
		postTypeLabels[ post.type ] || post.type,
		title
	);
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
