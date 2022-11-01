/**
 * Promote configurations in entries.js into full production config objects,
 * and export an array of Webpack build configurations.
 */
const path = require( 'path' );

const { presets, externals } = require( '@humanmade/webpack-helpers' );

// Promote partial configurations into full config objects. ALL per-build
// customization should be done within the individual entry config files, do not add any
// conditionals into this build.
module.exports = presets.production( {
	name: 'block-editor-components',
	entry: {
		'index': './src/index.js',
	},
	resolve: {
		alias: {
			'react': path.resolve( __dirname, './node_modules/react' ),
			'react-dom': path.resolve( __dirname, './node_modules/react-dom' ),
		},
	},
	output: {
		path: path.resolve( __dirname, './dist' ),
		filename: '[name].js',
		library: '@humanmade/block-editor-components',
		libraryTarget: 'umd',
		publicPath: '/dist/',
		umdNamedDefine: true,
		clean: true,
	},
	externals: Object.keys( externals ).reduce( ( carry, key ) => {
		return {
			...carry,
			[ key ]: {
				commonjs: key,
				commonjs2: key,
				amd: externals[ key ],
				root: externals[ key ],
			},
		};
	}, {} ),
} );
