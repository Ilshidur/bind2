const unbind = (fn) => {
  return fn.unbound;
};

const bind2 = (fn, context, ...args) => {
  const newFn = fn.bind(context);
  newFn.unbound = fn;
  newFn.unbind = () => unbind(newFn);
  newFn.context = context;
  // TODO:
  // newFn.bind = (context, ...args) => bind2(newFn, context, ...args);
  return newFn;
};

module.exports = bind2;
module.exports.fn = bind2;

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
          return this.hasOwnProperty('context');
        }
      },
      // TODO: 'context' : find a way to get the context of a function without executing it.
    });
  }(prototype.bind));
}

module.exports.wrap = wrap;

module.exports.define = () => {
  wrap(Function.prototype);
};
