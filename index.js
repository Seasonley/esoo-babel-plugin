module.exports = function(babel) {
    var t = babel.types;

    var preCode = (function() {
	var _Op = (function(){
	    'oo disable';
	    return {
			add(a, b) {
			    if(a.__add__) return a.__add__(b);
			    else return a + b;
			},

			sub(a, b) {
			    if(a.__sub__) return a.__sub__(b);
			    else return a - b;
			},

			mul(a, b) {
			    if(a.__mul__) return a.__mul__(b);
			    else return a * b;
			},

			div(a, b) {
			    if(a.__div__) return a.__div__(b);
			    else return a / b;
			},

			mod(a, b) {
			    if(a.__mod__) return a.__mod__(b);
			    else return a % b;
			},

			pow(a, b) {
			    if(a.__pow__) return a.__pow__(b);
			    else return a ** b;
			},

			and(a, b) {
			    if(a.__and__) return a.__and__(b);
			    else return a & b;
			},

			or(a, b) {
			    if(a.__or__) return a.__or__(b);
			    else return a | b;
			},

			xor(a, b) {
			    if(a.__xor__) return a.__xor__(b);
			    else return a ^ b;
			},

			lshift(a, b) {
			    if(a.__lshift__) return a.__lshift__(b);
			    else return a << b;
			},

			rshift(a, b) {
			    if(a.__rshift__) return a.__rshift__(b);
			    else return a >> b;
			},

			lt(a, b) {
			    if(a.__lt__) return a.__lt__(b);
			    else if(b.__gt__) return b.__gt__(a);
			    else if(a.__ge__) return !a.__ge__(b);
			    else return a < b;
			},

			gt(a, b) {
			    if(a.__gt__) return a.__gt__(b);
			    else if(b.__lt__) return b.__lt__(a);
			    else if(a.__le__) return !a.__le__(b);
			    else return a > b;
			},

			le(a, b) {
			    if(a.__le__) return a.__le__(b);
			    else if(b.__ge__) return b.__ge__(a);
			    else if(a.__gt__) return !a.__gt__(b);
			    else return a <= b;
			},

			ge(a, b) {
			    if(a.__ge__) return a.__ge__(b);
			    else if(b.__le__) return b.__le__(a);
			    else if(a.__lt__) return !a.__lt__(b);
			    else return a >= b;
			},

			eq(a, b) {
			    if(a.__eq__) return a.__eq__(b);
			    else if(a.__ne__) return !a.__ne__(b);
			    else if(b.__eq__) return b.__eq__(a);
			    else if(b.__ne__) return !b.__ne__(a);
			    else return a == b;
			},

			ne(a, b) {
			    if(a.__ne__) return a.__ne__(b);
			    else if(a.__eq__) return !a.__eq__(b);
			    else if(b.__ne__) return b.__ne__(a);
			    else if(b.__eq__) return !b.__eq__(a);
			    else return a != b;
			},
			neg(a){
			    if(a.__neg__) return a.__neg__(a);
			    else return -a;
			},
			pos(a){
			    if(a.__pos__) return a.__pos__(a);
			    else return +a;
			},
			invert(a){
			    if(a.__invert__) return a.__invert__(a);
			    else return ~a;
			},

	    };
	})();
    }).toString();

    preCode = preCode.slice(preCode.indexOf('{') + 1, preCode.lastIndexOf('}'));

    var preCodeAST = babel.template(preCode)({});

    function initStatus(path) {
		var firstBlockStatement = path.findParent(path => t.isBlockStatement(path.node) || t.isProgram(path.node));
		if(firstBlockStatement) {
		    for(directiveID in firstBlockStatement.node.directives) {
				let directive = firstBlockStatement.node.directives[directiveID];
				if(directive.value.value === 'oo disable'){
				    path.node.OO_HAVE_DEFAULT = true;
				    path.node.OO_STATUS = false;
				    break;
				} else if(directive.value.value === 'oo enable'){
				    path.node.OO_HAVE_DEFAULT = true;
				    path.node.OO_STATUS = true;
				    break;
				}
		    }
		    if(!path.node.OO_HAVE_DEFAULT && firstBlockStatement.node.OO_HAVE_DEFAULT) {
				path.node.OO_HAVE_DEFAULT = true;
				path.node.OO_STATUS = firstBlockStatement.node.OO_STATUS;
		    }
		}
		if(!path.node.OO_HAVE_DEFAULT) {
		    path.node.OO_HAVE_DEFAULT = true;
		    path.node.OO_STATUS = false;
		}
    }

    return {
		visitor: {
		    Program(path) {
				path.node.directives.some(d=>d.value.value==='oo enable')&&path.unshiftContainer('body', preCodeAST);
		    },
		    BlockStatement(path) {
				initStatus(path);
		    },
		    BinaryExpression(path) {
				initStatus(path);
				if(!path.node.OO_STATUS) return;
				var tab2 = {
				    '+': 'add',
				    '-': 'sub',
				    '*': 'mul',
				    '/': 'div',
				    '%': 'mod',
				    '**': 'pow',

				    '&': 'and',
				    '|': 'or',
				    '^': 'xor',
				    '<<': 'lshift',
				    '>>': 'rshift',
				    
				    '<': 'lt',
				    '>': 'gt',
				    '<=': 'le',
				    '>=': 'ge',
				    '==': 'eq',
				    '===': 'eq',
				    '!=': 'ne',
				    '!==': 'ne',
				};
				if(path.node.operator in tab2){
					path.replaceWith(
					    t.callExpression(
						t.MemberExpression(t.identifier('_Op'), t.identifier(tab2[path.node.operator])),
						[path.node.left, path.node.right]
					    )
					);
				}
		    },
		    UnaryExpression(path) {
				initStatus(path);
				if(!path.node.OO_STATUS) return;
				var tab1={
					'-':'neg',
					'+':'pos',
					'~':'invert',
				}
				if(path.node.operator in tab1){
					path.replaceWith(
					    t.callExpression(
						t.MemberExpression(t.identifier('_Op'), t.identifier(tab1[path.node.operator])),
						[path.node.argument]
					    )
					);
				}

		    }
		},
    };
};