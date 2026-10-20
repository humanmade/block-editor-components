import React, { ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';

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
	__experimentalConfirmDialog as ConfirmDialog,
} from '@wordpress/components';
import { useViewportMatch } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { __, _n, sprintf } from '@wordpress/i18n';
import {
	chevronLeft,
	chevronRight,
	next,
	previous,
} from '@wordpress/icons';

import TermSelector from '../TermSelector';

import {
	getApplicableTaxonomies,
	getPostTypesKey,
	getSelectionAfterPick,
	getSelectionIdsKey,
	getSelectionQueryArgs,
	labelPartsForPost,
	toPostTypes,
} from './utils';

/**
 * A post's checkbox label, with the post type prefix emphasised.
 *
 * @param {object} post Post record.
 * @param {?object} postTypeLabels Singular labels keyed by slug, or null for no prefix.
 * @returns {ReactNode|string} Label.
 */
function labelForCheckbox( post, postTypeLabels ) {
	const { prefix, title } = labelPartsForPost( post, postTypeLabels );

	if ( ! prefix ) {
		return title;
	}

	return (
		<>
			<strong>{ prefix }</strong>
			{ ' ' }
			{ title }
		</>
	);
}

/**
 * Resolve post type slugs to their singular labels.
 *
 * Falls back to the slug while the post type object is still loading, so a
 * label is never rendered empty.
 *
 * @param {string[]} postTypes Post type slugs.
 * @returns {object} Singular label, keyed by slug.
 */
function usePostTypeLabels( postTypes ) {
	return useSelect( select => Object.fromEntries( postTypes.map( slug => {
		const postTypeObject = select( 'core' ).getPostType( slug );

		return [ slug, postTypeObject?.labels?.singular_name || postTypeObject?.name || slug ];
	} ) ), [ getPostTypesKey( postTypes ) ] ); // eslint-disable-line react-hooks/exhaustive-deps
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
		maxItems = null,
		page = 1,
		showPostTypeLabels = false,
		setPage = null,
		sortOrder = null,
		values = [],
		isSortable = false,
	} = props;

	const postTypes = toPostTypes( postType );

	const postTypesKey = getPostTypesKey( postTypes );

	const postTypeLabels = usePostTypeLabels( postTypes );

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
										gridTemplateColumns: 'minmax( 0, 1fr ) auto',
										marginRight: -2,
										paddingRight: 2,
									} }
								>
									<CheckboxControl
										checked={ values.includes( post.id ) }
										/*
										  `label` is typed as a string, but the control passes it
										  straight through as children of its <label>, so a node
										  renders. Deliberate: flattening this back to a string to
										  satisfy the type would silently lose the bold prefix.
										  The <strong> adds no semantics, so the accessible name is
										  still the one string "Post: Some title".
										*/
										label={ labelForCheckbox( post, showPostTypeLabels ? postTypeLabels : null ) }
										onChange={ ( checked ) => {
											if ( checked ) {
												onChange( getSelectionAfterPick( values, post.id, maxItems ) );
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
				<div style={ { marginTop: 24 } }>
					<div style={ {
						color: '#757575',
						// $font-size-x-small in @wordpress/base-styles.
						fontSize: 11,
						marginBottom: 8,
					} }>
						{ sprintf(
							/* translators: %d: total number of results. */
							_n( '%d item', '%d items', totalItems, 'block-editor-components' ),
							totalItems
						) }
					</div>
					<Flex
						align="center"
						justify="center"
						style={ {
							gap: 4,
							width: '100%',
							borderTop: '1px solid #ddd',
							paddingTop: 8,
						} }
					>
						<FlexItem>
							<Button
								disabled={ page <= 1 }
								icon={ previous }
								label={ __( 'First page', 'block-editor-components' ) }
								onClick={ () => setPage( 1 ) }
							/>
						</FlexItem>
						<FlexItem>
							<Button
								disabled={ page <= 1 }
								icon={ chevronLeft }
								label={ __( 'Previous page', 'block-editor-components' ) }
								onClick={ () => setPage( page - 1 ) }
							/>
						</FlexItem>
						{ /*
							  Not a control, but the only thing saying where you are, so
							  it is announced rather than left to the buttons either side.
							*/ }
						<FlexItem
							style={ {
								fontSize: 12,
								padding: '0 8px',
							} }
						>
							<span aria-live="polite">
								{ sprintf(
									/* translators: 1: current page number. 2: total number of pages. */
									__( '%1$d of %2$d', 'block-editor-components' ),
									page,
									totalPages
								) }
							</span>
						</FlexItem>
						<FlexItem>
							<Button
								disabled={ page >= totalPages }
								icon={ chevronRight }
								label={ __( 'Next page', 'block-editor-components' ) }
								onClick={ () => setPage( page + 1 ) }
							/>
						</FlexItem>
						<FlexItem>
							<Button
								disabled={ page >= totalPages }
								icon={ next }
								label={ __( 'Last page', 'block-editor-components' ) }
								onClick={ () => setPage( totalPages ) }
							/>
						</FlexItem>
					</Flex>
				</div>
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

	const postTypeLabels = usePostTypeLabels( postTypes );

	const options = postTypes.map( slug => ( {
		value: slug,
		label: postTypeLabels[ slug ],
	} ) );

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
		maxItems = null,
		onChange,
		values,
		taxonomies,
	} = props;

	const postTypes = toPostTypes( postType );

	// Below WordPress's own 782px admin breakpoint the two columns are too
	// narrow to be useful, so filters stack above the list instead.
	const isStacked = useViewportMatch( 'medium', '<' );

	const [ search, setSearch ] = useState( '' );
	const [ page, setPage ] = useState( 1 );
	const [ selectedPostType, setSelectedPostType ] = useState( postTypes[ 0 ] );
	const [ taxQueries, setTaxQueries ] = useState( {} );

	const taxObjects = useSelect( select => {
		return taxonomies.map( taxonomy => select( 'core' ).getTaxonomy( taxonomy ) );
	}, [ taxonomies ] );

	const applicableTaxonomies = getApplicableTaxonomies( taxonomies, taxObjects, selectedPostType );

	// Guard against the postType prop changing out from under the selection.
	useEffect( () => {
		if ( ! postTypes.includes( selectedPostType ) ) {
			setSelectedPostType( postTypes[ 0 ] );
		}
	}, [ getPostTypesKey( postTypes ), selectedPostType ] ); // eslint-disable-line react-hooks/exhaustive-deps

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
		const allowedRestBases = getApplicableTaxonomies( taxonomies, taxObjects, newPostType )
			.map( taxonomy => taxObjects.find( t => t && t.slug === taxonomy ).rest_base );

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
			direction={ isStacked ? 'column' : 'row' }
			style={ {
				gap: 24,
				width: '100%',
			} }
		>
			<FlexItem
				style={ {
					// minWidth lets the column shrink below its content width
					// rather than overflowing the modal.
					width: isStacked ? '100%' : '35%',
					minWidth: 0,
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
			<FlexItem
				style={ {
					width: isStacked ? '100%' : '65%',
					minWidth: 0,
				} }
			>
				<PostList
					maxItems={ maxItems }
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
 * Describe the size of a selection, and the limit it is working against.
 *
 * @param {number} count Number of selected posts.
 * @param {?number} maxItems Maximum selectable, or null for no limit.
 * @returns {string} Label.
 */
function selectionCountLabel( count, maxItems ) {
	if ( ! maxItems ) {
		return sprintf(
			/* translators: %d: number of selected posts. */
			__( '%d selected', 'block-editor-components' ),
			count
		);
	}

	return sprintf(
		/* translators: 1: number of selected posts. 2: maximum selectable. */
		__( '%1$d of %2$d selected', 'block-editor-components' ),
		count,
		maxItems
	);
}

/**
 * The nearest scrollable ancestor of a node.
 *
 * Found by computed overflow rather than by class name, so it survives core
 * renaming the modal's content element.
 *
 * @param {?HTMLElement} node Node to search up from.
 * @returns {?HTMLElement} The scroll container, or null if there is none.
 */
function getScrollParent( node ) {
	let element = node?.parentElement;

	while ( element ) {
		const { overflowY } = window.getComputedStyle( element );

		if ( overflowY === 'auto' || overflowY === 'scroll' ) {
			return element;
		}

		element = element.parentElement;
	}

	return null;
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
		deferChanges = false,
		maxItems = null,
		onChange,
		setModalOpen,
	} = props;

	const postTypes = toPostTypes( postType );

	// The draft only exists in deferred mode; `values` stays the source of
	// truth otherwise, so live consumers see exactly the behaviour they had.
	const [ draft, setDraft ] = useState( values );
	const [ isConfirmingDiscard, setIsConfirmingDiscard ] = useState( false );

	const selection = deferChanges ? draft : values;

	const updateSelection = useCallback( ( nextValues ) => {
		if ( deferChanges ) {
			setDraft( nextValues );

			return;
		}

		// Live mode has nowhere to park an over-limit selection and no confirm
		// step to block, so the only enforcement available is to refuse the add.
		if ( maxItems > 1 && nextValues.length > maxItems ) {
			return;
		}

		onChange( nextValues );
	}, [ deferChanges, maxItems, onChange ] );

	// Order is meaningful — a reorder is unsaved work too.
	const isDirty = deferChanges && (
		draft.length !== values.length || draft.some( ( id, index ) => id !== values[ index ] )
	);

	const isOverLimit = !! maxItems && selection.length > maxItems;

	const footerRef = useRef();

	// The footer has to escape the padding of the modal's scroll container: the
	// bottom inset decides where it comes to rest, and the horizontal pair lets
	// its rule reach the frame edges the way the modal header's does. Measured
	// at runtime rather than hardcoded, because the padding has changed between
	// @wordpress/components versions and this package builds against whichever
	// one the site has. Left and right are read separately rather than assumed
	// equal.
	const [ scrollPadding, setScrollPadding ] = useState( {
		bottom: 0,
		left: 0,
		right: 0,
	} );

	useEffect( () => {
		const scrollParent = getScrollParent( footerRef.current );

		if ( ! scrollParent ) {
			return;
		}

		const computed = window.getComputedStyle( scrollParent );

		setScrollPadding( {
			bottom: parseFloat( computed.paddingBottom ) || 0,
			left: parseFloat( computed.paddingLeft ) || 0,
			right: parseFloat( computed.paddingRight ) || 0,
		} );
	}, [] );

	const closeModal = () => setModalOpen( false );

	/**
	 * Leave without committing, checking first if there is anything to lose.
	 *
	 * The modal's ✕ and the Escape key both arrive here via `onRequestClose`,
	 * so every way out of the modal asks the same question.
	 */
	const requestDiscard = () => {
		if ( isDirty ) {
			setIsConfirmingDiscard( true );

			return;
		}

		closeModal();
	};

	// Memoised on the canonical key so that a reorder is not seen as a new query.
	const selectionIdsKey = getSelectionIdsKey( selection );
	const selectionQueryArgs = useMemo(
		() => getSelectionQueryArgs( selectionIdsKey ),
		[ selectionIdsKey ]
	);

	return (
		<Modal
			style={ {
				width: '800px',
				maxWidth: '100%',
			} }
			title={ title }
			onRequestClose={ requestDiscard }
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
									maxItems={ maxItems }
									postType={ postType }
									taxonomies={ taxonomies }
									values={ selection }
									onChange={ updateSelection }
								/>
							) }

							{ tabPanel.name === 'selection' && (
								<PostList
									emptyMessage={ __( 'No posts selected yet. Use the Browse tab to add some.', 'block-editor-components' ) }
									isSortable
									maxItems={ maxItems }
									postType={ postTypes }
									queryArgs={ selectionQueryArgs }
									showPostTypeLabels={ postTypes.length > 1 }
									sortOrder={ selection }
									values={ selection }
									onChange={ updateSelection }
								/>
							) }
						</div>
					) }
				</TabPanel>
			</div>

			{ /*
				  The footer sits outside the TabPanel so that switching tabs
				  neither remounts it nor moves focus out of it.

				  Sticky, not a flex-pinned row, so that it mirrors core's own
				  sticky modal header in the same scroll container rather than
				  taking over the modal's scrolling. It also means the list
				  ends above the footer instead of behind it: once scrolled to
				  the bottom the footer returns to its place in the flow, so
				  the last row is never covered.
				*/ }
			{ ( deferChanges || !! maxItems ) && (
				<div
					ref={ footerRef }
					style={ {
						position: 'sticky',
						zIndex: 1,
						background: '#fff',
						marginTop: 24,
						paddingTop: 16,
						paddingBottom: 16,
						borderTop: '1px solid #ddd',
						// A sticky inset resolves against the scroll container's
						// content box, so `bottom: 0` would stop short of the
						// frame by that container's own bottom padding and let
						// the list show through the gap. Overshoot by the same
						// amount. The inset applies only while stuck, so the end
						// of the list is unaffected.
						bottom: -scrollPadding.bottom,
						// Full bleed, so the rule runs the width of the modal as
						// the header's does. The padding puts the contents back
						// where the container's own padding had them.
						marginLeft: -scrollPadding.left,
						marginRight: -scrollPadding.right,
						paddingLeft: scrollPadding.left,
						paddingRight: scrollPadding.right,
					} }
				>
					{ isOverLimit && (
						<Notice
							isDismissible={ false }
							status="error"
						>
							{ sprintf(
								/* translators: 1: maximum selectable. 2: number currently selected. */
								__( 'Select no more than %1$d posts. %2$d are selected — remove some from the Current Selection tab to continue.', 'block-editor-components' ),
								maxItems,
								selection.length
							) }
						</Notice>
					) }
					<Flex
						align="center"
						justify="space-between"
						style={ {
							width: '100%',
							marginTop: isOverLimit ? 16 : 0,
							rowGap: 8,
						} }
						wrap
					>
						<FlexItem>
							<span aria-live="polite">
								{ selectionCountLabel( selection.length, maxItems ) }
							</span>
						</FlexItem>
						{ deferChanges && (
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
										variant="tertiary"
										onClick={ requestDiscard }
									>
										{ __( 'Cancel', 'block-editor-components' ) }
									</Button>
								</FlexItem>
								<FlexItem>
									<Button
										disabled={ isOverLimit }
										variant="primary"
										onClick={ () => {
											onChange( draft );
											closeModal();
										} }
									>
										{ __( 'Confirm selection', 'block-editor-components' ) }
									</Button>
								</FlexItem>
							</Flex>
						) }
					</Flex>
				</div>
			) }

			{ deferChanges && (
				<ConfirmDialog
					cancelButtonText={ __( 'Keep editing', 'block-editor-components' ) }
					confirmButtonText={ __( 'Discard changes', 'block-editor-components' ) }
					isOpen={ isConfirmingDiscard }
					onCancel={ () => setIsConfirmingDiscard( false ) }
					onConfirm={ () => {
						setIsConfirmingDiscard( false );
						closeModal();
					} }
				>
					{ __( 'Your changes to the selection have not been saved. Discard them?', 'block-editor-components' ) }
				</ConfirmDialog>
			) }
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
