import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ReactNode } from 'react';

import { Button, IconButton } from '@wordpress/components';

/**
 * Inner Block Slider Navigation component.
 *
 * @param {object} props Props
 * @param {number} props.totalSlides Total pages.
 * @param {number} props.currentSlide Current pages.
 * @param {Function} props.setCurrentSlide Set current page.
 * @param {boolean} props.prevEnabled Is previous page enabled.
 * @param {boolean} props.nextEnabled Is Next button enabled.
 * @param {Function} props.addSlide Add slide callback.
 * @param {boolean} props.addSlideEnabled Is add slide button enabled.
 * @returns {ReactNode} Component.
 */
function Navigation( {
	totalSlides,
	currentSlide,
	setCurrentSlide,
	prevEnabled,
	nextEnabled,
	addSlide = () => {},
	addSlideEnabled = false,
} ) {
	return (
		<div className="hm-inner-block-slider__navigation">
			<IconButton
				disabled={ ! prevEnabled }
				icon="arrow-left-alt2"
				isSecondary
				isSmall
				onClick={ () => {
					if ( prevEnabled ) {
						setCurrentSlide( currentSlide - 1 );
					}
				} }
			/>
			{ [ ...Array( totalSlides ).keys() ].map( ( i ) => (
				<Button
					key={ i + 1 }
					aria-label={ `Slide ${i + 1}` }
					className={ classNames( 'components-button', 'is-not-small', {
						'is-primary': currentSlide === i + 1,
						'is-secondary': currentSlide !== i + 1,
					} ) }
					type="button"
					onClick={ () => {
						setCurrentSlide( i + 1 );
					} }
				>{ i + 1 }</Button>
			) ) }
			<IconButton
				disabled={ ! nextEnabled }
				icon="arrow-right-alt2"
				isSecondary
				isSmall
				onClick={ () => {
					if ( nextEnabled ) {
						setCurrentSlide( currentSlide + 1 );
					}
				} }
			/>
			<IconButton
				disabled={ ! addSlideEnabled }
				icon="plus-alt2"
				isSecondary
				isSmall
				onClick={ () => addSlide() }
			/>
		</div>
	);
}

Navigation.propTypes = {
	totalSlides: PropTypes.number.isRequired,
	currentSlide: PropTypes.number.isRequired,
	setCurrentSlide: PropTypes.func.isRequired,
	prevEnabled: PropTypes.bool.isRequired,
	nextEnabled: PropTypes.bool.isRequired,
	addSlide: PropTypes.func,
	addSlideEnabled: PropTypes.bool,
};

export default Navigation;
