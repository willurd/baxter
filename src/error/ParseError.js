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
