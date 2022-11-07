import React, { ReactNode, useEffect, useState } from 'react';

import apiFetch from '@wordpress/api-fetch';
import { Notice, SelectControl, Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { addQueryArgs } from '@wordpress/url';

import { createOptionsFromTerms } from '../..';

const DEFAULT_OPTION = {
	label: '',
	value: '',
};

const FALLBACK_OPTION = {
	disabled: true,
	label: __( 'No items found!', 'block-editor-components' ),
	value: '',
};

/**
 * A dropdown control that allows for selecting a single term in the given taxonomy.
 *
 * @param {object} props - Component props
 * @returns {ReactNode} Component.
 */
function FetchAllTermSelectControl( props ) {
	const {
		defaultOption = DEFAULT_OPTION,
		fallbackOption = FALLBACK_OPTION,
		taxonomy,
		...selectProps
	} = props;

	const [ error, setError ] = useState();
	const [ options, setOptions ] = useState();

	const basePath = useSelect(
		( select ) => select( 'core' ).getTaxonomy( taxonomy )?.rest_base,
		[ taxonomy ]
	);

	useEffect(
		() => {
			if ( ! basePath ) {
				return;
			}

			( async () => {
				try {
					const response = await apiFetch( {
						path: addQueryArgs( `/wp/v2/${ basePath }`, {
							_fields: 'id,name',
							context: 'view',
							per_page: -1,
						} ),
					} );
					if ( ! response?.length ) {
						setOptions( fallbackOption ? [ fallbackOption ] : [] );

						return;
					}

					setOptions( [
						...( defaultOption ? [ defaultOption ] : [] ),
						...createOptionsFromTerms( response ),
					] );
				} catch ( error ) {
					setError( error.message ?? __( 'Unknown error.', 'block-editor-components' ) );
				}
			} )();
		},
		[ basePath, defaultOption, fallbackOption ]
	);

	if ( error ) {
		return (
			<Notice isDismissible={ false } status="error">
				<p>{ error }</p>
			</Notice>
		);
	}

	if ( ! options ) {
		return (
			<Spinner />
		);
	}

	return (
		<SelectControl
			{ ...selectProps }
			options={ options }
		/>
	);
}

export default FetchAllTermSelectControl;
