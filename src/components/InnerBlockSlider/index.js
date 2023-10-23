import PropTypes from 'prop-types';
import { useState, useRef, useEffect, useMemo } from 'react';

import { createBlock } from '@wordpress/blocks';
import { useSelect, useDispatch } from '@wordpress/data';

import InnerBlocksDisplaySingle from './inner-block-single-display';
import Navigation from './navigation';

/**
 * InnerBlockSlider component.
 *
 * @param {object} props                               Component props.
 * @param {string} props.parentBlockId                 Parent block clientId.
 * @param {string} props.allowedBlock                  Allowed block type.
 * @param {Array}  props.template                      Initial block template.
 * @param {number} props.slideLimit                    Maximum allowed slides.
 * @param {number} props.externalCurrentItemIndex      Override current index, if managing this externally.
 * @param {Function} props.setExternalCurrentItemIndex Override set item Index
 * @returns {React.ReactNode} Component.
 */
const InnerBlockSlider = ( {
	parentBlockId,
	allowedBlock,
	template,
	slideLimit,
	externalCurrentItemIndex = null,
	setExternalCurrentItemIndex = null,
} ) => {
	const innerBlockTemplate = template || [ [ allowedBlock ] ];

	const slideBlocks = useSelect(
		( select ) =>
			select( 'core/block-editor' ).getBlock( parentBlockId ).innerBlocks
	);

	const [ internalCurrentItemIndex, setInternalCurrentItemIndex ] = useState( 0 );

	// Current Item Index is either the internally managed index, OR the externally managed state.
	const currentItemIndex = useMemo( () => {
		return ( externalCurrentItemIndex !== null ) ? externalCurrentItemIndex : internalCurrentItemIndex;
	}, [ externalCurrentItemIndex, internalCurrentItemIndex ] );

	// Update current item index. Either the internally managed or externally managed state.
	const setCurrentItemIndex = useMemo( () => {
		return ( setExternalCurrentItemIndex !== null ) ? setExternalCurrentItemIndex : setInternalCurrentItemIndex;
	}, [ setExternalCurrentItemIndex, setInternalCurrentItemIndex ] );

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

			<Navigation
				addSlide={ addSlide }
				addSlideEnabled={ slideBlocks.length < slideLimit }
				currentPage={ currentItemIndex + 1 }
				nextEnabled={ currentItemIndex + 1 < slideBlocks.length }
				prevEnabled={ currentItemIndex + 1 > 1 }
				setCurrentPage={ ( page ) => setCurrentItemIndex( page - 1 ) }
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
