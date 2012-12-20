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
