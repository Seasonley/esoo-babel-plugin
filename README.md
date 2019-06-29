# esoo-babel-plugin

A babel-plugin for ES operator overload. 


## How to use

1. install package
    ```
    npm install esoo-babel-plugin
    ```
2. add plugin in `.babelrc`
    ```
    "plugins": ["esoo-babel-plugin"]
    ```
3. write your operator in a `Class` like this
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
4. import Vector and add `oo enable`
    ```js
    'oo enable';
    const Vector=require('../Vector')

    let a = new Vector(1, 2), b = new Vector(2, 4);

    console.log(`${a + b * 5}`);
    //Vector(11,22)
    console.log(a === b - a);
    //true
    ```
## examples

You can find demo in `/examples`, then build and run as follow:

```
cd examples
npm i
npm run build
cd lib
ndoe index.js
```

## Document

- BinaryExpression

|op| function name|
|-|-|
|`+`| `__add__(a,b)`|
|`-`| `__sub__(a,b)`|
|`*`| `__mul__(a,b)`|
|`/`| `__div__(a,b)`|
|`%`| `__mod__(a,b)`|
|`**`| `__pow__(a,b)`|
|`&`| `__and__(a,b)`|
|`|`| `__or__(a,b)`|
|`^`| `__xor__(a,b)`|
|`<<`| `__lshift__(a,b)`|
|`>>`| `__rshift__(a,b)`|
|`<`| `__lt__(a,b)`|
|`>`| `__gt__(a,b)`|
|`<=`| `__le__(a,b)`|
|`>=`| `__ge__(a,b)`|
|`==`| `__eq__(a,b)`|
|`===`| `__eq__(a,b)`|
|`!=`| `__ne__(a,b)`|

- UnaryExpression

|op| function name|
|-|-|
|`-`| `__neg__(a)`|
|`+`| `__pos__(a)`|
|`~`| `__invert__(a)`|