module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
    'prettier',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'frontend/tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {},
  'import/resolver': {
    node: {
      paths: [path.resolve(__dirname, '')],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    typescript: {
      project: path.resolve(__dirname, './tsconfig.json'),
    },
  },
};
