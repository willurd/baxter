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

// TODO: Test each part of the baxter syntax, language and standard tag library.
