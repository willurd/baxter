// TODO: Test each part of the baxter syntax, language and standard tag library.

unittest.testCase("Baxter.js Smoke Test", {
	testExists: function () {
		this.assertFunction(baxter);
	},
	
	testNoContext: function () {
		this.assertEqual(baxter("test"), "test");
	},
	
	testBasicString: function () {
		var string = "This is a test";
		
		this.assertEqual(baxter(string), string);
	},
	
	testEscapedCharacters: function () {
		this.assertEqual(baxter("\\n"), "n");
		this.assertEqual(baxter("\\"), "");
		this.assertEqual(baxter("\\\\"), "\\");
		this.assertEqual(baxter("\\\\\\\\"), "\\\\");
	},
	
	testEscapedVariable: function () {
		this.assertEqual(baxter("\\{\\{ test }}"), "{{ test }}");
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
	},
	
	testMissingValue: function () {
		var template = "This is a {{ adjective }} test of something";
		var text = baxter(template, {});
		
		this.assertEqual(text, "This is a  test of something");
	},
	
	testNestedValue: function () {
		var text = baxter("Your name: {{ user.name }}", { user: { name: "Bob" }});
		
		this.assertEqual(text, "Your name: Bob");
	}
	
	// testMethodCallWithNoArguments
	// testMethodCallWithArguments
});
