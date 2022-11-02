# Option Utils

The Option Utils API provides functions specific to options data (e.g., for a [`SelectControl`](https://github.com/WordPress/gutenberg/blob/trunk/packages/components/src/select-control/index.tsx) component).

- [`createOptionFromPost`](#createoptionfrompost)
- [`createOptionFromTerm`](#createoptionfromterm)
- [`createOptionsFromPosts`](#createoptionsfromposts)
- [`createOptionsFromPostsWithHierarchy`](#createoptionsfrompostswithhierarchy)
- [`createOptionsFromTerms`](#createoptionsfromterms)
- [`createOptionsFromTermsWithHierarchy`](#createoptionsfromtermswithhierarchy)

## `createOptionFromPost`

The `createOptionFromPost` function allows for creating an option data object to be used with `SelectControl` for the given post object.

### Usage

Pass a post object to `createOptionFromPost`, and then use the returned option data object.

```js
function Plugin( props ) {
	const { onChange, post } = props;

	return (
		<SelectControl
			options={ [
				{
					label: '',
					value: '',
				},
				createOptionFromPost( post ),
			] }
			onChange={ onChange }
		/>
	);
}
```

Optionally, you can also pass a prefix as second argument, which will be used to prefix the label.
Usually, you wouldn't do this manually, but instead use something like `createOptionsFromPostsWithHierarchy`, which will specify and use the prefix internally.

### Signature

```js
// createOptionFromPost :: ( post: object, prefix?: string ) => { label: string, value: string }
const option = createOptionFromPost( post );
```

### Parameters

#### `post`

A post data object, with `id` and `title.rendered` as required properties.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `object`                             | yes                                  | `undefined`                          |

#### `prefix`

An optional label prefix.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `string`                             | no                                   | `''`                                 |

### Return

The `createOptionFromPost` function returns an object with the ID and the title of the given post as `value` and `label` property, respectively.
The option data is intended to be used with `SelectControl`.

```js
const option = createOptionFromPost( post );
```

## `createOptionFromTerm`

The `createOptionFromTerm` function allows for creating an option data object to be used with `SelectControl` for the given term object.

### Usage

Pass a term object to `createOptionFromTerm`, and then use the returned option data object.

```js
function Plugin( props ) {
	const { onChange, term } = props;

	return (
		<SelectControl
			options={ [
				{
					label: '',
					value: '',
				},
				createOptionFromTerm( term ),
			] }
			onChange={ onChange }
		/>
	);
}
```

Optionally, you can also pass a prefix as second argument, which will be used to prefix the label.
Usually, you wouldn't do this manually, but instead use something like `createOptionsFromTermsWithHierarchy`, which will specify and use the prefix internally.

### Signature

```js
// createOptionFromTerm :: ( term: object, prefix?: string ) => { label: string, value: string }
const option = createOptionFromTerm( term );
```

### Parameters

#### `term`

A term data object, with `id` and `name` as required properties.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `object`                             | yes                                  | `undefined`                          |

#### `prefix`

An optional label prefix.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `string`                             | no                                   | `''`                                 |

### Return

The `createOptionFromTerm` function returns an object with the ID and the name of the given term as `value` and `label` property, respectively.
The option data is intended to be used with `SelectControl`.

```js
const option = createOptionFromTerm( term );
```

## `createOptionsFromPosts`

The `createOptionsFromPosts` function allows for creating an array of option data objects to be used with `SelectControl` for the given array of post objects.

### Usage

Pass an array of post objects to `createOptionsFromPosts`, and then use the returned options data array.

```js
function Plugin( props ) {
	const { onChange, posts } = props;

	return (
		<SelectControl
			options={ createOptionsFromPosts( posts ) }
			onChange={ onChange }
		/>
	);
}
```

### Signature

```js
// createOptionsFromPosts :: ( posts: object[] ) => { label: string, value: string }[]
const options = createOptionsFromPosts( posts );
```

### Parameters

#### `posts`

An array of post data objects, each with `id` and `title.rendered` as required properties.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `object[]`                           | yes                                  | `undefined`                          |

### Return

The `createOptionsFromPosts` function returns an array of objects with the ID and the title of the given post as `value` and `label` property, respectively.
The options data is intended to be used with `SelectControl`.

```js
const options = createOptionsFromPosts( posts );
```

## `createOptionsFromPostsWithHierarchy`

The `createOptionsFromPostsWithHierarchy` function allows for creating an array of option data objects to be used with `SelectControl` for the given array of post objects.
The difference to `createOptionsFromPosts` is that `createOptionsFromPostsWithHierarchy` handles the `children` property of each post object, and visually shows the hierarchy by using a customizable prefix.

### Usage

Pass an array of post objects to `createOptionsFromPostsWithHierarchy`, and then use the returned options data array.

```js
function Plugin( props ) {
	const { onChange, posts } = props;

	return (
		<SelectControl
			options={ createOptionsFromPostsWithHierarchy( posts ) }
			onChange={ onChange }
		/>
	);
}
```

Optionally, you can pass a prefix as second argument; the default value is `'— '`, and it is repeated for each nesting level.

```js
function Plugin( props ) {
	const { onChange, posts } = props;

	return (
		<SelectControl
			options={ createOptionsFromPostsWithHierarchy( posts, '  ' ) }
			onChange={ onChange }
		/>
	);
}
```

### Signature

```js
// createOptionsFromPostsWithHierarchy :: ( posts: object[], prefix?: string, level?: number ) => { label: string, value: string }[]
const options = createOptionsFromPostsWithHierarchy( posts, prefix, level );
```

### Parameters

#### `posts`

An array of post data objects, each with `id` and `title.rendered` as required properties.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `object[]`                           | yes                                  | `undefined`                          |

#### `prefix`

An optional label prefix.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `string`                             | no                                   | `'— '`                               |

#### `level`

The nesting level, used for repeating the optional prefix.
Usually, you wouldn't specify this manually.
The `createOptionsFromTermsWithHierarchy` recursive function is using this internally.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `number`                             | no                                   | `0`                                  |

### Return

The `createOptionsFromPostsWithHierarchy` function returns an array of objects with the ID and the title of the given post as `value` and `label` property, respectively.
The options data is intended to be used with `SelectControl`.

```js
const options = createOptionsFromPostsWithHierarchy( posts, prefix, level );
```

## `createOptionsFromTerms`

The `createOptionsFromTerms` function allows for creating an array of option data objects to be used with `SelectControl` for the given array of term objects.

### Usage

Pass an array of term objects to `createOptionsFromTerms`, and then use the returned options data array.

```js
function Plugin( props ) {
	const { onChange, terms } = props;

	return (
		<SelectControl
			options={ createOptionsFromTerms( terms ) }
			onChange={ onChange }
		/>
	);
}
```

### Signature

```js
// createOptionsFromTerms :: ( terms: object[] ) => { label: string, value: string }[]
const options = createOptionsFromTerms( terms );
```

### Parameters

#### `terms`

An array of term data objects, each with `id` and `name` as required properties.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `object[]`                           | yes                                  | `undefined`                          |

### Return

The `createOptionsFromTerms` function returns an array of objects with the ID and the name of the given term as `value` and `label` property, respectively.
The options data is intended to be used with `SelectControl`.

```js
const options = createOptionsFromTerms( terms );
```

## `createOptionsFromTermsWithHierarchy`

The `createOptionsFromTermsWithHierarchy` function allows for creating an array of option data objects to be used with `SelectControl` for the given array of term objects.
The difference to `createOptionsFromTerms` is that `createOptionsFromTermsWithHierarchy` handles the `children` property of each term object, and visually shows the hierarchy by using a customizable prefix.

### Usage

Pass an array of term objects to `createOptionsFromTermsWithHierarchy`, and then use the returned options data array.

```js
function Plugin( props ) {
	const { onChange, terms } = props;

	return (
		<SelectControl
			options={ createOptionsFromTermsWithHierarchy( terms ) }
			onChange={ onChange }
		/>
	);
}
```

Optionally, you can pass a prefix as second argument; the default value is `'— '`, and it is repeated for each nesting level.

```js
function Plugin( props ) {
	const { onChange, terms } = props;

	return (
		<SelectControl
			options={ createOptionsFromTermsWithHierarchy( terms, '  ' ) }
			onChange={ onChange }
		/>
	);
}
```

### Signature

```js
// createOptionsFromTermsWithHierarchy :: ( terms: object[], prefix?: string, level?: number ) => { label: string, value: string }[]
const options = createOptionsFromTermsWithHierarchy( terms, prefix, level );
```

### Parameters

#### `terms`

An array of term data objects, each with `id` and `name` as required properties.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `object[]`                           | yes                                  | `undefined`                          |

#### `prefix`

An optional label prefix.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `string`                             | no                                   | `'— '`                               |

#### `level`

The nesting level, used for repeating the optional prefix.
Usually, you wouldn't specify this manually.
The `createOptionsFromTermsWithHierarchy` recursive function is using this internally.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `number`                             | no                                   | `0`                                  |

### Return

The `createOptionsFromTermsWithHierarchy` function returns an array of objects with the ID and the name of the given term as `value` and `label` property, respectively.
The options data is intended to be used with `SelectControl`.

```js
const options = createOptionsFromTermsWithHierarchy( terms, prefix, level );
```
