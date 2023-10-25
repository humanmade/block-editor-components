import { useState } from 'react';

import InnerBlockSlider from './inner-block-slider.js';

/**
 * InnerBlockSlider container component.
 *
 * This container component is recommended for typical usage, as it handles state management.
 * However for further info on supported props, refer to the InnerBlockSlider component, as all props are passed through.
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
