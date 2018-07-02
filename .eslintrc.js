module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "parser": "babel-eslint",
    "extends": "airbnb",
    "parserOptions": {
        "ecmaVersion": 7,
        "sourceType": "module",
        "ecmaFeatures": {
          //"impliedStrict": true,
          "jsx": true,
          "classes": true
        }
    },
    "plugins": [
        "react"
    ],
    "rules": {
      "jsx-a11y/anchor-is-valid": [ "error", {
        "components": [ "Link", "NavLink" ],
        "specialLink": [ "to" ],
        "react/sort-comp": 0,
      }]
    }
};
