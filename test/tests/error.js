unittest.section("Errors");

unittest.testCase("EOFError", {
	testExists: function () {
		this.assertFunction(EOFError);
	},
	
	testIsError: function () {
		this.assertInstanceOf(new EOFError(), Error);
	}
});

unittest.testCase("ParseError", {
	testExists: function () {
		this.assertFunction(ParseError);
	},
	
	testIsError: function () {
		this.assertInstanceOf(new ParseError(), Error);
	}
});
