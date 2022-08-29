module.exports = {
    env: {
        browser: false,
        commonjs: true,
        es6: false,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 8,
        sourceType: "module",
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
        },
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
    },
    plugins: ["@typescript-eslint"],
    ignorePatterns: ['*.d.ts', '*.js'],
    rules: {
        'no-constant-condition': 'off',
        "@typescript-eslint/no-floating-promises": "error",
        "prefer-const": "off",
        "no-var": "error",
        "require-await": "warn",
        "no-empty": "off"
    }
}
