'oo enable';

var _Op = function () {
  'oo disable';

  return {
    add(a, b) {
      if (a.__add__) return a.__add__(b);else return a + b;
    },

    sub(a, b) {
      if (a.__sub__) return a.__sub__(b);else return a - b;
    },

    mul(a, b) {
      if (a.__mul__) return a.__mul__(b);else return a * b;
    },

    div(a, b) {
      if (a.__div__) return a.__div__(b);else return a / b;
    },

    mod(a, b) {
      if (a.__mod__) return a.__mod__(b);else return a % b;
    },

    pow(a, b) {
      if (a.__pow__) return a.__pow__(b);else return a ** b;
    },

    and(a, b) {
      if (a.__and__) return a.__and__(b);else return a & b;
    },

    or(a, b) {
      if (a.__or__) return a.__or__(b);else return a | b;
    },

    xor(a, b) {
      if (a.__xor__) return a.__xor__(b);else return a ^ b;
    },

    lshift(a, b) {
      if (a.__lshift__) return a.__lshift__(b);else return a << b;
    },

    rshift(a, b) {
      if (a.__rshift__) return a.__rshift__(b);else return a >> b;
    },

    lt(a, b) {
      if (a.__lt__) return a.__lt__(b);else if (b.__gt__) return b.__gt__(a);else if (a.__ge__) return !a.__ge__(b);else return a < b;
    },

    gt(a, b) {
      if (a.__gt__) return a.__gt__(b);else if (b.__lt__) return b.__lt__(a);else if (a.__le__) return !a.__le__(b);else return a > b;
    },

    le(a, b) {
      if (a.__le__) return a.__le__(b);else if (b.__ge__) return b.__ge__(a);else if (a.__gt__) return !a.__gt__(b);else return a <= b;
    },

    ge(a, b) {
      if (a.__ge__) return a.__ge__(b);else if (b.__le__) return b.__le__(a);else if (a.__lt__) return !a.__lt__(b);else return a >= b;
    },

    eq(a, b) {
      if (a.__eq__) return a.__eq__(b);else if (a.__ne__) return !a.__ne__(b);else if (b.__eq__) return b.__eq__(a);else if (b.__ne__) return !b.__ne__(a);else return a == b;
    },

    ne(a, b) {
      if (a.__ne__) return a.__ne__(b);else if (a.__eq__) return !a.__eq__(b);else if (b.__ne__) return b.__ne__(a);else if (b.__eq__) return !b.__eq__(a);else return a != b;
    },

    neg(a) {
      if (a.__neg__) return a.__neg__(a);else return -a;
    },

    pos(a) {
      if (a.__pos__) return a.__pos__(a);else return +a;
    },

    invert(a) {
      if (a.__invert__) return a.__invert__(a);else return ~a;
    }

  };
}();

const Vector = require('../Vector');

const String = require('../String');

let a = new Vector(1, 2),
    b = new Vector(2, 4);
console.log(`${_Op.add(a, _Op.mul(b, 5))}`);
console.log(_Op.eq(a, _Op.sub(b, a)));
let c = 'Unbelievable!';

let d = _Op.mul(c, 3);

console.log(d);