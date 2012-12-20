/**
 * TODO: Copyright goes here.
 */
(function (global, undefined) {
	"use strict";
	
	var baxter;

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
function EOFError (message) {
	this.message = message;
	this.name = "EOFError";
}

EOFError.prototype = extend(new Error(), {
	
});

function ParseError (message) {
	this.message = message;
	this.name = "ParseError";
}

ParseError.prototype = extend(new Error(), {
	
});

function Environment (context) {
	this.context = context;
}

// Class properties.
extend(Environment, {
	
});

// Instance properties.
extend(Environment.prototype, {
	evaluate: function (name) {
		// TODO: This evaluation is too simplistic and doesn't take dot paths
		//       or function calls into consideration.
		return this.context[name];
	}
});

function Buffer (string) {
	if (typeof string !== "string") {
		throw new TypeError("Buffer expects a string");
	}
	
	this.string = string;
	this.position = -1;
}

// Class properties.
extend(Buffer, {
	
});

// Instance properties.
extend(Buffer.prototype, {
	eof: function () {
		return this.position > this.string.length;
	},
	
	peek: function (offset) {
		if (this.eof()) {
			throw new EOFError();
		}
		
		return this.string[this.position + (offset || 1)];
	},
	
	next: function (offset) {
		var value;
		
		offset = offset || 1;
		value = [];
		
		while (offset > 0) {
			if (this.eof()) {
				throw new EOFError();
			}
			
			this.position++;
			value.push(this.string[this.position]);
			offset--;
		}
		
		return value.join("");
	}
});

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

AST.Node = function () {
	
};

// Class properties.
extend(AST.Node, {
	
});

// Instance properties.
extend(AST.Node.prototype, {
	evaluate: function (env) {
		return undefined;
	}
});

AST.String = function (string) {
	this.string = string;
};

// Class properties.
extend(AST.String, {
	
});

// Instance properties.
AST.String.prototype = extend(new AST.Node(), {
	evaluate: function (env) {
		return this.string;
	}
});

AST.Variable = function (name) {
	this.name = name;
};

// Class properties.
extend(AST.Variable, {
	
});

// Instance properties.
AST.Variable.prototype = extend(new AST.Node(), {
	evaluate: function (env) {
		return env.evaluate(this.name);
	}
});

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

function Baxter () {
	this.cache = {}; // Templates by name.
}

// Class properties.
extend(Baxter, {
	
});

// Instance properties.
extend(Baxter.prototype, {
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
		var text;
		
		if (context instanceof Array) {
			text = [];
			
			for (var i = 0, len = context.length; i < len; i++) {
				text.push(tpl.evaluate(new Environment(context[i])));
			}
			
			return text.join("\n");
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
		if (!(template in this.cache)) {
			this.register(template, template);
		}
		
		return this.cache[template];
	}
});

	baxter = new Baxter();
	global.baxter = bind(baxter, baxter.template);
})(this);
