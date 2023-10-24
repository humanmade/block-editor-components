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

	const {
		slideBlocks,
		selectedBlockId,
		hasSelectedInnerBlock,
	 } = useSelect(
		( select ) => {
			const blockEditorStore = select( 'core/block-editor' );
			return {
				slideBlocks: blockEditorStore.getBlock( parentBlockId ).innerBlocks,
				selectedBlockId: blockEditorStore.getSelectedBlockClientId(),
				hasSelectedInnerBlock: blockEditorStore.hasSelectedInnerBlock,
			};
		}
	);

	const { selectBlock } = useDispatch( 'core/block-editor' );
	const [ currentItemIndex, setCurrentItemIndexState ] = useState( 0 );

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
			setCurrentItemIndexState( slideBlocks.length - 1 );
			selectBlock( slideBlocks[ slideBlocks.length - 1 ].clientId );
		} else if ( slideBlocks.length < slideCount.current && currentItemIndex + 1 > slideBlocks.length ) {
			// Slide deleted
			setCurrentItemIndexState( slideBlocks.length - 1 );
			selectBlock( slideBlocks[ slideBlocks.length - 1 ].clientId );
		}

		// Update ref with new value..
		slideCount.current = slideBlocks.length;
	}, [ slideBlocks.length, currentItemIndex, slideCount, selectBlock, setCurrentItemIndexState, slideBlocks ] );

	/**
	 * If the selected block ID changes to either a slideBlock, or an Innerblock of a slide, focus that slide.
	 */
	useEffect( () => {
		const found = slideBlocks.findIndex( ( slideBlock ) => {
			return slideBlock.clientId === selectedBlockId || hasSelectedInnerBlock( slideBlock.clientId );
		} );

		if ( found >= 0 ) {
			setCurrentItemIndexState( found );
		}
	}, [ selectedBlockId, slideBlocks, setCurrentItemIndexState, hasSelectedInnerBlock ] );

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
