module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["eslint:recommended", "plugin:node/recommended"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2019,
        "ecmaFeatures": {
          "globalReturn": true,
          "experimentalObjectRestSpread": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "node"
    ],
    "rules": {
        "comma-dangle": ["error", "only-multiline"],
        'no-console': 'off',
        "linebreak-style": 0
    }
};