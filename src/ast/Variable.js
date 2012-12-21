AST.Variable = function (name) {
	this.name = name;
};

// Class properties.
extend(AST.Variable, {
	
});

// Instance properties.
AST.Variable.prototype = extend(new AST.Node(), {
	evaluate: function (env) {
		return env.get(this.name);
	}
});
