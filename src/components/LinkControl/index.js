import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { URLInput } from '@wordpress/block-editor';
import { BaseControl } from '@wordpress/components';

/**
 * InspectorControl for image upload.
 *
 * @param {object} props - Component properties.
 * @param {string} props.label - The label for the control.
 * @param {string} props.id - The id for the control.
 * @param {string} props.help - Help text for the control.
 * @param {Function} props.onChange - Function to call when the value changes.
 * @param {string} props.value - The current value of the control.
 * @returns {React.ReactNode} Component.
 */
function LinkControl( {
	label,
	id,
	help,
	onChange,
	value,
} ) {
	const className = 'hm-block-editor-components-link-control';

	// Need to inject Style tag into the head in order to override the styles within URLInput component without a CSS file.
	useEffect( () => {
		const style = document.createElement( 'style' );
		style.innerHTML = `
			.${ className } {
				width: 100%;
			}

			.${ className } .block-editor-url-input {
				min-width: 0;
				max-width: none;
				position: relative;
			}

			.${ className } .components-base-control__field,
			.${ className } .components-input-control {
				margin-bottom: 0;
			}
		`;
		document.head.appendChild( style );
		return () => {
			document.head.removeChild( style );
		};
	}, [ className ] );

	return (
		<BaseControl
			className={ className }
			help={ help }
			id={ id }
			label={ label }
		>
			<URLInput
				value={ value }
				onChange={ onChange }
			/>
		</BaseControl>
	);
}

LinkControl.propTypes = {
	label: PropTypes.string.isRequired,
	help: PropTypes.string,
	id: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string,
};

export default LinkControl;
