# ConditionalComponent

The `ConditionalComponent` component allows for conditionally rendering passed content, based on the return value of executing a given predicate function.
This can be useful in a number of situations, for example, when conditionally rendering a single component (i.e., don't render anything if the check fails).
Or you can render one or the other component, based on the provided predicate function.

## Usage

For a minimum working setup, meaning you want to conditionally render some content, you would wrap it in `ConditionalComponent`, which you pass a callback to determining whether the component should display, plus any additional props relevant for the component and/or the predicate.
The component will then pass these additional props to the predicate function.

```js
import { ConditionalComponent } from '@humanmade/block-editor-components';

function BlockEdit( props ) {
	const { attributes } = props;
	const { votes } = attributes;

	return (
		<ConditionalComponent
			predicate={ ( { votes } ) => votes >= 100 }
			votes={ votes }
		>
			<p>This is really useful content!</p>
		</ConditionalComponent>
	);
}
```

Instead of wrapping content (i.e., passing it as `children`), you can also pass a component (function) as `ComponentTrue` prop.

```js
import { ConditionalComponent } from '@humanmade/block-editor-components';

function BlockEdit( props ) {
	const { attributes } = props;
	const { votes } = attributes;

	return (
		<ConditionalComponent
			ComponentTrue={ () => <p>This is really useful content!</p> }
			predicate={ ( { votes } ) => votes >= 100 }
			votes={ votes }
		/>
	);
}
```

This will behave exactly as the first example.

Optionally, you can also pass a component to render in case the predicate returns a falsy value.

```js
import { ConditionalComponent } from '@humanmade/block-editor-components';

function BlockEdit( props ) {
	const { attributes } = props;
	const { votes } = attributes;

	return (
		<ConditionalComponent
			ComponentFalse={ () => <p>This is good content.</p> }
			ComponentTrue={ () => <p>This is really useful content!</p> }
			predicate={ ( { votes } ) => votes >= 100 }
			votes={ votes }
		/>
	);
}
```

Instead of passing an inline component, you can also pass a constructor/reference.

```js
import { ConditionalComponent } from '@humanmade/block-editor-components';

import { Welcome, WelcomeBack } from './components';

function BlockEdit() {
	return (
		<ConditionalComponent
			ComponentFalse={ Welcome }
			ComponentTrue={ WelcomeBack }
			predicate={ ( { userName } ) => userName?.trim() }
			userName={ localStorage.getItem( 'userName' ) }
		/>
	);
}
```

## Props

Any additional props will get passed to both the predicate function and the component that is rendered.
Wrapped content (i.e., anything passed as `children`) will not receive any props.

### `children`

Content to conditionally display, given the predicate function returns true.
Please note that if you pass both `ComponentTrue` and `children`, the component will default to rendering the former.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `ReactNode`                          | no                                   | `null`                               |

### `ComponentFalse`

Optional component to render in case the predicate returns false.
Any additional props passed to `ConditionalComponent` will be passed to `ComponentFalse`.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `Function`                           | no                                   | `() => null`                         |

### `ComponentTrue`

Component to render in case the predicate returns true.
Any additional props passed to `ConditionalComponent` will be passed to `ComponentTrue`.
Please note that if you pass both `ComponentTrue` and `children`, the component will default to rendering the former.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `Function`                           | no                                   | `() => props.children`               |

### `predicate`

The post type slug that the wrapped content should be displayed for.
Please note that `predicate` will get passed any additional props passed to `ConditionalComponent`.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `Function`                           | yes                                  | `undefined`                          |
