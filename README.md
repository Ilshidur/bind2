# bind2

![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)

[![npm version][version-badge]][version-url]
[![Known Vulnerabilities][vulnerabilities-badge]][vulnerabilities-url]
[![dependency status][dependency-badge]][dependency-url]
[![devdependency status][devdependency-badge]][devdependency-url]
[![Code Climate][maintainability-badge]][maintainability-url]
[![downloads][downloads-badge]][downloads-url]

[![NPM][npm-stats-badge]][npm-stats-url]

> Enhanced Javascript `bind()` function.

## Why ?

Because the `[[BoundThis]]` internal properties of a bound function are not programmatically accessible, and you might need to get the context of a function without executing it. This lib also provides some tooling around the `bind` mechanism.

## Install

```bash
npm install bind2
```

## Features

* **Does not break the original `bind` API.**
* **Immutable.**
* New properties assigned to each bound function (using `bind2()`) :
  * `unbind()` (Function). Will return the original unbound function.
  * `unbound` (Function). Reference to the original unbound function.
  * `context` (Any). Get the function context without executing it.
  * `bound` (Boolean). Returns `true` if the function has been bound with `bind2`.
  * `bind2(context, ...parameters)` (Function). Re-bind the function. *(Note : `bind()` still exists.)*

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
console.log(bound2Fn.unbind()); // TypeError: bound2Fn.unbind is not a function
console.log(boundFn()); // 'world'

// `bind2()`.
const bound2Fn = bind2(test, context);
console.log(bound2Fn.context); // { hello: 'world' }
console.log(bound2Fn.bound); // true
console.log(bound2Fn.unbound); // [Function: test]
console.log(bound2Fn.unbind()); // [Function: test]
console.log(bound2Fn()); // 'world'
```

## API

```javascript
const bind2 = require('bind2');
```

### `bind2(fn, thisArg[, arg1[, arg2[, ...]]])`

This function is a wrapper of the native `bind()` function.

* **Arguments :**
  * `fn` *(Function)* : the function to bind.
  * `thisArg` : the value to be passed as the `this` parameter to the target function when the bound function is called. The value is ignored if the bound function is constructed using the `new` operator. When using `bind` to create a function (supplied as a callback) inside a `setTimeout`, any primitive value passed as `thisArg` is converted to object. If no arguments are provided to `bind`, the `this` of the executing scope is treated as the `thisArg` for the new function.
  * `arg1, arg2, ...` : arguments to prepend to arguments provided to the bound function when invoking the target function.

* **Returns :** a copy of the given function with the specified this value and initial arguments.

### `bind2.fn(fn, thisArg[, arg1[, arg2[, ...]]])`

Alias to `bind2(fn, thisArg[, arg1[, arg2[, ...]]])`.

### `bind2.define()`

Alias to `bind2.wrap(Function.prototype)`.

This will mutate the `Function`'s prototype, thus adding the `bind2()` and `bound` properties to every function. It is recommended to execute this once, in the beginning of the script.

e.g.:

```javascript
const bind2 = require('bind2');

// Wrap `Function.prototype`.
bind2.define();

function test() {
  return this.hello;
}
const context = { hello: 'world' };

// Use the new `bind2()` function.
const boundFn = test.bind2(context);
console.log(boundFn.context); // { hello: 'world' }
```

## License

MIT

<hr/>

<p align="center">
  Don't forget to 🌟 Star 🌟 the repo if you like this npm package !<br/>
  <a href="https://github.com/Ilshidur/bind2/issues/new">Your feedback is appreciated</a>
</p>

[version-badge]: https://img.shields.io/npm/v/bind2.svg
[version-url]: https://www.npmjs.com/package/bind2
[vulnerabilities-badge]: https://snyk.io/test/npm/bind2/badge.svg
[vulnerabilities-url]: https://snyk.io/test/npm/bind2
[dependency-badge]: https://david-dm.org/ilshidur/bind2.svg
[dependency-url]: https://david-dm.org/ilshidur/bind2
[devdependency-badge]: https://david-dm.org/ilshidur/bind2/dev-status.svg
[devdependency-url]: https://david-dm.org/ilshidur/bind2#info=devDependencies
[build-badge]: https://travis-ci.org/Ilshidur/bind2.svg
[build-url]: https://travis-ci.org/Ilshidur/bind2
[maintainability-badge]: https://api.codeclimate.com/v1/badges/cc9c243c8876cb339a0c/maintainability
[maintainability-url]: https://codeclimate.com/github/Ilshidur/bind2/maintainability
[downloads-badge]: https://img.shields.io/npm/dt/bind2.svg
[downloads-url]: https://www.npmjs.com/package/bind2
[npm-stats-badge]: https://nodei.co/npm/bind2.png?downloads=true&downloadRank=true
[npm-stats-url]: https://nodei.co/npm/bind2
