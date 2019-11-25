const unbind = (fn) => {
  return fn.unbound;
};

const bound = (fn) => fn.hasOwnProperty('context');

const bind2 = (fn, context, ...args) => {
  const doBind = (f, context, ...args) => f.bind.isBind2 ? bind2() : fn.bind;
  const newFn = fn.bind(context);
  newFn.unbound = fn;
  newFn.unbind = () => unbind(newFn);
  newFn.context = context;
  newFn.bound = newFn.bound || bound(newFn);
  // TODO:
  newFn.bind = (context, ...args) => bind2(newFn, context, ...args);
  return newFn;
};
bind2.isBind2 = true;

const wrap = (prototype) => {
  (function (bind) {
    Object.defineProperties(prototype, {
      'bind2': {
        value: function (context, ...args) {
          return bind2(this, context, ...args);
        }
      },
      'bound': {
        get: function () {
          return bound(this);
        }
      },
      // TODO: 'context' : find a way to get the context of a function without executing it.
    });
  }(prototype.bind));
}

const toExport = bind2;
toExport.fn = bind2;
toExport.wrap = wrap;
toExport.define = () => {
  wrap(Function.prototype);
};

// UMD Module
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.bind = factory();
  }
})(typeof self !== "undefined" ? self : this, function() {
  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  // -> return func(package);
  return toExport;
});
