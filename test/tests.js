unittest.testCase("Baxter.js Smoke Test", {
	testBaxterIsAFunction: function () {
		this.assertFunction(baxter);
	},
	
	testUnnamedTemplate: function () {
		var template = "My name is {{ name }}";
		var context = { name: "Bob" };
		var text = baxter(template, context);
		
		this.assertEqual(text, "My name is Bob");
	}
});

unittest.testCase("String Interpolation", {
	testBasicStringInterpolation: function () {
		var template = "This is {{ article }} {{ adjective }} string";
		var context = { article: "an", adjective: "awesome" };
		var text = baxter(template, context);
		
		this.assertEqual(text, "This is an awesome string");
	}
	
	// testMissingContext
	// testNestedContext
	// testMethodCallWithNoArguments
	// testMethodCallWithArguments
});

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

// TODO: Test each part of the baxter syntax, language and standard tag library.
