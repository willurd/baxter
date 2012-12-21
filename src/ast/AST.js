function AST () {
	this.tree = [];
}

// Class properties.
extend(AST, {
	className: "AST"
});

// Instance properties.
extend(AST.prototype, {
	constructor: AST,
	
	toString: function () {
		return toString(this, "length");
	},
	
	evaluate: function (env) {
		return this.tree.map(function (node) {
			return node.evaluate(env);
		}).join("");
	},
	
	length: function () {
		return this.tree.length;
	},
	
	add: function (node) {
		this.tree.push(node);
	},
	
	get: function (index) {
		return this.tree[index];
	}
});
