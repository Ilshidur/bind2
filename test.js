const bind = require('.');

bind.define();

function test(arg) {
  this.arg = arg;
  return this;
}

const context = {
  test: true,
};

const boundTest = test.bind(context);
const bound2Test = test.bind2(context);
const unbound2Test = bound2Test.unbind();

console.log('test', test);
console.log('test.bound', test.bound);
console.log('test context', test(true));
console.log('test context', test.context);
console.log('---');
console.log('boundTest', boundTest);
console.log('boundTest.bound', boundTest.bound);
console.log('boundTest context', boundTest(true));
console.log('boundTest context', boundTest.context);
console.log('---');
console.log('bound2Test', bound2Test);
console.log('bound2Test.bound', bound2Test.bound);
console.log('bound2Test context', bound2Test(true));
console.log('bound2Test context', bound2Test.context);
console.log('---');
console.log('unbound2Test', unbound2Test);
console.log('unbound2Test.bound', unbound2Test.bound);
console.log('unbound2Test context', unbound2Test(true));
console.log('unbound2Test context', unbound2Test.context);
