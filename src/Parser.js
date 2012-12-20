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
	
	parseEscapedCharacter: function (buffer, ast) {
		
	},
	
	/**
	 * Strings are anything that's not a directive.
	 */
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
		
		ast.add(new AST.String(chars.join("")));
	},
	
	/**
	 * A directive is any sequence that starts with '{'.
	 */
	parseDirective: function (buffer, ast) {
		
	},
	
	/**
	 * A variable is a directive for placing a value from the environment into
	 * the resulting string.
	 */
	parseVariableDirective: function (buffer, ast) {
		
	}
});
