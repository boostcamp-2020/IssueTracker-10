module.exports = {
    "env": {
        "ecmaVersion": 2018,
        "sourceType": "module",
    },
    "plugins": ["prettier"],
    "extends": ["eslint:recommended", "plugin:prettier/recommended"],
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
        "prettier/prettier": "error"
    },
    "globals": {
    }
};
