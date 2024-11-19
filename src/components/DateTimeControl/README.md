# DateTimeControl

The `DateTimeControl` component provides a date and time picker with timezone information.

## Props

- `label` (string): The label for the date/time control.
- `id` (string): The ID for the base control.
- `onChange` (Function): Callback function to handle date/time change.
- `value` (string): The current date/time value in UTC format.

## Usage

```js
import DateTimeControl from './components/datetime-control';

...

<DateTimeControl
	label={ __( 'Event Start time/date', 'my-project' ) }
	id="example-start-time-date"
	value={ eventStart }
	onChange={ ( newValue ) =>
		setAttributes( { eventStart: newValue } )
	}
/>
```
