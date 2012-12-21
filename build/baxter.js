/**
 * TODO: Copyright goes here.
 */
(function (global, undefined) {
	"use strict";
	
	var baxter;
	var alias = "tt";
	var previousAtAlias = global[alias];

function toArray (object, start) {
	return Array.prototype.slice.call(object, start || 0);
}

function extend (target /*, ...objects */) {
	var objects = toArray(arguments, 1);
	
	for (var i = 0, len = objects.length; i < len; i++) {
		var object = objects[i];
		
		for (var key in object) {
			target[key] = object[key];
		}
	}
	
	return target;
}

function bind (context, fn) {
	return function () {
		return fn.apply(context, arguments);
	};
}

function trim (string) {
	return string.replace(/^\s+|\s+$/g, "");
}

/**
 * TODO: This function is pretty gross.
 */
function toString (object /*, properties */) {
	var properties = toArray(arguments, 1);
	var parts = ["[", object.constructor.className];
	var propertyStrings = [];
	var property, value;
	
	if (properties.length > 0) {
		for (var i = 0; i < properties.length; i++) {
			property = properties[i];
			
			if (property instanceof Array) {
				value = property[1](object);
				property = property[0];
			} else {
				if (typeof object[property] === "string") {
					value = "'" + object[property].replace(/'/g, "\\'") + "'";
				} else {
					value = object[property];
				}
			}
			
			if (typeof value === "function") {
				value = value.apply(object);
			}
			
			propertyStrings.push(property + ": " + value);
		}
		
		parts.push(" ");
		parts.push(propertyStrings.join(", "));
	}
	
	parts.push("]");
	
	return parts.join("");
}

function EOFError (message) {
	this.message = message;
	this.name = "EOFError";
}

// Class properties.
extend(EOFError, {
	className: "EOFError"
});

// Instance properties.
EOFError.prototype = extend(new Error(), {
	constructor: EOFError,
	
	toString: function () {
		return toString(this, "message");
	}
});

function ParseError (message) {
	this.message = message;
	this.name = "ParseError";
}

// Class properties.
extend(ParseError, {
	className: "ParseError"
});

// Instance properties.
ParseError.prototype = extend(new Error(), {
	constructor: ParseError,
	
	toString: function () {
		return toString(this, "message");
	}
});

function Environment (context) {
	this.context = context;
}

// Class properties.
extend(Environment, {
	className: "Environment"
});

// Instance properties.
extend(Environment.prototype, {
	constructor: Environment,
	
	toString: function () {
		return toString(this);
	},
	
	/**
	 * TODO: This is too simplistic and doesn't take dot paths or function
	 *       calls into consideration.
	 * TODO: This function parses the name each time. This could be bad for
	 *       performance.
	 */
	resolve: function (name) {
		var parts = name.split(".");
		var value = this.context;
		
		try {
			for (var i = 0; i < parts.length; i++) {
				value = value[parts[i]];
			}
		} catch (e) {
			// Error getting value.
			if (global.baxter.debug) {
				throw e;
			}
		}
		
		return value;
	}
});

function Buffer (string) {
	if (typeof string !== "string") {
		throw new TypeError("Buffer expects a string");
	}
	
	this.string = string;
	this.position = -1;
	this.line = 0;
	this.column = 0;
}

// Class properties.
extend(Buffer, {
	className: "Buffer"
});

// Instance properties.
extend(Buffer.prototype, {
	constructor: Buffer,
	
	toString: function () {
		return toString(this, "position", "line", "column");
	},
	
	eof: function () {
		return this.position >= (this.string.length - 1);
	},
	
	peek: function (offset) {
		if (this.eof()) {
			throw new EOFError();
		}
		
		return this.string[this.position + (offset || 1)];
	},
	
	next: function (offset) {
		var value, chr;
		
		offset = offset || 1;
		
		value = [];
		
		while (offset > 0) {
			if (this.eof()) {
				throw new EOFError();
			}
			
			this.position++;
			chr = this.string[this.position];
			value.push(chr);
			offset--;
			
			// Update the line/column for debugging.
			if (chr == "\n" || chr == "\r") {
				this.line++;
				this.column = 0;
			} else {
				this.column++;
			}
		}
		
		return value.join("");
	}
});

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

AST.Node = function () {
	
};

// Class properties.
extend(AST.Node, {
	className: "AST.Node"
});

// Instance properties.
extend(AST.Node.prototype, {
	constructor: AST.Node,
	
	toString: function () {
		return toString(this);
	},
	
	evaluate: function (env) {
		return undefined;
	}
});

AST.String = function (value, line, column) {
	this.value = value;
	this.line = line;
	this.column = column;
};

// Class properties.
extend(AST.String, {
	className: "AST.String"
});

// Instance properties.
AST.String.prototype = extend(new AST.Node(), {
	constructor: AST.String,
	
	toString: function () {
		return toString(this, "value", "line", "column");
	},
	
	evaluate: function (env) {
		return this.value;
	}
});

AST.Variable = function (name, line, column) {
	this.name = name;
	this.line = line;
	this.column = column;
};

// Class properties.
extend(AST.Variable, {
	className: "AST.Variable"
});

// Instance properties.
AST.Variable.prototype = extend(new AST.Node(), {
	constructor: AST.Variable,
	
	toString: function () {
		return toString(this, "name", "line", "column");
	},
	
	evaluate: function (env) {
		return env.resolve(this.name);
	}
});

function Parser () {
	
}

// Class properties.
extend(Parser, {
	className: "Parser",
	
	instance: new Parser(),
	
	parse: function (string) {
		return this.instance.parse(string);
	}
});

// Instance properties.
extend(Parser.prototype, {
	constructor: Parser,
	
	toString: function () {
		return toString(this);
	},
	
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
				this.parseStatement(buffer, ast);
			} else {
				throw new ParseError("Unknown statement syntax: '" + (chr + next) +
					"' (line " + buffer.line + ", column " + buffer.column);
			}
		} else {
			this.parseString(buffer, ast);
		}
	},
	
	/**
	 * Strings are anything that's not a statement.
	 */
	parseString: function (buffer, ast) {
		var line = buffer.line, column = buffer.column;
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
		
		ast.add(new AST.String(chars.join(""), line, column));
	},
	
	/**
	 * A statement is a sequence that starts with '{%' and ends with '%}'.
	 */
	parseStatement: function (buffer, ast) {
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
		var line = buffer.line, column = buffer.column;
		var chr;
		var name = [];
		
		buffer.next(2); // {{
		
		while (buffer.peek() != "}") {
			chr = buffer.next();
			name.push(chr);
		}
		
		buffer.next(2); // }}
		
		ast.add(new AST.Variable(trim(name.join("")), line, column));
	}
});

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

function Baxter () {
	this.cache = {}; // Templates by name.
}

// Class properties.
extend(Baxter, {
	className: "Baxter"
});

// Instance properties.
extend(Baxter.prototype, {
	constructor: Baxter,
	
	toString: function () {
		return toString(this);
	},
	
	clear: function () {
		this.cache = {};
	},
	
	/**
	 * The entry-point for using Baxter.
	 * 
	 * TODO: This function and/or function name sucks. Consider
	 *       exposing the entire Baxter object and simply having
	 *       different methods for registering and using templates.
	 * 
	 * Usage 1: Register a named template.
	 *   @param a (templateId) {string} The name of a registered template.
	 *   @param b (template)   {string} The template string.
	 * 
	 * Usage 2: Use a named template.
	 *   @param a (templateId) {string} The name of a registered template.
	 *   @param b (context)    {object} A non-string object or array.
	 * 
	 * Usage 3: Use an unnamed template.
	 *   @param a (template)   {string} A string that is not the name of a registered template.
	 *   @param b (context)    {object} A non-string object or array.
	 */
	template: function (a, b) {
		var templateId, template, context, bType;
		
		if (typeof a !== "string") {
			throw new TypeError("Unknown template or template id: " + a);
		}
		
		bType = typeof b;
		
		if (bType === "string") {
			return this.register(a, b);
		} else if (bType === "object" || bType === "undefined") {
			return this.evaluate(a, b || {});
		}
		
		throw new TypeError("Unknown template or context: " + b);
	},
	
	register: function (id, template) {
		this.cache[id] = new Template(id, template);
	},
	
	/**
	 * @param template {string} The template ID or contents.
	 * @param context  {object} An object or array to evaluate the template against.
	 */
	evaluate: function (template, context) {
		var tpl = this.get(template);
		
		if (context instanceof Array) {
			return context.map(function (contextItem) {
				return tpl.evaluate(new Environment(contextItem));
			}).join("\n");
		} else {
			return tpl.evaluate(new Environment(context));
		}
	},
	
	/**
	 * Returns a Template object for the given string.
	 * 
	 * @param template {string} The template ID or contents.
	 */
	get: function (template) {
		var el;
		
		if (!(template in this.cache)) {
			el = document.getElementById(template);
			
			if (el !== null) {
				// This template is in an html element.
				this.register(template, el.innerHTML);
			} else {
				// This is an unnamed template, register it with itself as its name
				// so we don't have to parse it twice.
				this.register(template, template);
			}
		}
		
		return this.cache[template];
	}
});

	baxter = new Baxter();
	baxter.template = bind(baxter, baxter.template);
	baxter.template.debug = false;
	
	baxter.template.noConflict = function () {
		global[alias] = previousAtAlias;
	};
	
	global.baxter = baxter.template;
	global[alias] = global.baxter;
})(this);
