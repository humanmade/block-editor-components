import { withActiveVariation } from '../variations';

describe( 'withActiveVariation', () => {

	it( 'should pass settings without a variations property as is', () => {
		const settings = {};

		expect( withActiveVariation( settings ) ).toBe( settings );
	} );

	it( 'should pass settings with an empty variations property as is', () => {
		const settings = {
			variations: [],
		};

		expect( withActiveVariation( settings ) ).toBe( settings );
	} );

	it( 'should inject isActive predicate', () => {
		const settings = {
			variations: [
				{
					name: 'rounded',
					title: 'Rounded Block',
					attributes: {
						corners: 'rounded',
					},
				},
			],
		};

		const nextSettings = withActiveVariation( settings );

		expect( nextSettings ).toMatchObject( settings );

		expect( nextSettings.variations[0].isActive ).toBeInstanceOf( Function );
	} );

} );

describe( 'isActive', () => {

	const settings = {
		variations: [
			{
				name: 'rounded',
				title: 'Rounded Block',
				attributes: {
					corners: 'rounded',
				},
			},
		],
	};

	const { isActive } = withActiveVariation( settings, 'corners' ).variations[0];

	it( 'should return false for a missing block attribute', () => {
		const blockAttributes = {};

		const variationAttributes = {
			corners: 'rounded',
		};

		expect( isActive( blockAttributes, variationAttributes ) ).toBe( false );
	} );

	it( 'should return false for a missing variation attribute', () => {
		const blockAttributes = {
			corners: 'rounded',
		};

		const variationAttributes = {};

		expect( isActive( blockAttributes, variationAttributes ) ).toBe( false );
	} );

	it( 'should return false for a non-matching attribute', () => {
		const blockAttributes = {
			corners: 'none',
		};

		const variationAttributes = {
			corners: 'rounded',
		};

		expect( isActive( blockAttributes, variationAttributes ) ).toBe( false );
	} );

	it( 'should return true for a matching attribute', () => {
		const blockAttributes = {
			corners: 'rounded',
		};

		const variationAttributes = {
			corners: 'rounded',
		};

		expect( isActive( blockAttributes, variationAttributes ) ).toBe( true );
	} );

} );
