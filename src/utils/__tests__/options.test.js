import {
	createOptionFromPost,
	createOptionFromTerm,
	createOptionsFromPosts,
	createOptionsFromPostsWithHierarchy,
	createOptionsFromTerms,
	createOptionsFromTermsWithHierarchy,
} from '../options';

jest.mock( '@wordpress/html-entities', () => ( {
	decodeEntities: ( html ) => html,
} ) );

jest.mock( '@wordpress/i18n', () => ( {
	__: ( value ) => value,
	sprintf: ( format, ...args ) => `${ format }||${ args.join( '|' ) }`,
} ) );

afterEach( () => {
	jest.clearAllMocks();
} );

describe( 'createOptionFromPost', () => {

	it( 'should use the given ID and title', () => {
		const post = {
			id: 42,
			title: {
				rendered: 'Some Post',
			},
		};

		expect( createOptionFromPost( post ) ).toEqual( {
			label: 'Some Post',
			value: 42,
		} );
	} );

	it( 'should use fallback title if post title empty', () => {
		const post = {
			id: 42,
			title: {
				rendered: '',
			},
		};

		expect( createOptionFromPost( post ) ).toEqual( {
			label: expect.stringMatching( '#%d (no title)||42' ),
			value: 42,
		} );
	} );

	it( 'should use fallback title if post title is missing', () => {
		const post = {
			id: 42,
			title: '',
		};

		expect( createOptionFromPost( post ) ).toEqual( {
			label: expect.stringMatching( '#%d (no title)||42' ),
			value: 42,
		} );
	} );

	it( 'should use the given title prefix', () => {
		const post = {
			id: 42,
			title: {
				rendered: 'Some Post',
			},
		};

		expect( createOptionFromPost( post, '::' ) ).toEqual( {
			label: '::Some Post',
			value: 42,
		} );
	} );

} );

describe( 'createOptionFromTerm', () => {

	it( 'should use the given ID and name', () => {
		const term = {
			id: 23,
			name: 'Some Term',
		};

		expect( createOptionFromTerm( term ) ).toEqual( {
			label: 'Some Term',
			value: 23,
		} );
	} );

	it( 'should use fallback name if term name empty', () => {
		const term = {
			id: 23,
			name: '',
		};

		expect( createOptionFromTerm( term ) ).toEqual( {
			label: expect.stringMatching( '#%d (no name)||23' ),
			value: 23,
		} );
	} );

	it( 'should use fallback name if term name is missing', () => {
		const term = {
			id: 23,
			name: '',
		};

		expect( createOptionFromTerm( term ) ).toEqual( {
			label: expect.stringMatching( '#%d (no name)||23' ),
			value: 23,
		} );
	} );

	it( 'should use the given name prefix', () => {
		const term = {
			id: 23,
			name: 'Some Term',
		};

		expect( createOptionFromTerm( term, '::' ) ).toEqual( {
			label: '::Some Term',
			value: 23,
		} );
	} );

} );

describe( 'createOptionsFromPosts', () => {

	it( 'should return an empty array for no posts', () => {
		const posts = [];

		expect( createOptionsFromPosts( posts ) ).toEqual( [] );
	} );

	it( 'should return the expected options', () => {
		const posts = [
			{
				id: 1,
				title: {
					rendered: 'First Post',
				},
			},
			{
				id: 2,
				title: {
					rendered: '',
				},
			},
			{
				id: 3,
				title: '',
			},
		];

		expect( createOptionsFromPosts( posts ) ).toEqual( [
			{
				label: 'First Post',
				value: 1,
			},
			{
				label: expect.stringMatching( '#%d (no title)||2' ),
				value: 2,
			},
			{
				label: expect.stringMatching( '#%d (no title)||3' ),
				value: 3,
			},
		] );
	} );

} );

describe( 'createOptionsFromPostsWithHierarchy', () => {

	it( 'should return an empty array for no posts', () => {
		const posts = [];

		expect( createOptionsFromPostsWithHierarchy( posts ) ).toEqual( [] );
	} );

	it( 'should return the expected options', () => {
		const posts = [
			{
				id: 1,
				title: {
					rendered: 'First Post',
				},
				children: [
					{
						id: 11,
						title: {
							rendered: 'First Child Post',
						},
						children: [
							{
								id: 111,
								title: {
									rendered: 'First Grandchild Post',
								},
							},
						],
					},
				],
			},
			{
				id: 2,
				title: {
					rendered: 'Second Post',
				},
				children: [
					{
						id: 21,
						title: {
							rendered: 'Second Child Post',
						},
					},
				],
			},
			{
				id: 3,
				title: {
					rendered: 'Third Post',
				},
				children: [],
			},
		];

		expect( createOptionsFromPostsWithHierarchy( posts ) ).toEqual( [
			{
				label: 'First Post',
				value: 1,
			},
			{
				label: '— First Child Post',
				value: 11,
			},
			{
				label: '— — First Grandchild Post',
				value: 111,
			},
			{
				label: 'Second Post',
				value: 2,
			},
			{
				label: '— Second Child Post',
				value: 21,
			},
			{
				label: 'Third Post',
				value: 3,
			},
		] );
	} );

} );

describe( 'createOptionsFromTerms', () => {

	it( 'should return an empty array for no terms', () => {
		const terms = [];

		expect( createOptionsFromTerms( terms ) ).toEqual( [] );
	} );

	it( 'should return the expected options', () => {
		const terms = [
			{
				id: 1,
				name: 'First Term',
			},
			{
				id: 2,
				name: '',
			},
		];

		expect( createOptionsFromTerms( terms ) ).toEqual( [
			{
				label: 'First Term',
				value: 1,
			},
			{
				label: expect.stringMatching( '#%d (no name)||2' ),
				value: 2,
			},
		] );
	} );

} );

describe( 'createOptionsFromTermsWithHierarchy', () => {

	it( 'should return an empty array for no terms', () => {
		const terms = [];

		expect( createOptionsFromTermsWithHierarchy( terms ) ).toEqual( [] );
	} );

	it( 'should return the expected options', () => {
		const terms = [
			{
				id: 1,
				name: 'First Term',
				children: [
					{
						id: 11,
						name: 'First Child Term',
						children: [
							{
								id: 111,
								name: 'First Grandchild Term',
							},
						],
					},
				],
			},
			{
				id: 2,
				name: 'Second Term',
				children: [
					{
						id: 21,
						name: 'Second Child Term',
					},
				],
			},
			{
				id: 3,
				name: 'Third Term',
				children: [],
			},
		];

		expect( createOptionsFromTermsWithHierarchy( terms ) ).toEqual( [
			{
				label: 'First Term',
				value: 1,
			},
			{
				label: '— First Child Term',
				value: 11,
			},
			{
				label: '— — First Grandchild Term',
				value: 111,
			},
			{
				label: 'Second Term',
				value: 2,
			},
			{
				label: '— Second Child Term',
				value: 21,
			},
			{
				label: 'Third Term',
				value: 3,
			},
		] );
	} );

} );
