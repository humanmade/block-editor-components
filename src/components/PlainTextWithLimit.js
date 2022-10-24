import React, { ReactNode, useState } from 'react';

import { PlainText } from '@wordpress/block-editor';

/**
 * Plain-text input that restricts characters to the given maximum number.
 *
 * Setting the limit to 0 disables the character length restriction.
 *
 * @param {object} props - Component props.
 * @returns {ReactNode} Component.
 */
export default function PlainTextWithLimit( props ) {
	const {
		className,
		limit = 0,
		onChange,
		...inputProps
	} = props;

	const [ isInvalid, setIsInvalid ] = useState( limit && props.value?.length > limit );

	const checkValidity = ( value ) => {
		if ( limit && value.length > limit ) {
			if ( ! isInvalid ) {
				setIsInvalid( true );
			}
			return;
		}

		if ( isInvalid ) {
			setIsInvalid( false );
		}

		onChange( value );
	};

	return (
		<PlainText
			className={ `${ className } limit-text ${ isInvalid ? 'invalid' : '' }`.trim() }
			onChange={ checkValidity }
			{ ...inputProps }
		/>
	);
}
