import { useState } from 'react';

import InnerBlockSlider from './inner-block-slider.js';

/**
 * InnerBlockSlider container component.
 *
 * @param {object} props      Component props.
 * @returns {React.ReactNode} Component.
 */
const InnerBlockSliderContainer = ( props ) => {
	const [ currentItemIndex, setCurrentItemIndex ] = useState( 0 );

	return (
		<InnerBlockSlider
			{ ...props }
			currentItemIndex={ currentItemIndex }
			setCurrentItemIndex={ setCurrentItemIndex }
		/>
	);
};

export default InnerBlockSliderContainer;
