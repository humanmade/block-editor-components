# InnerBlockSlider

This component creates a horizontal slider with inner blocks inside of it.

This is useful when you are building a UI for a carousel, but don't want to use the actual frontend library within the editor.

## Usage

```js
import { InnerBlockSlider } from '@humanmade/block-editor-components';
const CarouselEdit = ({clientId}) => {
	<InnerBlockSlider
		allowedBlock="humanmade/carousel-slide"
		slideLimit={10}
		parentBlockId={clientId}
	/>
}
```

## Props

| Name            | Type           | Default | Description                                   |
| --------------- | -------------- | ------- | --------------------------------------------- |
| `allowedBlock`  | `string`       | `''`    | Block types to be allowed inside the slider   |
| `slideLimit`    | `integer`      | `10`    | Maximum number of slides.                     |
| `parentBlockId` | `string`       | `''`    | Client ID of parent block. This is required.  |


## Credit

This component is adapted from the [InnerBlockSlider component from 10up's Block Components]( https://github.com/10up/block-components/tree/develop/components/inner-block-slider).
