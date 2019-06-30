# esoo-babel-plugin(https://npmjs.org/package/esoo-babel-plugin)

[![NPM](https://nodei.co/npm/esoo-babel-plugin.png)](https://npmjs.org/package/esoo-babel-plugin)

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status](https://coveralls.io/repos/github/Seasonley/esoo-babel-plugin/badge.svg?branch=master)](https://coveralls.io/github/Seasonley/esoo-babel-plugin?branch=master)
[![Downloads][downloads-image]][npm-url]
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FSeasonley%2Fesoo-babel-plugin.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FSeasonley%2Fesoo-babel-plugin?ref=badge_shield)


A babel-plugin for ES operator overload. 

Write the operator overload like **python**.


## How to use

1. install package

    ```
    npm install esoo-babel-plugin
    ```
2. add plugin in **.babelrc**

    ```
    "plugins": ["esoo-babel-plugin"]
    ```
3. write your operator in a **Class** like this

    ```js
    class Vector{

        constructor(x,y){
            [this.x,this.y]=[x,y]
        }

        toString(){
            return `Vector(${this.x},${this.y})`;
        }

        __add__(b){
            return new Vector(this.x + b.x, this.y + b.y);
        }

        __mul__(b){
            return new Vector(this.x * b, this.y * b);
        }

        __eq__(b){
            return this.x == b.x && this.y == b.y;
        }
    }
    ```
4. import Vector and add `'oo enable';`

    ```js
    'oo enable';
    const Vector=require('../Vector')

    let a = new Vector(1, 2), b = new Vector(2, 4);

    console.log(`${a + b * 5}`);
    //Vector(11,22)
    console.log(a === b - a);
    //true
    ```

## Examples

You can find demo in `/examples`, then build and run as follow:

```
cd examples
npm i
npm run build
cd lib
node index.js
```

## Document

- BinaryExpression

|op| function | node.left|node.right|
|-|-|-|-|
|`+`| `__add__(b)`|`this`|`b`|
|`-`| `__sub__(b)`|`this`|`b`|
|`*`| `__mul__(b)`|`this`|`b`|
|`/`| `__div__(b)`|`this`|`b`|
|`%`| `__mod__(b)`|`this`|`b`|
|`**`| `__pow__(b)`|`this`|`b`|
|`&`| `__and__(b)`|`this`|`b`|
|`\|`| `__or__(b)`|`this`|`b`|
|`^`| `__xor__(b)`|`this`|`b`|
|`<<`| `__lshift__(b)`|`this`|`b`|
|`>>`| `__rshift__(b)`|`this`|`b`|
|`<`| `__lt__(b)`|`this`|`b`|
|`>`| `__gt__(b)`|`this`|`b`|
|`<=`| `__le__(b)`|`this`|`b`|
|`>=`| `__ge__(b)`|`this`|`b`|
|`==`| `__eq__(b)`|`this`|`b`|
|`===`| `__eq__(b)`|`this`|`b`|
|`!=`| `__ne__(b)`|`this`|`b`|

- UnaryExpression

|op| function name|node.left|node.right|
|-|-|-|-|
|`-`| `__neg__()`||`this`|
|`+`| `__pos__()`||`this`|
|`~`| `__invert__()`||`this`|



[downloads-image]: http://img.shields.io/npm/dm/esoo-babel-plugin.svg
[npm-url]: https://npmjs.org/package/esoo-babel-plugin
[npm-image]: http://img.shields.io/npm/v/esoo-babel-plugin.svg

[travis-url]: https://travis-ci.org/Seasonley/esoo-babel-plugin
[travis-image]: http://img.shields.io/travis/Seasonley/esoo-babel-plugin.svg