const test = require('ava');

const bind2 = require('.');

function testFn() {
  return this;
}

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

test('bound function - bind()', t => {
  const context = { context: true };
  const context2 = { context2: true };
  const boundFn = bind2(testFn, context);
  const reboundFn = boundFn.bind(context2);
  t.is(reboundFn.context, context2);
});
