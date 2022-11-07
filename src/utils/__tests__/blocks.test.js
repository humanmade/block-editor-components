import { select } from '@wordpress/data';

import {
	findBlockByName,
	findInvalidBlock,
	findInvalidBlocks,
	findValidBlock,
	findValidBlocks,
} from '../blocks';

jest.mock( '@wordpress/data', () => ( {
	select: jest.fn( () => ( {} ) ),
} ) );

const galleryBlock = {
	name: 'core/gallery',
};

const imageBlock = {
	name: 'core/image',
};

const mediaTextBlock = {
	name: 'core/media-text',
};

afterEach( () => {
	jest.clearAllMocks();
} );

describe( 'findBlockByName', () => {

	it( 'should return the first image block', () => {
		select.mockImplementationOnce( () => ( {
			getBlocks: () => [
				galleryBlock,
				imageBlock,
				mediaTextBlock,
			],
		} ) );

		expect( findBlockByName( 'core/image' ) ).toBe( imageBlock );
	} );

	it( 'should return undefined if no blocks', () => {
		select.mockImplementationOnce( () => ( {
			getBlocks: () => [],
		} ) );

		expect( findBlockByName( 'core/image' ) ).toBe( undefined );
	} );

	it( 'should return undefined if only invalid blocks given', () => {
		select.mockImplementationOnce( () => ( {
			getBlocks: () => [
				galleryBlock,
			],
		} ) );

		expect( findBlockByName( 'core/image' ) ).toBe( undefined );
	} );

} );

describe( 'findInvalidBlock', () => {

	// Consider a block "valid" if it is a Gallery block.
	const isValid = ( { name } ) => name === 'core/gallery';

	it( 'should return the first invalid block', () => {
		const blocks = [
			galleryBlock,
			imageBlock,
			mediaTextBlock,
		];

		expect( findInvalidBlock( blocks, isValid ) ).toBe( imageBlock );
	} );

	it( 'should return undefined if no blocks given', () => {
		const blocks = [];

		expect( findInvalidBlock( blocks, isValid ) ).toBe( undefined );
	} );

	it( 'should return undefined if only valid blocks given', () => {
		const blocks = [
			galleryBlock,
		];

		expect( findInvalidBlock( blocks, isValid ) ).toBe( undefined );
	} );

} );

describe( 'findInvalidBlocks', () => {

	// Consider a block "valid" if it is an Image block.
	const isValid = ( { name } ) => name === 'core/image';

	it( 'should return all invalid blocks', () => {
		const blocks = [
			galleryBlock,
			imageBlock,
			mediaTextBlock,
		];

		expect( findInvalidBlocks( blocks, isValid ) ).toStrictEqual( [
			galleryBlock,
			mediaTextBlock,
		] );
	} );

	it( 'should return empty array if no blocks given', () => {
		const blocks = [];

		expect( findInvalidBlocks( blocks, isValid ) ).toEqual( [] );
	} );

	it( 'should return empty array if only valid blocks given', () => {
		const blocks = [
			imageBlock,
		];

		expect( findInvalidBlocks( blocks, isValid ) ).toEqual( [] );
	} );

} );

describe( 'findValidBlock', () => {

	// Consider a block "valid" if it is anything but a Gallery block.
	const isValid = ( { name } ) => name !== 'core/gallery';

	it( 'should return the first valid block', () => {
		const blocks = [
			galleryBlock,
			imageBlock,
			mediaTextBlock,
		];

		expect( findValidBlock( blocks, isValid ) ).toBe( imageBlock );
	} );

	it( 'should return undefined if no blocks given', () => {
		const blocks = [];

		expect( findValidBlock( blocks, isValid ) ).toBe( undefined );
	} );

	it( 'should return undefined if only invalid blocks given', () => {
		const blocks = [
			galleryBlock,
		];

		expect( findValidBlock( blocks, isValid ) ).toBe( undefined );
	} );

} );

describe( 'findValidBlocks', () => {

	// Consider a block "valid" if it is anything but an Image block.
	const isValid = ( { name } ) => name !== 'core/image';

	it( 'should return all valid blocks', () => {
		const blocks = [
			galleryBlock,
			imageBlock,
			mediaTextBlock,
		];

		expect( findValidBlocks( blocks, isValid ) ).toStrictEqual( [
			galleryBlock,
			mediaTextBlock,
		] );
	} );

	it( 'should return empty array if no blocks given', () => {
		const blocks = [];

		expect( findValidBlocks( blocks, isValid ) ).toEqual( [] );
	} );

	it( 'should return empty array if only valid blocks given', () => {
		const blocks = [
			imageBlock,
		];

		expect( findValidBlocks( blocks, isValid ) ).toEqual( [] );
	} );

} );
