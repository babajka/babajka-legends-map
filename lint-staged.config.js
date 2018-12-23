module.exports = {
  '**/*.scss': ['npm run prettier-stylelint', 'git add'],
  '**/*.js': ['npm run prettier', 'npm run eslint', 'git add'],
  '**/*.md': ['npm run prettier', 'git add'],
};
