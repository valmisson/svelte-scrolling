import eslint from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...svelte.configs['flat/recommended'],
	{
		files: ['src/**/*.{js,ts,svelte}'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser
			},
      globals: {
				...globals.browser
			}
		}
	},
	{
		ignores: ['dist/', '*.config.*']
	},
  {
    rules: {
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 2, maxEOF: 0 }]
    }
  }
);
