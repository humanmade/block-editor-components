# Variation Utils

The Variation Utils API provides functions specific to block variations.

- [`withActiveVariation`](#withactivevariation)

## `withActiveVariation`

The `withActiveVariation` function allows for comfortably injecting an `isActive` callback into all block variations in the given settings object.
The validation works based on one or more attribute names, and it returns true if the attribute values of the current block and a variation for all supplied attribute names match, and false otherwise.

### Usage

Pass a block settings object and one or more attribute names to `withActiveVariation`, and then use the returned settings object.
You would usually do this in your block's `index.jsx?` file, where you would read block settings, including variation data, from the `block.json` file.

```js
import { withActiveVariation } from '@humanmade/block-editor-components';

import metadata from './block.json';
import edit from './edit';
import save from './save';

export const { name } = metadata;

export const settings = {
	...withActiveVariation( metadata, 'sectionType' ),
	edit,
	save,
};
```

The above code would be useful with a `variations` section defined in `block.json` similar to the folling:

```json
{
	"variations": [
		{
			"name": "standard",
			"title": "Cards - Standard",
			"isDefault": true,
			"attributes": {
				"sectionType": "standard"
			}
		},
		{
			"name": "feature",
			"title": "Cards - Feature",
			"attributes": {
				"sectionType": "feature"
			}
		},
		{
			"name": "promo",
			"title": "Cards - Promo",
			"attributes": {
				"sectionType": "promo"
			}
		}
	]
}
```

### Signature

```js
// withActiveVariation :: ( settings: object, ...attributeNames: string[] ) => object
const settingsWithActiveVariation = withActiveVariation( settings, attributeNames );
```

### Parameters

#### `settings`

A block settings object.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `object`                             | yes                                  | `undefined`                          |

#### `attributeNames`

One or more attribute names, provided as individual (rest) arguments.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `string`                             | yes                                  | `undefined`                          |

### Return

The `withActiveVariation` function returns the given block settings object with the injected `isActive` function, internally using the supplied attribute names to determine which variation is the currently active one.

```js
const settingsWithActiveVariation = withActiveVariation( settings, attributeNames );
```
