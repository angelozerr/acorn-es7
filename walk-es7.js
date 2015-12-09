(function(root, mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    return mod(exports, require("acorn/dist.walk"));
  if (typeof define == "function" && define.amd) // AMD
    return define(["exports", "acorn/dist.walk"], mod);
  var acornES7 = root.acornES7 || (root.acornES7 = {});
  mod(acornES7.walk || (acornES7.walk = {}), acorn.walk); // Plain browser env
})(this, function(exports, walk) {
  "use strict";
  
  var base = walk.base;
  base.Decorator = function (node, st, c) {
    c(node.expression, st, "Expression");
  }
  
  var baseClass = base.Class; 
  base.Class = function (node, st, c) {
    if (node.decorators) {
      for (var i = 0; i < node.decorators.length; i++) {
        c(node.decorators[i], st);
      }
    }
    baseClass(node, st, c);
  };
  
});