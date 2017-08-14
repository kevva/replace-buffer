# replace-buffer [![Build Status](https://travis-ci.org/kevva/replace-buffer.svg?branch=master)](https://travis-ci.org/kevva/replace-buffer)

> Replace matches in a Buffer


## Install

```
$ npm install replace-buffer
```


## Usage

```js
const replaceBuffer = require('replace-buffer');

const input = Buffer.from('My friend has a dog. I want a dog too!');

replaceBuffer(input, 'dog', 'unicorn').toString();
//=> 'My friend has a unicorn. I want a unicorn too!'
```


## API

### replaceBuffer(input, needle, replacement, [options])

Returns a new `Buffer` with all needle matches replaced with replacement.

#### input

Type: `Buffer`

`Buffer` to work on.

#### needle

Type: `string`

String to match in `input`.

#### replacement

Type: `string` `Function`

Replacement for needle matches.

If a function, it receives the following arguments; the `needle`, the match count, and the `input`:

```js
replaceBuffer(Buffer.from('Foo Unicorn Bar'), 'Unicorn', (needle, matchCount, input) => `${needle}❤️`);
//=> 'Foo Unicorn❤️ Bar'
```

#### options

Type: `Object`

##### fromIndex

Type: `number`<br>
Default: `0`

Index at which to start replacing.


## License

MIT © [Kevin Mårtensson](http://github.com/kevva)
