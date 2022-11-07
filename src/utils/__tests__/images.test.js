import { getImageDataForSize } from '../images';

describe( 'getImageDataForSize', () => {

	const imageDataFromMediaLibrary = {
		height: 900,
		source_url: 'https://example.com/image-from-media-library.jpg',
		width: 1600,
	};

	const imageDataFromUpload = {
		height: 1080,
		url: 'https://example.com/image-from-upload.jpg',
		width: 1900,
	};

	const size = 'thumbnail';

	it( 'should return null for undefined', () => {
		const image = undefined;

		expect( getImageDataForSize( image, size ) ).toBe( null );
	} );

	it( 'should return null for null', () => {
		const image = null;

		expect( getImageDataForSize( image, size ) ).toBe( null );
	} );

	it( 'should return null for empty image', () => {
		const image = {};

		expect( getImageDataForSize( image, size ) ).toBe( null );
	} );

	it( 'should return null for empty image sizes', () => {
		const image = {
			sizes: {},
		};

		expect( getImageDataForSize( image, size ) ).toBe( null );
	} );

	it( 'should return null for empty image meta sizes', () => {
		const image = {
			media_details: {
				sizes: {},
			},
		};

		expect( getImageDataForSize( image, size ) ).toBe( null );
	} );

	it( 'should return null for missing image size', () => {
		const image = {
			sizes: {
				full: imageDataFromUpload,
			},
		};

		expect( getImageDataForSize( image, size ) ).toBe( null );
	} );

	it( 'should return null for missing image meta size', () => {
		const image = {
			media_details: {
				sizes: {
					full: imageDataFromMediaLibrary,
				},
			},
		};

		expect( getImageDataForSize( image, size ) ).toBe( null );
	} );

	it( 'should return correct data for image from media library', () => {
		const image = {
			media_details: {
				sizes: {
					[size]: imageDataFromMediaLibrary,
				},
			},
		};

		expect( getImageDataForSize( image, size ) ).toMatchObject( {
			height: 900,
			src: 'https://example.com/image-from-media-library.jpg',
			width: 1600,
		} );
	} );

	it( 'should return correct data for image from upload', () => {
		const image = {
			sizes: {
				[size]: imageDataFromUpload,
			},
		};

		expect( getImageDataForSize( image, size ) ).toMatchObject( {
			height: 1080,
			src: 'https://example.com/image-from-upload.jpg',
			width: 1900,
		} );
	} );

} );
