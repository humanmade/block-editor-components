import PropTypes from 'prop-types';
import { ReactNode, useState, useRef, useEffect } from 'react';

import { createBlock } from '@wordpress/blocks';
import { useSelect, useDispatch } from '@wordpress/data';

import InnerBlocksDisplaySingle from './inner-block-single-display';
import Navigation from './navigation';

/**
 * InnerBlockSlider component.
 *
 * @param {object} props - Component props.
 * @returns {ReactNode} Component.
 */
const InnerBlockSlider = ( props ) => {
	const {
		parentBlockId,
		allowedBlock,
		slideLimit,
	} = props;

	// Get all child blocks.
	const slideBlocks = useSelect(
		( select ) => select( 'core/block-editor' ).getBlock( parentBlockId ).innerBlocks
	);

	// Store currently selected slide in state.
	const [ currentSlideIndex, setCurrentSlideIndex ] = useState( 0 );

	// Track state in a ref, to allow us to determine if slides are added or removed.
	const slideCount = useRef( slideBlocks.length );

	const { insertBlock } = useDispatch( 'core/block-editor' );

	/**
	 * Add new slide.
	 * Create a new instance of the allowed child block type and append.
	 */
	const addSlide = () => {
		const created = createBlock( allowedBlock );
		insertBlock( created, undefined, parentBlockId );
	};

	/**
	 * If a slide is added, switch to the new slide. If one is deleted, make sure we don't
	 * show a non-existent slide.
	 */
	useEffect( () => {
		if ( slideBlocks.length > slideCount.current ) {
			// Slide added
			setCurrentSlideIndex( slideBlocks.length - 1 );
		} else if ( slideBlocks.length < slideCount.current ) {
			// Slide deleted
			if ( currentSlideIndex + 1 > slideBlocks.length ) {
				setCurrentSlideIndex( slideBlocks.length - 1 );
			}
		}

		// Update ref with new value..
		slideCount.current = slideBlocks.length;
	}, [ slideBlocks.length, currentSlideIndex, slideCount ] );

	return (
		<div className="hm-inner-block-slider">
			<InnerBlocksDisplaySingle
				allowedBlocks={ [ allowedBlock ] }
				className="slides"
				currentSlideIndex={ currentSlideIndex }
				parentBlockId={ parentBlockId }
				template={ [ allowedBlock ] }
			/>

			<Navigation
				addSlide={ addSlide }
				addSlideEnabled={ slideBlocks.length < slideLimit }
				currentPage={ currentSlideIndex + 1 }
				nextEnabled={ currentSlideIndex + 1 < slideBlocks.length }
				prevEnabled={ currentSlideIndex + 1 > 1 }
				setCurrentSlide={ page => setCurrentSlideIndex( page - 1 ) }
				totalSlides={ slideBlocks.length }
			/>
		</div>
	);
};

InnerBlockSlider.defaultProps = {
	slideLimit: 10,
};

InnerBlockSlider.propTypes = {
	parentBlockId: PropTypes.string.isRequired,
	allowedBlock: PropTypes.string.isRequired,
};

export default InnerBlockSlider;
