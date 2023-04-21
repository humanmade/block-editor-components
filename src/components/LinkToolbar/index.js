import React, { ReactNode, useMemo, useState } from 'react';

import { __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { Popover, ToolbarGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * A toolbar that allows to add a link.
 *
 * @param {object} props - Component props.
 * @returns {ReactNode} Component.
 */
export default function LinkToolbar( props ) {
	const {
		onChange,
		opensInNewTab,
		url,
	} = props;

	const [ showLinkControl, setShowLinkControl ] = useState( false );

	const controls = useMemo(
		() => [
			{
				icon: 'admin-links',
				title: __( 'Link', 'block-editor-components' ),
				isActive: url?.length > 0,
				onClick: () => setShowLinkControl( ! showLinkControl ),
			},
		],
		[ setShowLinkControl, showLinkControl, url ]
	);

	const value = useMemo(
		() => ( {
			url,
			opensInNewTab,
		} ),
		[ opensInNewTab, url ]
	);

	return (
		<>
			<ToolbarGroup controls={ controls } />
			{ showLinkControl && (
				<Popover>
					<LinkControl
						forceIsEditingLink={ showLinkControl }
						opensInNewTab={ opensInNewTab }
						value={ value }
						onChange={ onChange }
					/>
				</Popover>
			) }
		</>
	);
}
