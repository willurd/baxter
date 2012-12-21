AST.Variable = function (name, line, column) {
	this.name = name;
	this.line = line;
	this.column = column;
};

// Class properties.
extend(AST.Variable, {
	className: "AST.Variable"
});

// Instance properties.
AST.Variable.prototype = extend(new AST.Node(), {
	constructor: AST.Variable,
	
	toString: function () {
		return toString(this, "name", "line", "column");
	},
	
	evaluate: function (env) {
		return env.resolve(this.name);
	}
});
