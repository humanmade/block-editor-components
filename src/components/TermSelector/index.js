import React, { ReactNode } from 'react';

import { FormTokenField } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Generate a list of term IDs, keyed by title.
 *
 * @param {object[]} termObjects array of terms, returned from getEntityRecords.
 * @returns {Array} array of term IDs, keyed by title.
 */
function generateTitleToIdMap( termObjects ) {

	if ( ! termObjects ) {
		return [];
	}

	return termObjects.reduce( ( accumulator, currentTerm ) => {
		accumulator[currentTerm.name] = currentTerm.id;
		return accumulator;
	}, {} );

}

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

	const taxObject = useSelect( select => {
		return select( 'core' ).getTaxonomy( taxonomy );
	}, [ taxonomy ] );

	const { taxonomyTermsById, taxonomyTermsByTitle } = useSelect( ( select ) => {
		const termObjects = select( 'core' ).getEntityRecords( 'taxonomy', taxonomy, { per_page: 100 } ) ?? [];
		const taxonomyTermsById = generateIdToTitleMap( termObjects );
		const taxonomyTermsByTitle = generateTitleToIdMap( termObjects );

		return {
			taxonomyTermsById,
			taxonomyTermsByTitle,
		};
	}, [ taxonomy ] );

	const selectedTerms = value.map( id => taxonomyTermsById[id] ).filter( Boolean );

	return ( <FormTokenField
		label={ sprintf( __( 'Filter by %s', 'block-editor-components' ), taxObject ? taxObject.labels.singular_name : '' ) }
		suggestions={ Object.values( taxonomyTermsById ) }
		value={ selectedTerms }
		onChange={ terms => {
			onChange( terms.map( term => taxonomyTermsByTitle[term] ) );
		} }
	/> );
}

export default TermSelector;
