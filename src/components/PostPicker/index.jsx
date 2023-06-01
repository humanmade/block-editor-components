import React, { ReactNode } from 'react';

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

	const { isResolving, onChange, queriedPosts, values } = props;

	return useMemo( () =>
		(
			<div style={ {
				height: 400,
				maxHeight: '100%',
				overflow: 'scroll',
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
								checked={ values?.includes( post.id ) }
								label={ post.title?.rendered }
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

	const { title, postType, taxonomies, values, onChange } = props;

	const taxonomy = taxonomies[0];

	const [ modalOpen, setModalOpen ] = useState( false );

	const [ search, setSearch ] = useState();

	const [ taxQuery, setTaxQuery ] = useState( [] );

	const queryArgs = {
		search,
		per_page: -1,
		[taxonomy]: taxQuery,
	};

	const queriedPosts = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'postType', postType, queryArgs ) ?? [];
	}, [ postType, queryArgs ] );

	const isResolving = useSelect( ( select ) => {
		return select( 'core/data' ).isResolving( 'core', 'getEntityRecords', [ 'postType', postType, queryArgs ] );
	} );

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
								value={ search }
								onChange={ ( text ) => setSearch( text ) }
							/>
							<TermSelector
								taxonomy={ taxonomy }
								value={ taxQuery }
								onChange={ terms => setTaxQuery( terms ) }
							/>
						</FlexItem>
						<FlexItem style={ { width: '50%' } }>
							<PostList
								isResolving={ isResolving }
								queriedPosts={ queriedPosts }
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
