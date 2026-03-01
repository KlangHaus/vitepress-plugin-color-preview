export default {
  'src/**/*.ts': ['eslint --fix', 'prettier --write'],
  '*.{json,md,css}': ['prettier --write'],
}
