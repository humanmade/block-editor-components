import React, { ReactNode, useCallback, useEffect } from 'react';

import {
	Button,
	CheckboxControl,
	Flex,
	FlexItem,
	Modal,
	Notice,
	SearchControl,
	Spinner,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import {
	useState,
	useMemo,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import TermSelector from '../TermSelector';

/**
 * List of selectable posts
 *
 * @param {object} props Component props
 * @returns {ReactNode} Component
 */
function PostList( props ) {
	const {
		postType,
		queryArgs,
		onChange,
		values = [],
	} = props;

	const queriedPosts = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'postType', postType, queryArgs ) ?? [];
	}, [ postType, queryArgs ] );

	const isResolving = useSelect( ( select ) => {
		return select( 'core/data' ).isResolving( 'core', 'getEntityRecords', [ 'postType', postType, queryArgs ] );
	} );

	return useMemo( () =>
		(
			<div style={ {
				height: 400,
				maxHeight: '100%',
				overflow: 'scroll',
				paddingLeft: 4,
				marginLeft: -4,
			} }>
				{
					( isResolving && <Spinner/> )
					|| ( queriedPosts.length < 1 &&
						<Notice
							isDismissible={ false }
						>
							{ __( 'No results found' ) }
						</Notice>
					)
					|| (
						queriedPosts.map( post => (
							<CheckboxControl
								key={ post.id }
								checked={ values.includes( post.id ) }
								label={ post.title?.rendered || __( '(No title)', 'block-editor-components' ) }
								onChange={ ( checked ) => {
									if ( checked ) {
										onChange( [ ...values, post.id ] );
									} else {
										onChange( values.filter( value => ( value !== post.id ) ) );
									}
								} }
							/>
						) )
					)
				}
			</div>
		),
	[ isResolving, onChange, queriedPosts, values ]
	);
}

/**
 * Component allowing the selection of one or more posts
 *
 * @param {object} props Component props
 * @returns {ReactNode} Component
 */
function PostPicker( props ) {
	const {
		title = __( 'Select posts', 'block_editor_components' ),
		postType = 'post',
		taxonomies = [],
		values,
		onChange,
	} = props;

	const [ modalOpen, setModalOpen ] = useState( false );

	const [ search, setSearch ] = useState();

	const taxObjects = useSelect( select => {
		return taxonomies.map( taxonomy => select( 'core' ).getTaxonomy( taxonomy ) );
	}, [ taxonomies ] );

	const [ taxQueries, setTaxQueries ] = useState( [] );

	/**
	 * Helper function to update tax query for a taxonomy.
	 *
	 * Sets correct property value of rest_base.
	 * Merges the new data with existing data.
	 *
	 * @param {*} taxonomy Taxonomy.
	 * @param {*} newTerms New terms.
	 */
	const updateTaxQueryState = useCallback( ( taxonomy, newTerms ) => {
		const taxObject = taxObjects.find( t => t && t.slug === taxonomy );

		if ( taxObject ) {
			setTaxQueries( {
				...taxQueries,
				[`${taxObject.rest_base}`]: newTerms,
			} );
		}
	}, [ taxQueries, taxObjects ] );

	// Ensure initial tax query state is set.
	// Use effect to account for delay loading tax objects.
	useEffect( () => {
		taxObjects.forEach( taxObject => {
			if ( taxObject && ! taxQueries[ taxObject.rest_base ] ) {
				updateTaxQueryState( taxObject.rest_base, [] );
			}
		} );
	}, [ taxObjects, updateTaxQueryState, taxQueries ] );

	const queryArgs = {
		search,
		per_page: 30,
		...taxQueries,
	};

	return (
		<>
			<Button
				variant="primary"
				onClick={ () => setModalOpen( true ) }
			>
				{ title }
			</Button>
			{
				modalOpen &&
				<Modal style={ {
					width: '720px',
					maxWidth: '100%',
				} }
				title={ title }
				onRequestClose={ () => setModalOpen( false ) }
				>
					<Flex align="flex-start">
						<FlexItem style={ {
							width: '50%',
						} }>
							<SearchControl
								label="Search Posts"
								style={ { marginBottom: 24 } }
								value={ search }
								onChange={ ( text ) => setSearch( text ) }
							/>
							{ taxonomies.map( taxonomy => {
								const taxObject = taxObjects.find( t => t && t.slug === taxonomy );

								return taxObject ? (
									<TermSelector
										taxonomy={ taxonomy }
										value={ taxQueries[ taxObject.rest_base ] }
										onChange={ terms => updateTaxQueryState( taxonomy, terms ) }
									/>
								) : null;
							} ) }
						</FlexItem>
						<FlexItem style={ { width: '50%' } }>
							<PostList
								postType={ postType }
								queryArgs={ queryArgs }
								values={ values }
								onChange={ onChange }
							/>
						</FlexItem>
					</Flex>
				</Modal>
			}
		</>
	);
}

export default PostPicker;
