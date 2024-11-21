import { Tooltip } from '@wordpress/components';
import { getSettings as getDateSettings } from '@wordpress/date';
import { __ } from '@wordpress/i18n';

/**
 * TimeZone component.
 *
 * This component determines the user's timezone offset and compares it with the system timezone offset.
 * If they match, it returns null. Otherwise, it displays the timezone abbreviation and details in a tooltip.
 *
 * @returns {React.ReactNode|null} The timezone abbreviation and details in a tooltip, or null if the user's timezone matches the system timezone.
 */
const TimeZone = () => {
	const { timezone } = getDateSettings();

	// Convert timezone offset to hours.
	const userTimezoneOffset = -1 * ( new Date().getTimezoneOffset() / 60 );

	// System timezone and user timezone match, nothing needed.
	// Compare as numbers because it comes over as string.
	if ( Number( timezone.offset ) === userTimezoneOffset ) {
		return null;
	}

	const offsetSymbol = Number( timezone.offset ) >= 0 ? '+' : '';
	const zoneAbbr =
		timezone.abbr !== '' && isNaN( Number( timezone.abbr ) )
			? timezone.abbr
			: `UTC${ offsetSymbol }${ timezone.offsetFormatted }`;

	// Replace underscore with space in strings like `America/Costa_Rica`.
	const prettyTimezoneString = timezone.string.replace( '_', ' ' );

	const timezoneDetail =
		timezone.string === 'UTC'
			? __( 'Coordinated Universal Time' )
			: `(${ zoneAbbr }) ${ prettyTimezoneString }`;

	// When the prettyTimezoneString is empty, there is no additional timezone
	// detail information to show in a Tooltip.
	const hasNoAdditionalTimezoneDetail =
		prettyTimezoneString.trim().length === 0;

	return hasNoAdditionalTimezoneDetail ? (
		<>{ zoneAbbr }</>
	) : (
		<Tooltip placement="top" text={ timezoneDetail }>
			<span>{ zoneAbbr }</span>
		</Tooltip>
	);
};

export default TimeZone;
