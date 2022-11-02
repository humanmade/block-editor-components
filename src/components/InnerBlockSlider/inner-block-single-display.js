import PropTypes from 'prop-types';
import { ReactNode, useRef, useEffect } from 'react';

import { useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * InnerBlockSlider Single display component.
 *
 * Displays just a single child and hiding the others.
 * Used by the inner block slider.
 *
 * @param {object} props Component props.
 * @returns {ReactNode} Component.
 */
function InnerBlocksDisplaySingle( props ) {
	const {
		className,
		allowedBlocks,
		template,
		currentSlideIndex,
		parentBlockId,
		renderAppender,
		captureToolbars,
	} = props;

	const styleRef = useRef();

	const innerBlockProps = useInnerBlocksProps( {
		id: `inner-block-display-single-${ parentBlockId}`,
		className,
	},
	{
		__experimentalCaptureToolbars: captureToolbars,
		allowedBlocks,
		orientation: 'horizontal',
		renderAppender,
		template,
		templateLock: false,
	} );

	useEffect( () => {
		if ( ! styleRef.current ) {
			return;
		}

		styleRef.current.innerHTML = `#inner-block-display-single-${ parentBlockId } > *:not(:nth-child(${ currentSlideIndex + 1 }) ) { display: none; }`;
	}, [ currentSlideIndex, styleRef, parentBlockId ] );

	return (
		<>
			<style ref={ styleRef } />
			<div { ...innerBlockProps } />
		</>
	);
}

InnerBlocksDisplaySingle.defaultProps = {
	currentSlideIndex: 0,
	renderAppender: false,
	captureToolbars: true,
};

InnerBlocksDisplaySingle.propTypes = {
	parentBlockId: PropTypes.string.isRequired,
	allowedBlocks: PropTypes.arrayOf( PropTypes.string ).isRequired,
	template: PropTypes.array,
	className: PropTypes.string,
	currentSlideIndex: PropTypes.number,
	renderAppender: PropTypes.oneOfType( [ PropTypes.bool, PropTypes.element ] ),
};

export default InnerBlocksDisplaySingle;
