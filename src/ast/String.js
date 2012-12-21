AST.String = function (value, line, column) {
	this.value = value;
	this.line = line;
	this.column = column;
};

// Class properties.
extend(AST.String, {
	className: "AST.String"
});

// Instance properties.
AST.String.prototype = extend(new AST.Node(), {
	constructor: AST.String,
	
	toString: function () {
		return toString(this, "value", "line", "column");
	},
	
	evaluate: function (env) {
		return this.value;
	}
});
