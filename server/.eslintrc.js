module.exports = {
	parser: '@typescript-eslint/parser',
	env: {
		es2020: true,
		node: true
	},
	extends: [
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'standard'
	],
	parserOptions: {
		ecmaVersion: 11,
		sourceType: 'module'
	},
	plugins: [
		'@typescript-eslint'
	],
	rules: {
	}
};
