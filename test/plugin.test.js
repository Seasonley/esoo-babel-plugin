const assert = require('assert')
const plugin=require('../index')
const babel =require( '@babel/core');
function transform(source){
    return babel.transform(source, {
	    plugins: [plugin]
    }).code
}

describe('TestPlugin', () => {
    it('no direction', () => {
      var before=`a + 1;a - 1;a * 1;a / 1;a % 1;a ** 1;a & 1;a | 1;a ^ 1;a << 1;a >> 1;a < 1;a > 1;a <= 1;a >= 1;a == 1;a === 1;a != 1;a !== 1;-a;+a;~a;`.split(';');
      before.forEach(item=>{
        assert.equal(transform(item+';'),item+';')
      })
    })
    it('with direction add', () => {
      var before=`'oo enable';a+1;`;
      var after=`_Op.add(a, 1);`;
      assert.equal(transform(before).slice(-14),after)
    })
    it('with direction sub', () => {
      var before=`'oo enable';a-1;`;
      var after=`_Op.sub(a, 1);`;
      assert.equal(transform(before).slice(-14),after)
    })
    it('with direction mul', () => {
      var before=`'oo enable';a*1;`;
      var after=`_Op.mul(a, 1);`;
      assert.equal(transform(before).slice(-14),after)
    })
    it('with direction div', () => {
      var before=`'oo enable';a/1;`;
      var after=`_Op.div(a, 1);`;
      assert.equal(transform(before).slice(-14),after)
    })
    it('with direction mod', () => {
      var before=`'oo enable';a%1;`;
      var after=`_Op.mod(a, 1);`;
      assert.equal(transform(before).slice(-14),after)
    })
    it('with direction pow', () => {
      var before=`'oo enable';a**1;`;
      var after=`_Op.pow(a, 1);`;
      assert.equal(transform(before).slice(-14),after)
    })
    it('with direction and', () => {
      var before=`'oo enable';a&1;`;
      var after=`_Op.and(a, 1);`;
      assert.equal(transform(before).slice(-14),after)
    })
    it('with direction or', () => {
      var before=`'oo enable';a|1;`;
      var after=`_Op.or(a, 1);`;
      assert.equal(transform(before).slice(-13),after)
    })
    it('with direction xor', () => {
      var before=`'oo enable';a^1;`;
      var after=`_Op.xor(a, 1);`;
      assert.equal(transform(before).slice(-14),after)
    })
    it('with direction lshift', () => {
      var before=`'oo enable';a<<1;`;
      var after=`_Op.lshift(a, 1);`;
      assert.equal(transform(before).slice(-17),after)
    })
    it('with direction rshift', () => {
      var before=`'oo enable';a>>1;`;
      var after=`_Op.rshift(a, 1);`;
      assert.equal(transform(before).slice(-17),after)
    })
    it('with direction lt', () => {
      var before=`'oo enable';a<1;`;
      var after=`_Op.lt(a, 1);`;
      assert.equal(transform(before).slice(-13),after)
    })
    it('with direction gt', () => {
      var before=`'oo enable';a>1;`;
      var after=`_Op.gt(a, 1);`;
      assert.equal(transform(before).slice(-13),after)
    })
    it('with direction le', () => {
      var before=`'oo enable';a<=1;`;
      var after=`_Op.le(a, 1);`;
      assert.equal(transform(before).slice(-13),after)
    })
    it('with direction ge', () => {
      var before=`'oo enable';a>=1;`;
      var after=`_Op.ge(a, 1);`;
      assert.equal(transform(before).slice(-13),after)
    })
    it('with direction eq', () => {
        var before=`'oo enable';a==1;`;
        var after=`_Op.eq(a, 1);`;
        assert.equal(transform(before).slice(-13),after)
        var before=`'oo enable';a===1;`;
        assert.equal(transform(before).slice(-13),after);
    })
    it('with direction ne', () => {
      var before=`'oo enable';a!=1;`;
      var after=`_Op.ne(a, 1);`;
      assert.equal(transform(before).slice(-13),after);
      var before=`'oo enable';a!==1;`;
      assert.equal(transform(before).slice(-13),after);
    })
    it('with direction neg', () => {
        var before=`'oo enable';-a;`;
        var after=`_Op.neg(a);`;
        assert.equal(transform(before).slice(-11),after)
    })
    it('with direction pos', () => {
        var before=`'oo enable';+a;`;
        var after=`_Op.pos(a);`;
        assert.equal(transform(before).slice(-11),after)
    })
    it('with direction invert', () => {
        var before=`'oo enable';~a;`;
        var after=`_Op.invert(a);`;
        assert.equal(transform(before).slice(-14),after)
    })
  })