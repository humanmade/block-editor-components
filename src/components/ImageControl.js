import React, { ReactNode } from 'react';

import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { BaseControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const allowedTypes = [ 'image' ];

const BUTTON_TEXT = __( 'Select image', 'block-editor-components' );
const MODAL_TITLE = __( 'Select Image', 'block-editor-components' );
const REMOVE_BUTTON_TEXT = __( 'Remove image', 'block-editor-components' );

/**
 * Image sidebar control.
 *
 * @param {object} props - Component props.
 * @returns {ReactNode} Component.
 */
export default function ImageControl( props ) {
	const {
		buttonText = BUTTON_TEXT,
		className,
		help,
		id,
		label,
		modalTitle = MODAL_TITLE,
		removeButtonText = REMOVE_BUTTON_TEXT,
		value,
		onChange,
	} = props;

	return (
		<BaseControl className={ className } help={ help } id={ id } label={ label }>
			<MediaUploadCheck fallback={ () => ( value && <img alt="" src={ value } /> ) }>
				<MediaUpload
					allowedTypes={ allowedTypes }
					render={ ( { open } ) => (
						<Button onClick={ open }>
							{ value ? (
								<img alt="" src={ value } />
							) : (
								buttonText
							) }
						</Button>
					) }
					title={ modalTitle }
					onSelect={ onChange }
				/>
			</MediaUploadCheck>
			{ value && (
				<Button isDestructive onClick={ () => onChange( null ) }>
					{ removeButtonText }
				</Button>
			) }
		</BaseControl>
	);
}
