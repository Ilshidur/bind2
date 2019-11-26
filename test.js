const test = require('ava');

const bind2 = require('.');

function testFn() {
  return this;
}

test('.fn()', t => {
  t.is(bind2.fn, bind2);
});

test('.bind2() - context property', t => {
  const context = { context: true };
  const boundFn = bind2(testFn, context);
  t.is(boundFn.context, context);
  t.is(testFn.context, undefined);
});

test('.bind2() - bound property', t => {
  const context = { context: true };
  const boundFn = bind2(testFn, context);
  t.is(boundFn.bound, true);
  t.is(testFn.bound, undefined);
});

test('.bind2() - function context', t => {
  const context = { context: true };
  const boundFn = bind2(testFn, context);
  t.is(boundFn(), context);
  t.is(testFn(), this);
});

test('bound function - unbound property', t => {
  const context = { context: true };
  const boundFn = bind2(testFn, context);
  const unboundFn = boundFn.unbound;
  t.is(testFn, unboundFn);
});

test('bound function - unbind()', t => {
  const context = { context: true };
  const boundFn = bind2(testFn, context);
  const unboundFn = boundFn.unbind();
  t.is(testFn, unboundFn);
});

test('bound function - bind2()', t => {
  const context = { context: true };
  const context2 = { context2: true };
  const context3 = { context3: true };
  const boundFn = bind2(testFn, context);
  const reboundFn = boundFn.bind2(context2);
  t.is(reboundFn.context, context2);
  const rereboundFn = boundFn.bind2(context3);
  t.is(rereboundFn.context, context3);
});

test('.wrap()', t => {
  const bind = Function.prototype.bind;
  const prototype = function() {};
  prototype.bind = bind;

  bind2.wrap(prototype);

  t.is(typeof prototype.bind2, 'function');
  t.is(prototype.bound, false);
  t.is(prototype.bind, bind);

  const context = { context: true };
  t.is(
    prototype.bind2(context, ['1']).toString(),
    bind2(prototype, context, ['1']).toString(),
  );
  t.deepEqual(
    prototype.bind2(context, ['1']).prototype,
    bind2(prototype, context, ['1']).prototype,
  );
});
