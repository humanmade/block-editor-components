import React, { ReactNode } from 'react';

import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { BaseControl, Button } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const allowedTypes = [ 'image' ];

const BUTTON_TEXT = __( 'Select Image', 'block-editor-components' );
const MODAL_TITLE = __( 'Select Image', 'block-editor-components' );
const REMOVE_BUTTON_TEXT = __( 'Remove image', 'block-editor-components' );
const REPLACE_BUTTON_TEXT = __( 'Replace Image', 'block-editor-components' );

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
		replaceButtonText = REPLACE_BUTTON_TEXT,
		value,
		onChange,
	} = props;

	const imageUrl = useSelect(
		( select ) => select( 'core' ).getMedia( value, { context: 'view' } )?.source_url,
		[ value ]
	);

	return (
		<BaseControl
			className={ className }
			help={ help }
			id={ id }
			label={ label }
		>
			<MediaUploadCheck>
				<MediaUpload
					allowedTypes={ allowedTypes }
					render={ ( { open } ) => (
						<div>
							{ imageUrl && (
								<Button isLink onClick={ open }>
									<img alt="" src={ imageUrl } />
								</Button>
							) }
							<Button isSecondary onClick={ open }>
								{ value ? replaceButtonText : buttonText }
							</Button>
						</div>
					) }
					title={ modalTitle }
					onSelect={ onChange }
				/>
			</MediaUploadCheck>
			<br />
			{ value && (
				<Button isDestructive isLink onClick={ () => onChange( null ) }>
					{ removeButtonText }
				</Button>
			) }
		</BaseControl>
	);
}
