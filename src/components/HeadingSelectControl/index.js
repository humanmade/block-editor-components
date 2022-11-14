import React, { ReactNode, useMemo } from 'react';

import { SelectControl } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

/**
 * A dropdown control that allows for selecting a heading level.
 *
 * @param {object} props - Component props.
 * @returns {ReactNode} Component.
 */
function HeadingSelectControl( props ) {
	const {
		max = 6,
		min = 2,
		onChange,
		value = min,
		...selectProps
	} = props;

	const options = useMemo(
		() => {
			if ( min > max ) {
				return undefined;
			}

			return Array( max - min + 1 ).fill().map( ( _, index ) => {
				const level = min + index;

				return {
					label: sprintf(
						// translators: %s: heading level (e.g.: 1, 2, 3).
						__( 'Heading %d', 'block-editor-components' ),
						level
					),
					value: level,
				};
			} );
		},
		[ max, min ]
	);

	return (
		<SelectControl
			{ ...selectProps }
			options={ options }
			value={ value }
			onChange={ ( value ) => onChange( Number( value ) ) }
		/>
	);
}

export default HeadingSelectControl;
