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
