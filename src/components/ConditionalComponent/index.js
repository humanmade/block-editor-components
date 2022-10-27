import React, { ReactNode } from 'react';

/**
 * Conditionally render one of two components, based on the result of the given predicate function.
 *
 * The callback passed as `predicate` will receive all additional props passed to this component.
 * If `ComponentFalse` is not defined, nothing will get rendered if the predicate returns false.
 * Instead of passing a component or render callback to `ComponentTrue`, it is also possible to use this component to
 * wrap any content.
 *
 * @param {object} props - Component props.
 * @returns {ReactNode} Component.
 */
export default function ConditionalComponent( props ) {
	const {
		children = null,
		ComponentFalse = () => null,
		ComponentTrue = () => children,
		predicate,
		...componentProps
	} = props;

	const Component = predicate( componentProps ) ? ComponentTrue : ComponentFalse;

	return (
		<Component { ...componentProps } />
	);
}
