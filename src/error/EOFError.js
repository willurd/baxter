function EOFError (message) {
	this.message = message;
	this.name = "EOFError";
}

EOFError.prototype = extend(new Error(), {
	
});
