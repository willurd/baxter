unittest.section("Abstract Syntax Tree");

unittest.testCase("AST", {
	testExists: function () {
		this.assertFunction(AST);
	}
});

unittest.testCase("AST.Node", {
	testExists: function () {
		this.assertFunction(AST.Node);
	},
	
	testEvaluatesToNothing: function () {
		var env = new Environment();
		var node = new AST.Node();
		
		this.assertUndefined(node.evaluate(env));
	}
});

unittest.testCase("AST.String", {
	testExists: function () {
		this.assertFunction(AST.String);
	},
	
	testEvaluatesToExactString: function () {
		var env = new Environment();
		var string = "This is a test";
		var node = new AST.String(string);
		
		this.assertEqual(node.evaluate(env), string);
	}
});

unittest.testCase("AST.Variable", {
	testExists: function () {
		this.assertFunction(AST.Variable);
	}
});
