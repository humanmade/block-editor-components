import React, { ReactNode } from 'react';

import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Block controls for linking to a media library resource.
 *
 * @param {object} props - Component props.
 * @returns {ReactNode} Component.
 */
export default function FileControls( props ) {
	const {
		value,
		onDeselect,
		...mediaUploadProps
	} = props;

	return (
		<MediaUploadCheck>
			<MediaUpload
				{ ...mediaUploadProps }
				render={ ( { open } ) => (
					<ToolbarGroup>
						<ToolbarButton
							icon="admin-links"
							label={ value ? __( 'Edit file', 'block-editor-components' ) : __( 'Select file', 'block-editor-components' ) }
							onClick={ open }
						/>
						{ value && (
							<ToolbarButton
								icon="editor-unlink"
								label={ __( 'Deselect file', 'block-editor-components' ) }
								onClick={ onDeselect }
							/>
						) }
					</ToolbarGroup>
				) }
				value={ value }
			/>
		</MediaUploadCheck>
	);
}
