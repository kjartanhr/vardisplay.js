# vardisplay.js

Display JavaScript variable names in HTML easily by typing `{{variableName}}`. No need for getElementById functions. You can even access objects and arrays with dot notation or bracket notation.

Note: Although the code is maintained it is certainly not to be trusted with data entered by a user. This has to do with the fact that in order to get the value of a JavaScript variable from a string which contains the variable name you must pass it into the `eval();` function which can run JavaScript code from a string. But if you're simply displaying variables that have been fetched from a trusted source or originate from your own code then it should be safe for you to use this plugin. If you find any bugs in the code or security flaws please create a new issue in the issues tab.
