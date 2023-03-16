import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';

import { useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * InnerBlockSlider component.
 *
 * @param {object}            props                  Component props.
 * @param {string}            props.parentBlockId    Parent block clientId.
 * @param {string}            props.allowedBlocks    Allowed block types. See InnerBlocks.
 * @param {Array}             props.template         Initial block template. See InnerBlocks.
 * @param {boolean}           props.currentItemIndex Current Item
 * @param {boolean}           props.className        Class name.
 * @param {boolean|ReactNode} props.renderAppender   Appender.
 * @param {boolean}           props.captureToolbars  Passed through to inner block props.
 * @returns {import('react').ReactNode} Component.
 */
function InnerBlocksDisplaySingle( {
	className,
	allowedBlocks,
	template,
	currentItemIndex,
	parentBlockId,
	renderAppender,
	captureToolbars,
} ) {
	const styleRef = useRef();

	const innerBlockProps = useInnerBlocksProps(
		{
			id: `inner-block-display-single-${ parentBlockId }`,
			className,
		},
		{
			__experimentalCaptureToolbars: captureToolbars,
			allowedBlocks,
			orientation: 'horizontal',
			renderAppender,
			template,
			templateLock: false,
		}
	);

	useEffect( () => {
		if ( ! styleRef.current ) {
			return;
		}

		styleRef.current.innerHTML = `#inner-block-display-single-${ parentBlockId } > *:not(:nth-child(${
			currentItemIndex + 1
		}) ) { display: none; }`;
	}, [ currentItemIndex, styleRef, parentBlockId ] );

	return (
		<>
			<style ref={ styleRef } />
			<div { ...innerBlockProps } />
		</>
	);
}

InnerBlocksDisplaySingle.defaultProps = {
	currentItemIndex: 0,
	renderAppender: false,
	captureToolbars: true,
};

InnerBlocksDisplaySingle.propTypes = {
	parentBlockId: PropTypes.string.isRequired,
	allowedBlocks: PropTypes.arrayOf( PropTypes.string ).isRequired,
	template: PropTypes.array,
	className: PropTypes.string,
	currentItemIndex: PropTypes.number,
	renderAppender: PropTypes.oneOfType( [
		PropTypes.bool,
		PropTypes.element,
	] ),
};

export default InnerBlocksDisplaySingle;
