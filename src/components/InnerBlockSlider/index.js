import { useState } from 'react';

import InnerBlockSliderControlled from './inner-block-slider-controlled.js';

/**
 * InnerBlockSlider container component.
 *
 * This container component is recommended for typical usage, as it handles state management.
 * However for further info on supported props, refer to the InnerBlockSlider component, as all props are passed through.
 *
 * @param {object} props      Component props.
 * @returns {React.ReactNode} Component.
 */
const InnerBlockSlider = ( props ) => {
	const [ currentItemIndex, setCurrentItemIndex ] = useState( 0 );

	return (
		<InnerBlockSliderControlled
			{ ...props }
			currentItemIndex={ currentItemIndex }
			setCurrentItemIndex={ setCurrentItemIndex }
		/>
	);
};

// Make controlled component available for use.
InnerBlockSlider.Controlled = InnerBlockSliderControlled;

export default InnerBlockSlider;
