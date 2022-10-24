module.exports = {
	env: {
		browser: true,
		node: true,
	},
	extends: [
		'@humanmade',
		'plugin:jsonc/recommended-with-json',
	],
	globals: {
		_: 'readonly',
		Backbone: 'readonly',
		jQuery: 'readonly',
		wp: 'readonly',
	},
	rules: {
		'arrow-parens': 'off',
		'jsdoc/require-jsdoc': [ 'error', {
			'require': {
				'FunctionDeclaration': true,
			},
		} ],
		'jsdoc/tag-lines': 'off',
		'jsonc/indent': [ 'error', 'tab' ],
	},
};
