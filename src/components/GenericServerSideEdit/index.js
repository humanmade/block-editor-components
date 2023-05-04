import { useBlockProps } from '@wordpress/block-editor';
import { Disabled } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ServerSideRender from '@wordpress/server-side-render';

/**
 * Renders the block edit interface using server side rendering.
 *
 * @param {object} props Block props
 * @param {object} props.attributes block attributes
 * @param {object} props.context block context data
 * @param {string} props.name name of block
 * @param {React.ReactNode} props.inspectorControls an optional component to hold block field UI
 * @returns {React.ReactNode} Rendered editorial UI.
 */
function GenericServerSideEdit( { attributes, context, name, inspectorControls } ) {

	/**
	 * A generic empty response component that uses the standard wp-block-name class
	 * for when an empty value is returned by the API.
	 *
	 * @returns {React.ReactNode} block rendered as empty component.
	 */
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
						attributes={ attributes }
						block={ name }
						EmptyResponsePlaceholder={ emptyResponse }
						urlQueryArgs={
							( typeof context === 'object' && Object.hasOwn( context, 'postId' ) ) ? { post_id: context.postId } : {}
						}
					/>
				</Disabled>
			</div>
		</>
	);
}

export default GenericServerSideEdit;
