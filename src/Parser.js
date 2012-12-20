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
		
		while (!buffer.eof()) {
			this.parseNext(buffer, ast);
		}
		
		return ast;
	},
	
	/**
	 * Parses the next node, whatever it is.
	 */
	parseNext: function (buffer, ast) {
		var chr = buffer.peek();
		
		if (chr == "{") {
			var next = buffer.peek(2);
			if (next == "{") {
				this.parseVariable(buffer, ast);
			} else if (next == "%") {
				this.parseDirective(buffer, ast);
			} else {
				throw new ParseError("Unknown directive syntax: " + (chr + next));
			}
		} else {
			this.parseString(buffer, ast);
		}
	},
	
	/**
	 * Strings are anything that's not a directive.
	 */
	parseString: function (buffer, ast) {
		var chars = [];
		var chr;
		
		try {
			while (buffer.peek() != "{") {
				chr = buffer.next();
				
				if (chr == "\\") {
					chars.push(buffer.next());
				} else {
					chars.push(chr);
				}
			}
		} catch (e) {
			if (!(e instanceof EOFError)) {
				throw e;
			}
		}
		
		ast.add(new AST.String(chars.join("")));
	},
	
	/**
	 * A directive is a sequence that starts with '{%' and ends with '%}'.
	 */
	parseDirective: function (buffer, ast) {
		var chr;
		
		buffer.next(2); // {%
		
		while (buffer.peek() != "%") {
			chr = buffer.next();
		}
		
		buffer.next(2); // %}
	},
	
	/**
	 * A variable is a sequence that starts with '{{' and ends with '}}'.
	 */
	parseVariable: function (buffer, ast) {
		var chr;
		var name = [];
		
		buffer.next(2); // {{
		
		while (buffer.peek() != "}") {
			chr = buffer.next();
			name.push(chr);
		}
		
		buffer.next(2); // }}
		
		ast.add(new AST.Variable(trim(name.join(""))));
	}
});
