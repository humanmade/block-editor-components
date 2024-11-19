import {
	DateTimePicker,
	BaseControl,
	Popover,
	Button,
} from '@wordpress/components';
import { gmdate, date, getSettings as getDateSettings } from '@wordpress/date';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import TimeZone from './timezone';

/**
 * DateTimeControl component.
 *
 * @param {object} props - Component properties.
 * @param {string} props.label - The label for the date/time control.
 * @param {string} props.id - The ID for the base control.
 * @param {Function} props.onChange - Callback function to handle date/time change.
 * @param {string} props.value - The current date/time value in UTC format.
 *
 * @returns {ReactNode|null} The DateTimeControl component.
 */
function DateTimeControl( { label, id, onChange, value } ) {
	const [ isDatePickerVisible, setIsDatePickerVisible ] = useState( false );
	const dateSettings = getDateSettings();

	/**
	 * Convert a date string in the current site local time into a UTC formatted as a MySQL date.
	 *
	 * @param {string} localDateString Local date.
	 * @returns {string} UTC formatted as a MySQL date.
	 */
	const convertToUTC = ( localDateString ) => {
		const localDate = wp.date.getDate( localDateString );
		return gmdate( 'Y-m-d H:i:s', localDate );
	};

	/**
	 * Convert a UTC date in MySQL format into a date string localised to the current site timezone.
	 *
	 * @param {string} utcDateString UTC date string.
	 * @param {string} format Format of returned date.
	 * @returns {string|null} Localised date string.
	 */
	const convertFromUTC = ( utcDateString, format = 'Y-m-d H:i:s' ) => {
		const utcDate = new Date( utcDateString + ' +00:00' );

		if ( utcDate instanceof Date && ! isNaN( utcDate ) ) {
			return date( format, utcDate );
		}

		return null;
	};

	return (
		<BaseControl id={ id } label={ label }>
			{ value && (
				<p>
					{ convertFromUTC( value, dateSettings.formats.datetime ) }
					<TimeZone />
				</p>
			) }

			<Button
				variant="link"
				onClick={ () =>
					setIsDatePickerVisible( ! isDatePickerVisible ) }
			>
				{ __( 'Edit webinar start time/date', 'block-editor-components' ) }
			</Button>

			{ isDatePickerVisible && (
				<Popover
					onFocusOutside={ () =>
						setIsDatePickerVisible( ! isDatePickerVisible ) }
				>
					<div style={ { padding: '1.5em' } }>
						<DateTimePicker
							currentDate={ convertFromUTC( value ) || '' }
							is12Hour={ false }
							onChange={ ( newValue ) =>
								onChange( convertToUTC( newValue ) ) }
						/>
						<Button
							size="small"
							style={ { marginTop: '1em' } }
							variant="primary"
							onClick={ () =>
								setIsDatePickerVisible( ! isDatePickerVisible ) }
						>
							{ __( 'Done', 'block-editor-components' ) }
						</Button>
					</div>
				</Popover>
			) }
		</BaseControl>
	);
}

export default DateTimeControl;
