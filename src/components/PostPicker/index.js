import React, { ReactNode, useCallback, useEffect, useMemo } from 'react';

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
	SelectControl,
	Spinner,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';

import TermSelector from '../TermSelector';

/**
 * Normalise the postType prop to an array of post type slugs.
 *
 * The prop accepts either a single slug or an array of slugs.
 *
 * @param {string|string[]} postType Post type slug, or array of slugs.
 * @returns {string[]} Array of post type slugs.
 */
function toPostTypes( postType ) {
	return Array.isArray( postType ) ? postType : [ postType ];
}

/**
 * List of selectable posts
 *
 * Accepts one or more post types. Multiple types are fetched separately and
 * concatenated, which is only coherent for an exact `include` query — pass a
 * single type when paginating.
 *
 * @param {object} props Component props
 * @returns {ReactNode} Component
 */
function PostList( props ) {
	const {
		postType,
		queryArgs,
		onChange,
		emptyMessage = __( 'No results found', 'block-editor-components' ),
		page = 1,
		setPage = null,
		sortOrder = null,
		values = [],
		isSortable = false,
	} = props;

	const postTypes = toPostTypes( postType );

	// Stable dependency for the list of post types.
	const postTypesKey = postTypes.join( ',' );

	// Null query args mean there is nothing worth asking for, so skip the request.
	const skipQuery = ! queryArgs;

	const queriedPosts = useSelect( ( select ) => {
		if ( skipQuery ) {
			return [];
		}

		const posts = postTypes.reduce( ( accumulator, type ) => ( [
			...accumulator,
			...( select( 'core' ).getEntityRecords( 'postType', type, queryArgs ) ?? [] ),
		] ), [] );

		// The caller already holds the order, so use it rather than orderby=include.
		if ( ! sortOrder ) {
			return posts;
		}

		return [ ...posts ].sort( ( a, b ) => sortOrder.indexOf( a.id ) - sortOrder.indexOf( b.id ) );
	}, [ postTypesKey, queryArgs, skipQuery, sortOrder ] );

	// Resolving while *any* request is in flight, so the list is not revealed piecemeal.
	const isResolving = useSelect( ( select ) => {
		if ( skipQuery ) {
			return false;
		}

		return postTypes.some( type => select( 'core/data' ).isResolving(
			'core',
			'getEntityRecords',
			[ 'postType', type, queryArgs ]
		) );
	}, [ postTypesKey, queryArgs, skipQuery ] );

	const { totalItems, totalPages } = useSelect( ( select ) => {
		if ( ! setPage || skipQuery ) {
			return {
				totalItems: 0,
				totalPages: 0,
			};
		}

		return {
			totalItems: select( 'core' ).getEntityRecordsTotalItems( 'postType', postTypes[ 0 ], queryArgs ) ?? 0,
			totalPages: select( 'core' ).getEntityRecordsTotalPages( 'postType', postTypes[ 0 ], queryArgs ) ?? 0,
		};
	}, [ postTypesKey, queryArgs, setPage, skipQuery ] );

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
		<>
			<div style={ {
				// Overflow at top.
				marginTop: -24,
				paddingTop: 24,
				// Offset to display checkbox focus outline.
				paddingLeft: 4,
				marginLeft: -4,
				// Space between rows, not after the last one.
				display: 'flex',
				flexDirection: 'column',
				gap: 4,
			} }>
				{
					( isResolving && <Spinner /> )
						|| ( queriedPosts.length < 1 &&
							<Notice
								isDismissible={ false }
							>
								{ emptyMessage }
							</Notice>
						)
						|| (
							queriedPosts.map( post => (
								<div
									key={ post.id }
									style={ {
										display: 'grid',
										gridTemplateColumns: '1fr auto',
										marginRight: -2,
										paddingRight: 2,
									} }
								>
									<CheckboxControl
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
			{ setPage && ! isResolving && totalPages > 1 && (
				<Flex
					align="center"
					justify="space-between"
					style={ {
						width: '100%',
						marginTop: 24,
					} }
				>
					{ /*
						  Count left, controls right, as wp-admin's own .tablenav does.
						  Spreading all three would float the count in the middle, where
						  it shifts sideways whenever the page or total changes width.
						*/ }
					<FlexItem
						style={ {
							// $font-size-x-small in @wordpress/base-styles.
							fontSize: 11,
						} }
					>
						{ sprintf(
							/* translators: 1: current page number. 2: total number of pages. 3: total number of posts. */
							__( 'Page %1$d of %2$d (%3$d posts)', 'block-editor-components' ),
							page,
							totalPages,
							totalItems
						) }
					</FlexItem>
					<Flex
						align="center"
						justify="flex-end"
						style={ {
							gap: 8,
							width: 'auto',
						} }
					>
						<FlexItem>
							<Button
								disabled={ page <= 1 }
								variant="secondary"
								onClick={ () => setPage( page - 1 ) }
							>
								{ __( 'Previous', 'block-editor-components' ) }
							</Button>
						</FlexItem>
						<FlexItem>
							<Button
								disabled={ page >= totalPages }
								variant="secondary"
								onClick={ () => setPage( page + 1 ) }
							>
								{ __( 'Next', 'block-editor-components' ) }
							</Button>
						</FlexItem>
					</Flex>
				</Flex>
			) }
		</>
	);
}

/**
 * Post type selector for the browse panel.
 *
 * Deliberately single choice: a single getEntityRecords request cannot span
 * post types, so the browse list queries one type at a time.
 *
 * @param {object} props Component props.
 * @returns {ReactNode} Component.
 */
function PostTypeSelector( props ) {
	const { postTypes, value, onChange } = props;

	const postTypeObjects = useSelect( select => {
		return postTypes.map( slug => select( 'core' ).getPostType( slug ) );
	}, [ postTypes.join( ',' ) ] );

	const options = postTypes.map( ( slug, index ) => {
		const postTypeObject = postTypeObjects[ index ];

		return {
			value: slug,
			label: postTypeObject?.labels?.singular_name || postTypeObject?.name || slug,
		};
	} );

	return (
		<SelectControl
			__nextHasNoMarginBottom
			label={ __( 'Post type', 'block-editor-components' ) }
			options={ options }
			value={ value }
			onChange={ onChange }
		/>
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

	const postTypes = toPostTypes( postType );

	const [ search, setSearch ] = useState( '' );
	const [ page, setPage ] = useState( 1 );
	const [ selectedPostType, setSelectedPostType ] = useState( postTypes[ 0 ] );
	const [ taxQueries, setTaxQueries ] = useState( {} );

	const taxObjects = useSelect( select => {
		return taxonomies.map( taxonomy => select( 'core' ).getTaxonomy( taxonomy ) );
	}, [ taxonomies ] );

	// Taxonomies registered for the selected post type. Querying any other
	// taxonomy against this post type is a 400 from the REST API.
	const applicableTaxonomies = taxonomies.filter( taxonomy => {
		const taxObject = taxObjects.find( t => t && t.slug === taxonomy );

		return !! taxObject && ( taxObject.types ?? [] ).includes( selectedPostType );
	} );

	// Guard against the postType prop changing out from under the selection.
	useEffect( () => {
		if ( ! postTypes.includes( selectedPostType ) ) {
			setSelectedPostType( postTypes[ 0 ] );
		}
	}, [ postTypes.join( ',' ), selectedPostType ] ); // eslint-disable-line react-hooks/exhaustive-deps

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
			setPage( 1 );
		}
	}, [ taxQueries, taxObjects ] );

	/**
	 * Switch the browsed post type.
	 *
	 * Drops any taxonomy filter that does not apply to the new post type, so a
	 * filter cannot stay active while its control is no longer rendered.
	 *
	 * @param {string} newPostType Post type slug.
	 */
	const updateSelectedPostType = ( newPostType ) => {
		const allowedRestBases = taxonomies
			.map( taxonomy => taxObjects.find( t => t && t.slug === taxonomy ) )
			.filter( taxObject => !! taxObject && ( taxObject.types ?? [] ).includes( newPostType ) )
			.map( taxObject => taxObject.rest_base );

		setTaxQueries( Object.fromEntries(
			Object.entries( taxQueries ).filter( ( [ restBase ] ) => allowedRestBases.includes( restBase ) )
		) );
		setSelectedPostType( newPostType );
		setPage( 1 );
	};

	// Only send tax queries that apply to the selected post type and have terms.
	const appliedTaxQueries = {};

	applicableTaxonomies.forEach( taxonomy => {
		const taxObject = taxObjects.find( t => t && t.slug === taxonomy );
		const terms = taxQueries[ taxObject.rest_base ];

		if ( terms && terms.length > 0 ) {
			appliedTaxQueries[ taxObject.rest_base ] = terms;
		}
	} );

	const appliedTaxQueriesKey = JSON.stringify( appliedTaxQueries );

	const queryArgs = useMemo( () => ( {
		search: search || undefined, // When empty, set as undefined to omit query var from API request.
		page,
		per_page: 30,
		...appliedTaxQueries,
		context: 'view',
	} ), [ search, page, appliedTaxQueriesKey ] ); // eslint-disable-line react-hooks/exhaustive-deps

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
				{ /*
				  The post type selector is scope, not a filter: it decides which
				  collection is queried and therefore which taxonomy filters exist
				  at all. It stays above the filters, and divided from them, so it
				  reads as governing them. Please don't tidy it into the stack.
				*/ }
				{ postTypes.length > 1 && (
					<div style={ {
						marginBottom: 24,
						paddingBottom: 24,
						borderBottom: '1px solid #ddd',
					} }>
						<PostTypeSelector
							postTypes={ postTypes }
							value={ selectedPostType }
							onChange={ updateSelectedPostType }
						/>
					</div>
				) }
				<div style={ {
					display: 'flex',
					flexDirection: 'column',
					gap: 24,
				} }>
					<SearchControl
						__nextHasNoMarginBottom
						label={ __( 'Search Posts', 'block-editor-components' ) }
						value={ search }
						onChange={ ( text ) => {
							setSearch( text );
							setPage( 1 );
						} }
					/>
					{ applicableTaxonomies.map( taxonomy => {
						const taxObject = taxObjects.find( t => t && t.slug === taxonomy );

						return (
							<TermSelector
								key={ taxonomy }
								taxonomy={ taxonomy }
								value={ taxQueries[ taxObject.rest_base ] ?? [] }
								onChange={ terms => updateTaxQueryState( taxonomy, terms ) }
							/>
						);
					} ) }
				</div>
			</FlexItem>
			<FlexItem style={ { width: '65%' } }>
				<PostList
					page={ page }
					postType={ selectedPostType }
					queryArgs={ queryArgs }
					setPage={ setPage }
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

	const postTypes = toPostTypes( postType );

	// `per_page` has a REST minimum of 1, and an empty `include` would return
	// everything, so an empty selection is not worth a request at all.
	const selectionQueryArgs = useMemo( () => ( values.length > 0 ? {
		include: values,
		per_page: values.length,
		context: 'view',
	} : null ), [ values ] );

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
									emptyMessage={ __( 'No posts selected yet. Use the Browse tab to add some.', 'block-editor-components' ) }
									isSortable
									postType={ postTypes }
									queryArgs={ selectionQueryArgs }
									sortOrder={ values }
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
