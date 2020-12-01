// Thanks www.robertcooper.me :)
module.exports = {
  parser: "@typescript-eslint/parser", 
	parserOptions: {
    ecmaVersion: 2020, 
	  ecmaFeatures: {

      jsx: true 
    }
  },
	  settings: {

    react: {

      version: "detect" 
    }

  },
  extends: [
	    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
"prettier/@typescript-eslint",
	  "plugin:prettier/recommended"
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  }
};
