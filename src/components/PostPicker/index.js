import React, { ReactNode, useCallback, useEffect } from 'react';

import {
	Button,
	ButtonGroup,
	ToolbarButton,
	TabPanel,
	CheckboxControl,
	Flex,
	FlexItem,
	Modal,
	Notice,
	SearchControl,
	Spinner,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
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
		isSortable = false,
	} = props;

	const queriedPosts = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'postType', postType, queryArgs ) ?? [];
	}, [ postType, queryArgs ] );

	const isResolving = useSelect( ( select ) => {
		return select( 'core/data' ).isResolving( 'core', 'getEntityRecords', [ 'postType', postType, queryArgs ] );
	} );

	const reorderUp = ( postId ) => {
		const index = values.indexOf( postId );

		// Item not found or already at the first position
		if ( index === -1 || index === 0 ) {
			return;
		}

		onChange( [
			...values.slice( 0, index - 1 ),
			values[ index ],
			values[ index - 1 ],
			...values.slice( index + 1 ),
		] );
	};

	const reorderDown = ( postId ) => {
		const index = values.indexOf( postId );

		// Item not found or already at the last position
		if ( index === -1 || index === values.length - 1 ) {
			return;
		}

		onChange( [
			...values.slice( 0, index ),
			values[ index + 1 ],
			values[ index ],
			...values.slice( index + 2 ),
		] );
	};

	return (
		<div style={ {
			// Overflow at top.
			marginTop: -24,
			paddingTop: 24,
			// Offset to display checkbox focus outline.
			paddingLeft: 4,
			marginLeft: -4,
		} }>
			{
				( isResolving && <Spinner /> )
					|| ( queriedPosts.length < 1 &&
						<Notice
							isDismissible={ false }
						>
							{ __( 'No results found', 'block-editor-components' ) }
						</Notice>
					)
					|| (
						queriedPosts.map( post => (
							<div
								style={ {
									display: 'grid',
									gridTemplateColumns: '1fr auto',
									marginRight: -2,
									paddingRight: 2,
								} }
							>
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
								{ isSortable && (
									<ButtonGroup>
										<Button
											icon={ 'arrow-up-alt2' }
											iconSize={ 12 }
											isSmall
											label={ __( 'Move up', 'block-editor-components' ) }
											variant="secondary"
											onClick={ () => reorderUp( post.id ) }
										/>
										<Button
											icon={ 'arrow-down-alt2' }
											iconSize={ 12 }
											isSmall
											label={ __( 'Move down', 'block-editor-components' ) }
											variant="secondary"
											onClick={ () => reorderDown( post.id ) }
										/>
									</ButtonGroup>
								) }
							</div>
						) )
					)
			}
		</div>
	);
}

/**
 * Post Picker Browse Post Panel.
 *
 * @param {object} props Component props.
 * @returns {ReactNode} Component.
 */
function BrowsePanel( props ) {
	const {
		postType,
		onChange,
		values,
		taxonomies,
	} = props;

	const [ search, setSearch ] = useState( '' );

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
		search: search || undefined, // When empty, set as undefined to omit query var from API request.
		per_page: 30,
		...taxQueries,
		context: 'view',
	};

	return (
		<Flex
			align="flex-start"
			style={ { gap: 24 } }
		>
			<FlexItem
				style={ {
					width: '35%',
				} }
			>
				<SearchControl
					label={ __( 'Search Posts', 'block-editor-components' ) }
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
			<FlexItem style={ { width: '65%' } }>
				<PostList
					postType={ postType }
					queryArgs={ queryArgs }
					values={ values }
					onChange={ onChange }
				/>
			</FlexItem>
		</Flex>
	);
}

/**
 * Post Picker Modal Component.
 *
 * @param {object} props Props.
 * @returns {ReactNode} Component
 */
export function PostPickerModal( props ) {
	const {
		title,
		postType = 'post',
		taxonomies = [],
		values = [],
		onChange,
		setModalOpen,
	} = props;

	return (
		<Modal
			style={ {
				width: '800px',
				maxWidth: '100%',
			} }
			title={ title }
			onRequestClose={ () => setModalOpen( false ) }
		>
			<div style={ { marginTop: -16 } }>
				<TabPanel
					tabs={ [
						{
							name: 'browse',
							title: __( 'Browse Posts', 'block-editor-components' ),
							content: () => (
								<>Foo</>
							),
						},
						{
							name: 'selection',
							title: __( 'Current Selection', 'block-editor-components' ),
						},
					] }
				>
					{ tabPanel => (
						<div style={ {
							marginTop: 'calc( var(--wp-admin-border-width-focus) * -1 )',
							borderStyle: 'none',
							borderTop: 'var( --wp-admin-border-width-focus ) solid #ddd',
							paddingTop: 24,
						} }>
							{ tabPanel.name === 'browse' && (
								<BrowsePanel
									postType={ postType }
									taxonomies={ taxonomies }
									values={ values }
									onChange={ onChange }
								/>
							) }

							{ tabPanel.name === 'selection' && (
								<PostList
									isSortable
									postType={ postType }
									queryArgs={ {
										include: values,
										orderby: 'include',
										per_page: values.length,
									} }
									values={ values }
									onChange={ onChange }
								/>
							) }
						</div>
					) }
				</TabPanel>
			</div>
		</Modal>
	);
}

/**
 * Post picker toolbar button.
 *
 * @param {object} props Props.
 * @returns {ReactNode} Component
 */
export function PostPickerToolbarButton( props ) {
	const {
		title = __( 'Select posts', 'block-editor-components' ),
		icon = 'edit',
	} = props;

	const [ modalOpen, setModalOpen ] = useState( false );

	return (
		<>
			<ToolbarButton
				icon={ icon }
				label={ title }
				onClick={ () => setModalOpen( true ) }
			>
				{ title }
			</ToolbarButton>
			{ modalOpen && (
				<PostPickerModal
					{ ...props }
					setModalOpen={ setModalOpen }
					title={ title }
				/>
			) }
		</>
	);
}

/**
 * Component allowing the selection of one or more posts
 *
 * @param {object} props Component props
 * @returns {ReactNode} Component
 */
export function PostPickerButton( props ) {
	const {
		title = __( 'Select posts', 'block-editor-components' ),
	} = props;

	const [ modalOpen, setModalOpen ] = useState( false );

	return (
		<>
			<Button
				variant="primary"
				onClick={ () => setModalOpen( true ) }
			>
				{ title }
			</Button>
			{ modalOpen && (
				<PostPickerModal
					{ ...props }
					setModalOpen={ setModalOpen }
					title={ title }
				/>
			) }
		</>
	);
}
