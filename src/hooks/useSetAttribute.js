import { useCallback } from 'react';

/**
 * Return a callback to set a specific attribute value.
 *
 * @param {string} attributeName - Block attribute name.
 * @param {Function} setAttributes - Block-specific callback to set attributes.
 * @param {*} [defaultValue] - Optional. Default value to set.
 * @returns {Function} Callback to set the value for the attribute with the given name.
 */
export default function useSetAttribute( attributeName, setAttributes, defaultValue ) {
	return useCallback(
		( value = defaultValue ) => setAttributes( {
			[attributeName]: value,
		} ),
		[ attributeName, defaultValue, setAttributes ]
	);
}
