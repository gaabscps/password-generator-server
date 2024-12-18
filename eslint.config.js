module.exports = {
  env: {
    browser: false,
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-console": "off",
    "linebreak-style": ["error", "windows"],
  },
};
