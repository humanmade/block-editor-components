import React, { ReactNode } from 'react';

import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { BaseControl, Button, Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const allowedTypes = [ 'video' ];

const BUTTON_TEXT = __( 'Select Video', 'block-editor-components' );
const MODAL_TITLE = __( 'Select Video', 'block-editor-components' );
const REMOVE_BUTTON_TEXT = __( 'Remove Video', 'block-editor-components' );
const REPLACE_BUTTON_TEXT = __( 'Replace Video', 'block-editor-components' );

/**
 * Video sidebar control.
 *
 * @param {object} props - Component props.
 * @returns {ReactNode} Component.
 */
export default function VideoControl( props ) {
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

	const videoUrl = useSelect(
		( select ) => {
			const media = select( 'core' ).getMedia( value, { context: 'view' } );
			if ( ! media ) {
				return undefined;
			}

			return media.source_url;
		},
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
							{ value && (
								videoUrl ? (
									<Button isLink onClick={ open }>
										<video
											controls
											loop
											muted
											src={ videoUrl }
										/>
									</Button>
								) : (
									<Spinner />
								)
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
			{ value ? (
				<Button isDestructive isLink onClick={ () => onChange( null ) }>
					{ removeButtonText }
				</Button>
			) : null }
		</BaseControl>
	);
}
