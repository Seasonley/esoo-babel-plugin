module.exports = function(babel) {
    var t = babel.types;

    var preCode=require('./precode.js');

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