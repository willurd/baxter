function Template (id, content) {
	this.id = id;
	this.content = content;
	this.ast = Parser.parse(content);
}

// Class properties.
extend(Template, {
	
});

// Instance properties.
extend(Template.prototype, {
	evaluate: function (context) {
		return this.ast.evaluate(context);
	}
});
