// Require acorn as usual
var acorn = require("acorn");
// Add the es7-plugin
require('./acorn-es7')(acorn) ;

var code = "@Component()\n class AppComponent{}"; 
var ast = acorn.parse(code,{
    // Specify use of the plugin
    plugins:{es7:true},
    // Specify the ecmaVersion
    ecmaVersion:7
}) ;
// Show the AST
console.log(JSON.stringify(ast, null, 1)) ;