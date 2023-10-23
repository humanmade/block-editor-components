import PropTypes from 'prop-types';
import { useState, useRef, useEffect, useCallback } from 'react';

import { createBlock } from '@wordpress/blocks';
import { useSelect, useDispatch } from '@wordpress/data';

import InnerBlocksDisplaySingle from './inner-block-single-display';
import Navigation from './navigation';

/**
 * InnerBlockSlider component.
 *
 * @param {object} props               Component props.
 * @param {string} props.parentBlockId Parent block clientId.
 * @param {string} props.allowedBlock  Allowed block type.
 * @param {Array}  props.template      Initial block template.
 * @param {number} props.slideLimit    Maximum allowed slides.
 * @returns {React.ReactNode} Component.
 */
const InnerBlockSlider = ( {
	parentBlockId,
	allowedBlock,
	template,
	slideLimit,
} ) => {
	const innerBlockTemplate = template || [ [ allowedBlock ] ];

	const slideBlocks = useSelect(
		( select ) =>
			select( 'core/block-editor' ).getBlock( parentBlockId ).innerBlocks
	);

	const selectedBlockId = useSelect( ( select ) => select( 'core/block-editor' ).getSelectedBlockClientId() );
	const { selectBlock } = useDispatch( 'core/block-editor' );

	const [ currentItemIndex, setCurrentItemIndexState ] = useState( 0 );

	/**
	 * Update current item indx.
	 *
	 * Handles setting state and selecting the block.
	 *
	 * @param {number} newIndex New Index.
	 */
	const updateCurrentItemIndex = useCallback( ( newIndex ) => {
		setCurrentItemIndexState( newIndex );
		selectBlock( slideBlocks[ newIndex ].clientId );
	}, [ setCurrentItemIndexState, selectBlock, slideBlocks ] );

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
			updateCurrentItemIndex( slideBlocks.length - 1 );
		} else if ( slideBlocks.length < slideCount.current ) {
			// Slide deleted
			if ( currentItemIndex + 1 > slideBlocks.length ) {
				updateCurrentItemIndex( slideBlocks.length - 1 );
			}
		}

		// Update ref with new value..
		slideCount.current = slideBlocks.length;
	}, [ slideBlocks.length, currentItemIndex, slideCount, selectBlock, updateCurrentItemIndex ] );

	/**
	 * If the selected block ID changes, and matches a
	 */
	useEffect( () => {
		const found = slideBlocks.findIndex( ( block ) => block.clientId === selectedBlockId );

		if ( found >= 0 ) {
			updateCurrentItemIndex( found );
		}
	}, [ selectedBlockId, slideBlocks, updateCurrentItemIndex ] );

	return (
		<div className="inner-block-slider">
			<InnerBlocksDisplaySingle
				allowedBlocks={ [ allowedBlock ] }
				className="slides"
				currentItemIndex={ currentItemIndex }
				parentBlockId={ parentBlockId }
				template={ innerBlockTemplate }
			/>

			<Navigation
				addSlide={ addSlide }
				addSlideEnabled={ slideBlocks.length < slideLimit }
				currentPage={ currentItemIndex + 1 }
				nextEnabled={ currentItemIndex + 1 < slideBlocks.length }
				prevEnabled={ currentItemIndex + 1 > 1 }
				setCurrentPage={ ( page ) => updateCurrentItemIndex( page - 1 ) }
				totalPages={ slideBlocks.length }
			/>
		</div>
	);
};

InnerBlockSlider.defaultProps = {
	slideLimit: 10,
	template: null,
};

InnerBlockSlider.propTypes = {
	parentBlockId: PropTypes.string.isRequired,
	allowedBlock: PropTypes.string.isRequired,
	template: PropTypes.array,
};

export default InnerBlockSlider;
