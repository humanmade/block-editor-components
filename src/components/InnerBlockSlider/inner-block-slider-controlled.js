import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';

import { createBlock } from '@wordpress/blocks';
import { useSelect, useDispatch } from '@wordpress/data';

import InnerBlocksDisplaySingle from './inner-block-single-display';
import Navigation from './navigation';

/**
 * InnerBlockSlider component.
 *
 * @param {object} props                       Component props.
 * @param {string} props.parentBlockId         Parent block clientId.
 * @param {string} props.allowedBlock          Allowed block type.
 * @param {Array}  props.template              Initial block template.
 * @param {number} props.slideLimit            Maximum allowed slides.
 * @param {number} props.currentItemIndex      Override current index, if managing this externally.
 * @param {Function} props.setCurrentItemIndex Override set item Index
 * @param {Function} props.showNavigation      Override display nav
 * @returns {React.ReactNode} Component.
 */
const InnerBlockSliderControlled = ( {
	parentBlockId,
	allowedBlock,
	template,
	slideLimit,
	currentItemIndex,
	setCurrentItemIndex,
	showNavigation,
} ) => {
	const innerBlockTemplate = template || [ [ allowedBlock ] ];

	const slideBlocks = useSelect( ( select ) => select( 'core/block-editor' ).getBlock( parentBlockId ).innerBlocks );

	// Track state in a ref, to allow us to determine if slides are added or removed.
	const slideCount = useRef( slideBlocks.length );

	const { insertBlock } = useDispatch( 'core/block-editor' );

	/**
	 * Function to add a new slide to the group of slides.
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
			const newIndex = slideBlocks.length - 1;
			setCurrentItemIndex( newIndex );
		} else if ( slideBlocks.length < slideCount.current ) {
			// Slide deleted
			if ( currentItemIndex + 1 > slideBlocks.length ) {
				const newIndex = slideBlocks.length - 1;
				setCurrentItemIndex( newIndex );
			}
		}

		// Update ref with new value..
		slideCount.current = slideBlocks.length;
	}, [ slideBlocks.length, currentItemIndex, slideCount, setCurrentItemIndex ] );

	return (
		<div className="inner-block-slider">
			<InnerBlocksDisplaySingle
				allowedBlocks={ [ allowedBlock ] }
				className="slides"
				currentItemIndex={ currentItemIndex }
				parentBlockId={ parentBlockId }
				template={ innerBlockTemplate }
			/>

			{ showNavigation && (
				<Navigation
					addSlide={ addSlide }
					addSlideEnabled={ slideBlocks.length < slideLimit }
					currentPage={ currentItemIndex + 1 }
					nextEnabled={ currentItemIndex + 1 < slideBlocks.length }
					prevEnabled={ currentItemIndex + 1 > 1 }
					setCurrentPage={ ( page ) => setCurrentItemIndex( page - 1 ) }
					totalPages={ slideBlocks.length }
				/> ) }
		</div>
	);
};

InnerBlockSliderControlled.defaultProps = {
	slideLimit: 10,
	template: null,
	showNavigation: true,
};

InnerBlockSliderControlled.propTypes = {
	parentBlockId: PropTypes.string.isRequired,
	allowedBlock: PropTypes.string.isRequired,
	template: PropTypes.array,
	showNavigation: PropTypes.bool,
	currentItemIndex: PropTypes.number.isRequired,
	setCurrentItemIndex: PropTypes.func.isRequired,
};

export default InnerBlockSliderControlled;
