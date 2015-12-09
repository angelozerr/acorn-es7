# acorn-es7

ES7 decorators support for Acorn and loose parser.

# Usage

See [sample.js](sample.js)

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