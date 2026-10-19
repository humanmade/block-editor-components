import { fireEvent, render, screen, within } from '@testing-library/react';
import React from 'react';

import { PostPickerModal } from '../index';

jest.mock( '@wordpress/i18n', () => ( {
	__: ( value ) => value,
	sprintf: ( format, ...args ) => args.reduce(
		( carry, arg, index ) => carry.replace( `%${ index + 1 }$d`, arg ),
		format
	),
} ) );

jest.mock( '@wordpress/element', () => ( {
	// eslint-disable-next-line global-require
	useState: require( 'react' ).useState,
} ), { virtual: true } );

jest.mock( '@wordpress/components', () => {
	// eslint-disable-next-line global-require
	const ReactModule = require( 'react' );

	return {
		Button: ( { children, disabled, label, onClick } ) => (
			<button disabled={ disabled } type="button" onClick={ onClick }>{ children || label }</button>
		),
		ButtonGroup: ( { children } ) => <div>{ children }</div>,
		CheckboxControl: ( { checked, label, onChange } ) => (
			<label>
				<input checked={ !! checked } type="checkbox" onChange={ e => onChange( e.target.checked ) } />
				{ label }
			</label>
		),
		Flex: ( { children } ) => <div>{ children }</div>,
		FlexItem: ( { children } ) => <div>{ children }</div>,
		Modal: ( { children } ) => <div>{ children }</div>,
		Notice: ( { children } ) => <div role="status">{ children }</div>,
		SearchControl: ( { label, value, onChange } ) => (
			<label>
				{ label }
				<input type="search" value={ value } onChange={ e => onChange( e.target.value ) } />
			</label>
		),
		SelectControl: ( { label, options, value, onChange } ) => (
			<label>
				{ label }
				<select value={ value } onChange={ e => onChange( e.target.value ) }>
					{ options.map( option => (
						<option key={ option.value } value={ option.value }>{ option.label }</option>
					) ) }
				</select>
			</label>
		),
		Spinner: () => <div data-testid="spinner" />,
		TabPanel: ( { children, tabs } ) => {
			const [ active, setActive ] = ReactModule.useState( tabs[ 0 ].name );

			return (
				<div>
					{ tabs.map( tab => (
						<button key={ tab.name } type="button" onClick={ () => setActive( tab.name ) }>
							{ tab.title }
						</button>
					) ) }
					{ children( tabs.find( tab => tab.name === active ) ) }
				</div>
			);
		},
		ToolbarButton: ( { children } ) => <div>{ children }</div>,
	};
}, { virtual: true } );

jest.mock( '../../TermSelector', () => ( {
	__esModule: true,
	default: ( { taxonomy, value, onChange } ) => (
		<div data-testid={ `term-selector-${ taxonomy }` }>
			<button type="button" onClick={ () => onChange( [ 99 ] ) }>{ `filter-${ taxonomy }` }</button>
			<span>{ `value-${ taxonomy }-${ JSON.stringify( value ) }` }</span>
		</div>
	),
} ) );

const getEntityRecords = jest.fn();

jest.mock( '@wordpress/data', () => ( {
	useSelect: ( mapSelect ) => mapSelect( global.__select ),
} ) );

const POST_TYPES = {
	post: {
		slug: 'post',
		name: 'Posts',
		labels: { singular_name: 'Post' },
	},
	page: {
		slug: 'page',
		name: 'Pages',
		labels: { singular_name: 'Page' },
	},
};

const TAXONOMIES = {
	category: {
		slug: 'category',
		rest_base: 'categories',
		types: [ 'post' ],
	},
	page_group: {
		slug: 'page_group',
		rest_base: 'page_groups',
		types: [ 'page' ],
	},
	shared: {
		slug: 'shared',
		rest_base: 'shareds',
		types: [ 'post', 'page' ],
	},
};

const POSTS = {
	post: [
		{
			id: 1,
			title: { rendered: 'Post one' },
		},
		{
			id: 2,
			title: { rendered: 'Post two' },
		},
	],
	page: [
		{
			id: 10,
			title: { rendered: 'Page ten' },
		},
	],
};

/**
 * Build the fake `core` / `core/data` stores used by the useSelect mock.
 *
 * @param {object} overrides Optional overrides, e.g. `isResolving` or `totalPages`.
 * @returns {Function} A `select` implementation.
 */
function buildSelect( overrides = {} ) {
	const {
		isResolving = () => false,
		totalPages = 1,
		totalItems = 2,
	} = overrides;

	return ( store ) => {
		if ( store === 'core/data' ) {
			return { isResolving };
		}

		return {
			getEntityRecords: ( kind, name, query ) => {
				getEntityRecords( kind, name, query );

				if ( query?.include ) {
					return ( POSTS[ name ] ?? [] ).filter( post => query.include.includes( post.id ) );
				}

				return POSTS[ name ] ?? [];
			},
			getEntityRecordsTotalItems: () => totalItems,
			getEntityRecordsTotalPages: () => totalPages,
			getPostType: ( slug ) => POST_TYPES[ slug ],
			getTaxonomy: ( slug ) => TAXONOMIES[ slug ],
		};
	};
}

/**
 * Render the modal with sensible defaults.
 *
 * @param {object} props Props to pass to PostPickerModal.
 * @returns {object} Testing Library render result.
 */
function renderModal( props = {} ) {
	return render(
		<PostPickerModal
			setModalOpen={ () => {} }
			title="Select posts"
			values={ [] }
			onChange={ () => {} }
			{ ...props }
		/>
	);
}

/**
 * The browse query args from the most recent getEntityRecords call.
 *
 * @returns {Array} [ kind, name, query ] of the last call.
 */
function lastQuery() {
	return getEntityRecords.mock.calls[ getEntityRecords.mock.calls.length - 1 ];
}

beforeEach( () => {
	global.__select = buildSelect();
	getEntityRecords.mockClear();
} );

describe( 'PostPicker postType prop', () => {
	it( 'keeps working with a string postType', () => {
		renderModal( { postType: 'post' } );

		expect( screen.getByText( 'Post one' ) ).toBeTruthy();
		expect( screen.queryByLabelText( 'Post type' ) ).toBeNull();
		expect( getEntityRecords ).toHaveBeenCalledWith( 'postType', 'post', expect.any( Object ) );
		expect( getEntityRecords ).not.toHaveBeenCalledWith( 'postType', 'page', expect.any( Object ) );
	} );

	it( 'does not render the type selector for a single element array', () => {
		renderModal( { postType: [ 'post' ] } );

		expect( screen.queryByLabelText( 'Post type' ) ).toBeNull();
		expect( screen.getByText( 'Post one' ) ).toBeTruthy();
	} );

	it( 'renders a type selector for an array of several post types', () => {
		renderModal( { postType: [ 'post', 'page' ] } );

		const selector = screen.getByLabelText( 'Post type' );

		expect( selector ).toBeTruthy();
		expect( within( selector ).getByText( 'Post' ) ).toBeTruthy();
		expect( within( selector ).getByText( 'Page' ) ).toBeTruthy();
		expect( selector.value ).toBe( 'post' );
	} );
} );

describe( 'PostPicker browse list', () => {
	it( 'queries only the selected post type, and refetches on switch', () => {
		renderModal( { postType: [ 'post', 'page' ] } );

		expect( getEntityRecords ).toHaveBeenCalledWith( 'postType', 'post', expect.any( Object ) );
		expect( getEntityRecords ).not.toHaveBeenCalledWith( 'postType', 'page', expect.any( Object ) );

		getEntityRecords.mockClear();
		fireEvent.change( screen.getByLabelText( 'Post type' ), { target: { value: 'page' } } );

		expect( getEntityRecords ).toHaveBeenCalledWith( 'postType', 'page', expect.any( Object ) );
		expect( getEntityRecords ).not.toHaveBeenCalledWith( 'postType', 'post', expect.any( Object ) );
		expect( screen.getByText( 'Page ten' ) ).toBeTruthy();
	} );

	it( 'resets to page one when the search term changes', () => {
		global.__select = buildSelect( { totalPages: 3 } );
		renderModal( { postType: 'post' } );

		fireEvent.click( screen.getByText( 'Next' ) );
		expect( lastQuery()[ 2 ].page ).toBe( 2 );

		fireEvent.change( screen.getByLabelText( 'Search Posts' ), { target: { value: 'hello' } } );

		expect( lastQuery()[ 2 ].page ).toBe( 1 );
		expect( lastQuery()[ 2 ].search ).toBe( 'hello' );
	} );

	it( 'resets to page one when the post type changes', () => {
		global.__select = buildSelect( { totalPages: 3 } );
		renderModal( { postType: [ 'post', 'page' ] } );

		fireEvent.click( screen.getByText( 'Next' ) );
		expect( lastQuery()[ 2 ].page ).toBe( 2 );

		fireEvent.change( screen.getByLabelText( 'Post type' ), { target: { value: 'page' } } );

		expect( lastQuery()[ 2 ].page ).toBe( 1 );
	} );

	it( 'hides the page control when there is only one page', () => {
		renderModal( { postType: 'post' } );

		expect( screen.queryByText( 'Next' ) ).toBeNull();
	} );
} );

describe( 'PostPicker taxonomy filters', () => {
	const taxonomies = [ 'category', 'page_group', 'shared' ];

	it( 'only renders taxonomies registered for the selected post type', () => {
		renderModal( {
			postType: [ 'post', 'page' ],
			taxonomies,
		} );

		expect( screen.queryByTestId( 'term-selector-category' ) ).toBeTruthy();
		expect( screen.queryByTestId( 'term-selector-shared' ) ).toBeTruthy();
		expect( screen.queryByTestId( 'term-selector-page_group' ) ).toBeNull();

		fireEvent.change( screen.getByLabelText( 'Post type' ), { target: { value: 'page' } } );

		expect( screen.queryByTestId( 'term-selector-category' ) ).toBeNull();
		expect( screen.queryByTestId( 'term-selector-shared' ) ).toBeTruthy();
		expect( screen.queryByTestId( 'term-selector-page_group' ) ).toBeTruthy();
	} );

	it( 'drops tax state that no longer applies when the post type changes', () => {
		renderModal( {
			postType: [ 'post', 'page' ],
			taxonomies,
		} );

		fireEvent.click( screen.getByText( 'filter-category' ) );
		fireEvent.click( screen.getByText( 'filter-shared' ) );

		expect( lastQuery()[ 2 ].categories ).toEqual( [ 99 ] );
		expect( lastQuery()[ 2 ].shareds ).toEqual( [ 99 ] );

		fireEvent.change( screen.getByLabelText( 'Post type' ), { target: { value: 'page' } } );

		// `categories` is not registered for `page`; sending it would be a 400.
		expect( lastQuery()[ 2 ].categories ).toBeUndefined();
		expect( lastQuery()[ 2 ].shareds ).toEqual( [ 99 ] );

		// And the dropped state is really gone, not merely hidden.
		fireEvent.change( screen.getByLabelText( 'Post type' ), { target: { value: 'post' } } );
		expect( screen.getByText( 'value-category-[]' ) ).toBeTruthy();
	} );

	it( 'resets to page one when a taxonomy filter changes', () => {
		global.__select = buildSelect( { totalPages: 3 } );
		renderModal( {
			postType: 'post',
			taxonomies,
		} );

		fireEvent.click( screen.getByText( 'Next' ) );
		expect( lastQuery()[ 2 ].page ).toBe( 2 );

		fireEvent.click( screen.getByText( 'filter-category' ) );
		expect( lastQuery()[ 2 ].page ).toBe( 1 );
	} );
} );

describe( 'PostPicker current selection', () => {
	it( 'returns posts across several types, in values order', () => {
		renderModal( {
			postType: [ 'post', 'page' ],
			values: [ 10, 2, 1 ],
		} );

		fireEvent.click( screen.getByText( 'Current Selection' ) );

		expect( getEntityRecords ).toHaveBeenCalledWith( 'postType', 'post', expect.objectContaining( { include: [ 10, 2, 1 ] } ) );
		expect( getEntityRecords ).toHaveBeenCalledWith( 'postType', 'page', expect.objectContaining( { include: [ 10, 2, 1 ] } ) );

		const labels = screen.getAllByRole( 'checkbox' ).map( input => input.parentNode.textContent );

		expect( labels ).toEqual( [ 'Page ten', 'Post two', 'Post one' ] );
	} );

	it( 'shows the spinner while any of the per-type requests is in flight', () => {
		global.__select = buildSelect( {
			isResolving: ( _store, _selector, args ) => args[ 1 ] === 'page',
		} );

		renderModal( {
			postType: [ 'post', 'page' ],
			values: [ 1, 10 ],
		} );
		fireEvent.click( screen.getByText( 'Current Selection' ) );

		expect( screen.getByTestId( 'spinner' ) ).toBeTruthy();
		expect( screen.queryByText( 'Post one' ) ).toBeNull();
	} );

	it( 'issues no request and explains itself when nothing is selected', () => {
		renderModal( {
			postType: [ 'post', 'page' ],
			values: [],
		} );

		getEntityRecords.mockClear();
		fireEvent.click( screen.getByText( 'Current Selection' ) );

		// `per_page: 0` is below the REST minimum, so make no request at all.
		expect( getEntityRecords ).not.toHaveBeenCalled();
		expect( screen.getByText( 'No posts selected yet. Use the Browse tab to add some.' ) ).toBeTruthy();
		expect( screen.queryByText( 'No results found' ) ).toBeNull();
	} );

	it( 'does not leak the dead "Foo" browse tab content', () => {
		renderModal( { postType: 'post' } );

		expect( screen.queryByText( 'Foo' ) ).toBeNull();
	} );
} );
