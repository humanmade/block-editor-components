import {
	getApplicableTaxonomies,
	getSelectionIdsKey,
	getSelectionQueryArgs,
	labelForPost,
	toPostTypes,
} from '../utils';

jest.mock( '@wordpress/i18n', () => ( {
	__: ( value ) => value,
	sprintf: ( format, ...args ) => args.reduce(
		( carry, arg, index ) => carry
			.replace( `%${ index + 1 }$d`, arg )
			.replace( `%${ index + 1 }$s`, arg ),
		format
	),
} ) );

describe( 'toPostTypes', () => {

	it( 'should wrap a single slug', () => {
		expect( toPostTypes( 'post' ) ).toEqual( [ 'post' ] );
	} );

	it( 'should pass an array through unchanged', () => {
		expect( toPostTypes( [ 'post', 'page' ] ) ).toEqual( [ 'post', 'page' ] );
	} );

	it( 'should preserve the order, because the first slug is the default', () => {
		expect( toPostTypes( [ 'page', 'post' ] )[ 0 ] ).toBe( 'page' );
	} );
} );

describe( 'labelForPost', () => {

	const post = {
		id: 1,
		type: 'page',
		title: { rendered: 'Page ten' },
	};

	it( 'should omit the prefix for a single post type', () => {
		expect( labelForPost( post, null ) ).toBe( 'Page ten' );
	} );

	it( 'should prefix the singular label when the selection spans types', () => {
		expect( labelForPost( post, { page: 'Page' } ) ).toBe( 'Page: Page ten' );
	} );

	it( 'should fall back to the slug while the post type is unresolved', () => {
		expect( labelForPost( post, {} ) ).toBe( 'page: Page ten' );
	} );

	it( 'should fall back to a placeholder for an empty title', () => {
		const untitled = {
			id: 2,
			type: 'page',
			title: { rendered: '' },
		};

		expect( labelForPost( untitled, null ) ).toBe( '(No title)' );
		expect( labelForPost( untitled, { page: 'Page' } ) ).toBe( 'Page: (No title)' );
	} );

	it( 'should tolerate a post with no title object at all', () => {
		expect( labelForPost( {
			id: 3,
			type: 'page',
		}, null ) ).toBe( '(No title)' );
	} );
} );

describe( 'getSelectionIdsKey', () => {

	it( 'should produce the same key whatever the display order', () => {
		expect( getSelectionIdsKey( [ 10, 2, 1 ] ) ).toBe( getSelectionIdsKey( [ 1, 10, 2 ] ) );
	} );

	it( 'should sort numerically, not lexically', () => {
		expect( getSelectionIdsKey( [ 10, 2, 1 ] ) ).toBe( '1,2,10' );
	} );

	it( 'should not mutate the array it is given', () => {
		const values = [ 10, 2, 1 ];

		getSelectionIdsKey( values );

		expect( values ).toEqual( [ 10, 2, 1 ] );
	} );

	it( 'should produce an empty key for an empty selection', () => {
		expect( getSelectionIdsKey( [] ) ).toBe( '' );
	} );

	it( 'should produce a different key when a post is added or removed', () => {
		const before = getSelectionIdsKey( [ 1, 2 ] );

		expect( getSelectionIdsKey( [ 1, 2, 3 ] ) ).not.toBe( before );
		expect( getSelectionIdsKey( [ 1 ] ) ).not.toBe( before );
	} );
} );

describe( 'getSelectionQueryArgs', () => {

	it( 'should include every selected ID, ascending', () => {
		expect( getSelectionQueryArgs( '1,2,10' ) ).toEqual( {
			include: [ 1, 2, 10 ],
			per_page: 3,
			context: 'view',
		} );
	} );

	it( 'should return null for an empty selection, rather than query for everything', () => {
		// `per_page: 0` is below the REST minimum, and an empty `include` is ignored.
		expect( getSelectionQueryArgs( '' ) ).toBe( null );
	} );

	it( 'should build identical args for the same IDs in a different order', () => {
		// The crux of the reorder fix: a reorder must not look like a new query.
		const a = getSelectionQueryArgs( getSelectionIdsKey( [ 10, 2, 1 ] ) );
		const b = getSelectionQueryArgs( getSelectionIdsKey( [ 1, 10, 2 ] ) );

		expect( a ).toEqual( b );
	} );

	it( 'should ask for exactly as many posts as are selected', () => {
		expect( getSelectionQueryArgs( '4,5' ).per_page ).toBe( 2 );
	} );
} );

describe( 'getApplicableTaxonomies', () => {

	const taxObjects = [
		{
			slug: 'category',
			rest_base: 'categories',
			types: [ 'post' ],
		},
		{
			slug: 'page_group',
			rest_base: 'page_groups',
			types: [ 'page' ],
		},
		{
			slug: 'shared',
			rest_base: 'shareds',
			types: [ 'post', 'page' ],
		},
	];

	const taxonomies = [ 'category', 'page_group', 'shared' ];

	it( 'should return only the taxonomies registered for the post type', () => {
		expect( getApplicableTaxonomies( taxonomies, taxObjects, 'post' ) ).toEqual( [ 'category', 'shared' ] );
		expect( getApplicableTaxonomies( taxonomies, taxObjects, 'page' ) ).toEqual( [ 'page_group', 'shared' ] );
	} );

	it( 'should drop a taxonomy that has not resolved yet', () => {
		expect( getApplicableTaxonomies( taxonomies, [ null, undefined ], 'post' ) ).toEqual( [] );
	} );

	it( 'should drop a taxonomy registered for no types', () => {
		const orphan = [ {
			slug: 'category',
			rest_base: 'categories',
		} ];

		expect( getApplicableTaxonomies( [ 'category' ], orphan, 'post' ) ).toEqual( [] );
	} );

	it( 'should ignore taxonomy objects that were never asked for', () => {
		expect( getApplicableTaxonomies( [ 'shared' ], taxObjects, 'post' ) ).toEqual( [ 'shared' ] );
	} );
} );
