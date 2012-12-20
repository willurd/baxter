AST.String = function (string) {
	this.string = string;
};

// Class properties.
extend(AST.String, {
	
});

// Instance properties.
AST.String.prototype = extend(new AST.Node(), {
	evaluate: function (env) {
		return this.string;
	}
});
