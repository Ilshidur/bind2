# bind2

> Enhanced Javascript `bind()` function.

## Features

* **Does not break the original `bind` API**.
* Immutable.
* New properties assigned to each bound function :
  * `unbind()` (Function). Will return the original unbound function.
  * `context` (Any). Get the function context without executing it.
* Additional properties in the function context :
  * `bound` (Boolean). Returns `true` if the function has been bound with `bind2`.

## Examples

```javascript
const bind2 = require('bind2');

function test() {
  return this.hello;
}
const context = { hello: 'world' };

// Native `bind()`.
const boundFn = test.bind(context);
console.log(boundFn.context); // undefined
console.log(boundFn.bound); // undefined
console.log(bound2Fn.unbound); // undefined
console.log(boundFn()); // 'world'

// `bind2()`.
const bound2Fn = bind2(test, context);
console.log(bound2Fn.context); // { hello: 'world' }
console.log(bound2Fn.bound); // true
console.log(bound2Fn.unbound); // [Function: test]
console.log(bound2Fn()); // 'world'
```

## API

TODO:

## License

MIT

<hr/>

<p align="center">
  Don't forget to 🌟 Star 🌟 the repo if you like this npm package !<br/>
  <a href="https://github.com/Ilshidur/bind2/issues/new">Your feedback is appreciated</a>
</p>
