function Parser () {
	
}

// Class properties.
extend(Parser, {
	instance: new Parser(),
	
	parse: function (string) {
		return this.instance.parse(string);
	}
});

// Instance properties.
extend(Parser.prototype, {
	parse: function (string) {
		var buffer = new Buffer(string);
		var ast = new AST();
		
		this.parseString(buffer, ast);
		
		return ast;
	},
	
	parseString: function (buffer, ast) {
		var chars = [];
		
		try {
			while (buffer.peek() != "{") {
				chars.push(buffer.next());
			}
		} catch (e) {
			if (!(e instanceof EOFError)) {
				throw e;
			}
		}
		
		ast.add(new ASTString(chars.join("")));
	},
	
	parseVariable: function (buffer, ast) {
		
	}
});
