import React, { ReactNode } from 'react';

import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { BaseControl, Button, Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { getImageDataForSize } from '../../utils/images';

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
		size,
		value,
		onChange,
	} = props;

	const imageAlt = useSelect(
		( select ) => {
			const image = select( 'core' ).getMedia( value, { context: 'view' } );
			if ( ! image ) {
				return '';
			}

			return image.alt_text;
		},
		[ value ]
	);

	const imageUrl = useSelect(
		( select ) => {
			const image = select( 'core' ).getMedia( value, { context: 'view' } );
			if ( ! image ) {
				return undefined;
			}

			if ( size ) {
				const imageData = getImageDataForSize( image, size );
				if ( imageData ) {
					return imageData.src;
				}
			}

			return image.source_url;
		},
		[ size, value ]
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
							{ value ? (
								imageUrl ? (
									<Button isLink onClick={ open }>
										<img alt={ imageAlt } src={ imageUrl } />
									</Button>
								) : (
									<Spinner />
								)
							) : null }
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
