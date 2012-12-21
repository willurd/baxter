AST.Node = function () {
	
};

// Class properties.
extend(AST.Node, {
	className: "AST.Node"
});

// Instance properties.
extend(AST.Node.prototype, {
	constructor: AST.Node,
	
	toString: function () {
		return toString(this);
	},
	
	evaluate: function (env) {
		return undefined;
	}
});
