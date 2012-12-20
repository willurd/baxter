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
