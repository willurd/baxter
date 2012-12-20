function ParseError (message) {
	this.message = message;
	this.name = "ParseError";
}

ParseError.prototype = extend(new Error(), {
	
});
