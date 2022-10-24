/**
 * Create a callback for the given list of attribute names to use as predicate for the "isActive" check.
 *
 * @param {string[]} attributeNames - List of attribute names to check.
 * @returns {Function} Predicate.
 */
function createPredicate( attributeNames ) {
	return ( blockAttributes, variationAttributes ) => {
		return attributeNames.every( ( name ) => blockAttributes[ name ] === variationAttributes[ name ] );
	};
}

/**
 * Update all block variations to include an "isActive" callback that checks the list of provided attribute names.
 *
 * @param {object} settings - Block settings.
 * @param {string} attributeNames - List of attribute names to check.
 * @returns {object} Block settings.
 */
export function withActiveVariation( settings, ...attributeNames ) {
	if ( settings.variations?.length ) {
		const isActive = createPredicate( attributeNames );

		settings.variations = settings.variations.map( ( variation ) => {
			variation.isActive = isActive;
			return variation;
		} );
	}

	return settings;
}
