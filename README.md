# acorn-es7

ES7 support for Acorn. It works with node.js and plain browser:

 ** decorators:
   ** works with acorn and acorn loose parser.
   ** provides a walk
 ** async/await
    ** see [acorn-es7-plugin](https://github.com/MatAtBread/acorn-es7-plugin)
# Usage

See [sample.js](sample.js):

```javascript
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
```

```javascript
@Component()
class AppComponent{}
```

```json
{
 "type": "Program",
 "start": 0,
 "end": 34,
 "body": [
  {
   "type": "ClassDeclaration",
   "start": 0,
   "end": 34,
   "id": {
    "type": "Identifier",
    "start": 20,
    "end": 32,
    "name": "AppComponent"
   },
   "superClass": null,
   "body": {
    "type": "ClassBody",
    "start": 32,
    "end": 34,
    "body": []
   },
   "decorators": [
    {
     "type": "Decorator",
     "start": 0,
     "end": 12,
     "expression": {
      "type": "CallExpression",
      "start": 1,
      "end": 12,
      "callee": {
       "type": "Identifier",
       "start": 1,
       "end": 10,
       "name": "Component"
      },
      "arguments": []
     }
    }
   ]
  }
 ],
 "sourceType": "script"
}
```