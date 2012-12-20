AST.String = function (string) {
	this.string = string;
}

// Class properties.
extend(AST.String, {
	
});

// Instance properties.
AST.String.prototype = extend(new AST.Node(), {
	evaluate: function (env) {
		console.log(this, this instanceof AST.String, this.string);
		return this.string;
	}
});
