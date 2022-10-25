import { ReactNode } from 'react';

import { useSelect } from '@wordpress/data';

/**
 * A component that renders its children only if the current post type matches the one specified.
 *
 * @param {object} props - Component props.
 * @returns {ReactNode} Component.
 */
export default function PostTypeSupportCheck( props ) {
	const { postType } = props;

	const currentPostType = useSelect(
		( select ) => select( 'core/editor' ).getCurrentPostType(),
		[]
	);

	if ( currentPostType === postType ) {
		return props.children;
	}

	return props.fallback ?? null;
}
