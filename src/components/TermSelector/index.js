import React, { ReactNode } from 'react';

import { FormTokenField, Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Generate a list of term titles, keyed by id.
 *
 * @param {object[]} termObjects array of terms, returned from getEntityRecords.
 * @returns {Array} array of term titles, keyed by id.
 */
function generateIdToTitleMap( termObjects ) {

	if ( ! termObjects ) {
		return [];
	}

	return termObjects.reduce( ( accumulator, currentTerm ) => {
		accumulator[currentTerm.id] = currentTerm.name;
		return accumulator;
	}, {} );
}

/**
 * Form token field to select one or more terms.
 *
 * @param {object} props Component props
 * @returns {ReactNode} Component
 */
function TermSelector( props ) {
	const { taxonomy, value = [], onChange } = props;
	const taxQueryArgs = { per_page: 100 };

	const taxObject = useSelect( select => {
		return select( 'core' ).getTaxonomy( taxonomy );
	}, [ taxonomy ] );

	const { taxonomyTermsById } = useSelect( ( select ) => {
		const termObjects = select( 'core' ).getEntityRecords( 'taxonomy', taxonomy, taxQueryArgs ) ?? [];
		return {
			taxonomyTermsById: generateIdToTitleMap( termObjects ),
		};
	}, [ taxonomy ] );

	const isResolving = useSelect( ( select ) => {
		return select( 'core/data' ).isResolving( 'core', 'getTaxonomy', [ taxonomy ] )
			|| select( 'core/data' ).isResolving( 'core', 'getEntityRecords', [ 'taxonomy', taxonomy, taxQueryArgs ] );
	}, [ taxonomy ] );

	const selectedTerms = value.map( id => taxonomyTermsById[id] ).filter( Boolean );

	return (
		<FormTokenField
			disabled={ isResolving }
			label={ sprintf( __( 'Filter by %s', 'block-editor-components' ), taxObject ? taxObject.labels.singular_name : '' ) }
			suggestions={ Object.values( taxonomyTermsById ) }
			value={ selectedTerms }
			placeholder={ isResolving ? sprintf( __( 'Loading %s…' ), taxObject.labels.name ) : null }
			onChange={ terms => {
				const ids = Object.keys( taxonomyTermsById );
				const values = Object.values( taxonomyTermsById );
				onChange( terms.map( term => ids[ values.indexOf( term ) ] ).filter( Boolean ) );
			} }
		/>
	);
}

export default TermSelector;
