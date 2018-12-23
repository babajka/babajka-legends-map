module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['prettier', 'react'],
  env: {
    browser: true,
  },
  rules: {
    // prettier overrides
    'prettier/prettier': 'error',

    // we use bind
    'react/jsx-no-bind': 'off',
    // we use only .js extension
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    // allow create components without prop-types check
    'react/prop-types': ['error', { skipUndeclared: true }],
    // allow console.error & console.warning
    'no-console': ['error', { allow: ['warn', 'error'] }],
    // we use '_' placeholder, for example in array desctruction:  [_, second] = arr
    'no-unused-vars': ['error', { varsIgnorePattern: '^_+', argsIgnorePattern: '^_+' }],
  },
};
