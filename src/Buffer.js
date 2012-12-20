function Buffer (string) {
	if (typeof string !== "string") {
		throw new TypeError("Buffer expects a string");
	}
	
	this.string = string;
	this.position = -1;
}

// Class properties.
extend(Buffer, {
	
});

// Instance properties.
extend(Buffer.prototype, {
	eof: function () {
		return this.position > this.string.length;
	},
	
	peek: function (offset) {
		if (this.eof()) {
			throw new EOFError();
		}
		
		return this.string[this.position + (offset || 1)];
	},
	
	next: function (offset) {
		var value;
		
		offset = offset || 1;
		value = [];
		
		while (offset > 0) {
			if (this.eof()) {
				throw new EOFError();
			}
			
			this.position++;
			value.push(this.string[this.position]);
			offset--;
		}
		
		return value.join("");
	}
});
