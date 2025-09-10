// backend/.eslintrc.cjs
module.exports = {
  root: true,
  env: {
    node: true,
    es2023: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: ["eslint:recommended"],
  rules: {
    "no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "no-undef": "error",
    "no-console": "off", // utile en back; on durcira si besoin
  },
  ignorePatterns: ["node_modules/", "dist/", "coverage/"],
  overrides: [
    {
      files: ["**/*.test.js", "**/*.spec.js"],
      env: { mocha: true, jest: true },
    },
  ],
};
