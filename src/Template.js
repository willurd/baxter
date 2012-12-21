function Template (id, content) {
	this.id = id;
	this.content = content;
	this.ast = Parser.parse(content);
}

// Class properties.
extend(Template, {
	className: "Template"
});

// Instance properties.
extend(Template.prototype, {
	constructor: Template,
	
	toString: function () {
		return toString(this, "id", "ast");
	},
	
	evaluate: function (context) {
		return this.ast.evaluate(context);
	}
});
