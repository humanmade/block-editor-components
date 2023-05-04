import { useBlockProps } from '@wordpress/block-editor';
import { Disabled } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ServerSideRender from '@wordpress/server-side-render';

/**
 * Render the edit interface.
 *
 * @returns {import('react').ReactNode} Rendered editorial UI.
 */
export default function GenericServerSideEdit( { attributes, context, name, inspectorControls } ) {
	const emptyResponse = () => {
		return (
			<div className={ `wp-block-${ name.replace( '/', '-' ) }` } >
				{ name } { __( 'Block rendered as empty.' ) }
			</div>
		);
	};

	return (
		<>
			{ inspectorControls }
			<div { ...useBlockProps() }>
				<Disabled>
					<ServerSideRender
						block={ name }
						attributes={ attributes }
						urlQueryArgs={
							( typeof context === 'object' && Object.hasOwn( context, 'postId' ) ) ? { post_id: context.postId } : {}
						}
						EmptyResponsePlaceholder={ emptyResponse }
					/>
				</Disabled>
			</div>
		</>
	);
}
