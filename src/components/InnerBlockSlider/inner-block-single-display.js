import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';

import { useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * InnerBlockSlider component.
 *
 * @param {object}                  props                  Component props.
 * @param {string}                  props.parentBlockId    Parent block clientId.
 * @param {string}                  props.allowedBlocks    Allowed block types. See InnerBlocks.
 * @param {Array}                   props.template         Initial block template. See InnerBlocks.
 * @param {boolean}                 props.currentItemIndex Current Item
 * @param {boolean}                 props.className        Class name.
 * @param {boolean|React.ReactNode} props.renderAppender   Appender.
 * @param {boolean}                 props.captureToolbars  Passed through to inner block props.
 * @param {number}                  props.perPage          Number of items to display per page.
 * @returns {React.ReactNode} Component.
 */
function InnerBlocksDisplaySingle( {
	className,
	allowedBlocks,
	template,
	currentItemIndex = 0,
	parentBlockId,
	renderAppender = false,
	captureToolbars = true,
	perPage = 1,
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

	/**
	 * Construct the CSS for this component.
	 *
	 * Hide all slides except the current active slide.
	 * Account for pages - show current slide + perPage slides.
	 * Display grid if perPage > 1.
	 */
	useEffect( () => {
		if ( ! styleRef.current ) {
			return;
		}

		const containerSelector = `#inner-block-display-single-${ parentBlockId }`;

		let style = '';

		if ( perPage > 1 ) {
			style += `${containerSelector} { display: grid; grid-template-columns: repeat(${ perPage }, 1fr); gap: 1em; }`;
		}

		style += `${containerSelector} > *:not(`;
		for ( let i = 1; i <= perPage; i++ ) {
			style += `:nth-child(${ currentItemIndex + i }), `;
		}
		style = style.slice( 0, -2 ) + ')'; // Slice to remove trailing comma and space.
		style += '{ display: none; }';

		styleRef.current.innerHTML = `${style}`;
	}, [ currentItemIndex, styleRef, parentBlockId, perPage ] );

	return (
		<>
			<style ref={ styleRef } />
			<div { ...innerBlockProps } />
		</>
	);
}

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
	perPage: PropTypes.number,
};

export default InnerBlocksDisplaySingle;
