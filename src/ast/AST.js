function AST () {
	this.tree = [];
}

// Class properties.
extend(AST, {
	
});

// Instance properties.
extend(AST.prototype, {
	evaluate: function (env) {
		return this.tree.map(function (node) {
			return node.evaluate(env);
		}).join("");
	},
	
	add: function (node) {
		this.tree.push(node);
	}
});
