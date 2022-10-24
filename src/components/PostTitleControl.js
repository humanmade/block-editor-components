import React, { ReactNode, useCallback } from 'react';

import { RichText } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';

const REGEXP_NEWLINES = /[\r\n]+/g;

/**
 * A rich-text input element that allows editing of the post title within a block.
 *
 * @param {object} props - Component props.
 * @returns {ReactNode} Component.
 */
export default function PostTitleControl( props ) {
	const { editPost } = useDispatch( 'core/editor' );

	const value = useSelect(
		( select ) => select( 'core/editor' ).getEditedPostAttribute( 'title' ),
		[]
	);

	const onChange = useCallback(
		( title ) => editPost( { title: title.replace( REGEXP_NEWLINES, ' ' ) } ),
		[ editPost ]
	);

	return (
		<RichText
			{ ...props }
			allowedFormats={ [] }
			value={ value }
			onChange={ onChange }
		/>
	);
}
