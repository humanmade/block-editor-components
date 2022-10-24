import React, { ReactNode, useRef, useState } from 'react';

import { RichText } from '@wordpress/block-editor';
import { __unstableStripHTML } from '@wordpress/dom';

const moveCursorToEnd = ( element ) => {
	const range = document.createRange();
	range.selectNodeContents( element );
	range.collapse( false );

	const selection = window.getSelection();
	selection.removeAllRanges();
	selection.addRange( range );
};

/**
 * Rich-text input that restricts characters to the given maximum number.
 *
 * Setting the limit to 0 disables the character length restriction.
 *
 * @param {object} props - Component props.
 * @returns {ReactNode} Component.
 */
export default function RichTextWithLimit( props ) {
	const {
		className,
		limit = 0,
		onChange,
		...inputProps
	} = props;

	const inputRef = useRef();

	const [ isInvalid, setIsInvalid ] = useState( limit && props.value?.length > limit );
	const [ isUserInput, setIsUserInput ] = useState( false );

	const checkValidity = ( value ) => {
		if ( limit && __unstableStripHTML( value ).length > limit ) {
			setIsUserInput( false );
			inputRef.current.innerHTML = props.value;
			moveCursorToEnd( inputRef.current );
			if ( ! isInvalid ) {
				setIsInvalid( true );
			}
			return;
		}

		if ( isUserInput && isInvalid ) {
			setIsInvalid( false );
		}

		setIsUserInput( true );
		onChange( value );
	};

	return (
		<RichText
			ref={ inputRef }
			className={ `${ className } limit-text ${ isInvalid ? 'invalid' : '' }`.trim() }
			onChange={ checkValidity }
			{ ...inputProps }
		/>
	);
}
