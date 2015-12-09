(function(f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f(); // CommonJS
  } else if (typeof define === "function" && define.amd) {
    define([], f); // AMD
  } else {
    // Plain browser env
    var g;
    if (typeof window !== "undefined") {
      g = window
    } else if (typeof global !== "undefined") {
      g = global
    } else if (typeof self !== "undefined") {
      g = self
    } else {
      g = this
    }
    g.acornES7 = f()
  }
})
(function() {

  return function(acorn) {
    
    function getTokenType(p, loose) {
      return loose ? p.tok.type : p.type;
    }
    
    var extendsAcorn = function (pp) {
      var loose = pp == (acorn.LooseParser && acorn.LooseParser.prototype);
      
      pp.parseDecorator = function() {
        var node = this.startNode();
        this.next();
        node.expression = this.parseMaybeAssign();
        return this.finishNode(node, "Decorator");
      }
      
      return function(instance) {
        instance.decorators = [];
      
        instance.extend('getTokenFromCode', function(inner) {
          return function(code) {
            if (code == 64) {
              ++this.pos; return this.finishToken(tt.at); 
            }
            return inner.call(this, code);
          };
        }); 
      
        instance.extend('parseStatement', function(inner) {
          return function(declaration, topLevel) {
            switch(getTokenType(this, loose)) {
              case tt.at:
                while (getTokenType(this, loose) === tt.at) {
                  this.decorators.push(this.parseDecorator());
                }
                if (!loose && getTokenType(this, loose) !== tt._class) {
                  this.raise(this.start, "Leading decorators must be attached to a class declaration");
                }
              case tt._class:
                if (!loose && !declaration) this.unexpected()
                if (this.decorators.length) {
                  var node = inner.call(this, declaration, topLevel);
                  node.decorators = this.decorators;
                  // adjust start of ClassDeclaration with start of the first decorator (helpful for ES7 walk).
                  node.start = node.decorators[0].start; 
                  this.decorators = [];
                  return node;
                }          
              }       
              return inner.call(this, declaration, topLevel);
          };
        });
      }
    }
    
    var tt = acorn.tokTypes;
    tt.at = new acorn.TokenType('@');
    // acorn 
    acorn.plugins.es7 = extendsAcorn(acorn.Parser.prototype);
    // acorn loose
    if(acorn.LooseParser) acorn.pluginsLoose.es7 = extendsAcorn(acorn.LooseParser.prototype);
    
    return acorn;
  }

});