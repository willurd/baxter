function Buffer (string) {
	if (typeof string !== "string") {
		throw new TypeError("Buffer expects a string");
	}
	
	this.string = string;
	this.position = -1;
	this.line = 0;
	this.column = 0;
}

// Class properties.
extend(Buffer, {
	className: "Buffer"
});

// Instance properties.
extend(Buffer.prototype, {
	constructor: Buffer,
	
	toString: function () {
		return toString(this, "position", "line", "column");
	},
	
	eof: function () {
		return this.position >= (this.string.length - 1);
	},
	
	peek: function (offset) {
		if (this.eof()) {
			throw new EOFError();
		}
		
		return this.string[this.position + (offset || 1)];
	},
	
	next: function (offset) {
		var value, chr;
		
		offset = offset || 1;
		
		value = [];
		
		while (offset > 0) {
			if (this.eof()) {
				throw new EOFError();
			}
			
			this.position++;
			chr = this.string[this.position];
			value.push(chr);
			offset--;
			
			// Update the line/column for debugging.
			if (chr == "\n" || chr == "\r") {
				this.line++;
				this.column = 0;
			} else {
				this.column++;
			}
		}
		
		return value.join("");
	}
});
