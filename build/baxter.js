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

function EOFError (message) {
	this.message = message;
	this.name = "EOFError";
}

EOFError.prototype = extend(new Error(), {
	
});

function Environment (context) {
	this.context = context;
}

// Class properties.
extend(Environment, {
	
});

// Instance properties.
extend(Environment.prototype, {
	
});

function Buffer (string) {
	if (typeof string !== "string") {
		throw new TypeError("Buffer expects a string");
	}
	
	this.string = string;
	this.position = 0;
}

// Class properties.
extend(Buffer, {
	
});

// Instance properties.
extend(Buffer.prototype, {
	peek: function () {
		return this.string[this.position];
	},
	
	next: function () {
		return this.string[this.position++];
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
		var templateId, template, context;
		
		if (typeof a !== "string") {
			throw new TypeError("Unknown template or template id: " + a);
		}
		
		if (typeof b === "string") {
			return this.register(a, b);
		} else if (typeof b === "object") {
			return this.evaluate(a, b);
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
				text.push(tpl.evaluate(context[i]));
			}
			
			return text.join("\n");
		} else {
			return tpl.evaluate(context);
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
