# bind2

Enhanced Javascript `bind()` function.

## Features

* **Does not break the original `bind` API**.
* Immutable.
* New properties assigned to each bound function :
  * `unbind()` (Function). Will return the original unbound function.
  * `context` (Any). Get the function context without executing it.
* Additional properties in the function context :
  * `bound` (Boolean). Returns `true` if the function has been bound with `bind2`.

## API

TODO:

## License

MIT
