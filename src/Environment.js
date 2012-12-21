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
