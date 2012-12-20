function Baxter () {
	
}

// Class properties.
extend(Baxter, {
	/**
	 * The entry-point for using Baxter.
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
	main: function (a, b) {
		var templateId, template, context;
		
		if (typeof a !== "string") {
			throw new TypeError("Unknown template or template id: " + a);
		}
		
		if (typeof b === "string") {
			// Register a named template.
		} else if (typeof b === "object") {
			
		}
	}
});

// Instance properties.
extend(Baxter.prototype, {
	
});
