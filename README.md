# vardisplay.js

## What is it
Display JavaScript variable names in HTML easily by typing `{{variableName}}`. No need for getElementById functions. You can even access objects and arrays with dot notation or bracket notation.

## Is it safe?
Although the code is maintained it is certainly not to be trusted with data entered by a user. This has to do with the fact that in order to get the value of a JavaScript variable from a string which contains the variable name you must pass it into the `eval();` function which can run JavaScript code from a string. But if you're simply displaying variables that have been fetched from a trusted source or originate from your own code then it should be safe for you to use this plugin. If you find any bugs in the code or security flaws please create a new issue in the issues tab.

## Is it fast?
In terms of loading speed the minified version is only around 310~ bytes in size so your page's loading speeds will most likely stay the same. As for how long it takes to render your variables it depends on your own JavaScript and general file size. Because the vardisplay JavaScript tag is deferred when loading it from the CDN it will wait for everything to load before getting to work. However this can be circumvented by including it last in your HTML and omitting the `defer` attribute. This will still wait for your own JavaScript so it's really up to you how long it takes to render. If you add some variables later on or you simply changed them you can re-render the document with the JavaScript function `vardisplay.run();`.

## How can I get it?
To use vardisplay.js you can simply copy the code from either the minified or non-minified (development) version into a JavaScript file that you then include in your HTML. Additionally you can also include it via CDN with jsdelivr by including `<script src="https://cdn.jsdelivr.net/gh/imeuropa/vardisplay.js@master/vardisplay.min.js" defer></script>` before the closing `</body>` tag of your HTML.

## License
Licensed under the MIT License.
