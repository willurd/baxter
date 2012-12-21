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
		if (!(template in this.cache)) {
			this.register(template, template);
		}
		
		return this.cache[template];
	}
});
