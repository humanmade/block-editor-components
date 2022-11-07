import { ReactNode } from 'react';

import { useSelect } from '@wordpress/data';

/**
 * Return a block appender, if less than the maximum number of inner blocks.
 *
 * @param {string} clientId - Block client ID.
 * @param {number} blockLimit - Maximum number of inner blocks.
 * @param {?ReactNode} [appender] - Optional. Block appender to use. Defaults to use the default appender.
 * @returns {?ReactNode | false} Block appender, if less than the maximum number of inner blocks, or otherwise false.
 */
export default function useRenderAppenderWithBlockLimit( clientId, blockLimit, appender ){
	return useSelect(
		( select ) => {
			const { innerBlocks } = select( 'core/block-editor' ).getBlock( clientId );

			return innerBlocks?.length < blockLimit ? appender : false;
		},
		[]
	);
}
