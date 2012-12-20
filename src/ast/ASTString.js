function ASTString (string) {
	return this.string;
}

// Class properties.
extend(ASTString, {
	
});

// Instance properties.
extend(ASTString.prototype, {
	evaluate: function (env) {
		return this.string;
	}
});
