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

// ======================================================================
// Core
// ======================================================================

unittest.section("Core");

unittest.testCase("Environment", {
	testExists: function () {
		this.assertFunction(Environment);
	},
	
	testBasicValue: function () {
		var env = new Environment({ test: "value" });
		
		this.assertEqual(env.get("test"), "value");
	},
	
	testObjectIdentity: function () {
		var obj = {a: 1, b: 2};
		var env = new Environment({ obj: obj });
		
		this.assertEqual(env.get("obj"), obj);
	},
	
	testDotNotation: function () {
		var env = new Environment({ a: { b: { c: 123 } } });
		
		this.assertEqual(env.get("a.b.c"), 123);
	}
});

unittest.testCase("Buffer", {
	testExists: function () {
		this.assertFunction(Buffer);
	}
});

unittest.testCase("Parser", {
	testExists: function () {
		this.assertFunction(Parser);
	}
});

unittest.testCase("Template", {
	testExists: function () {
		this.assertFunction(Template);
	}
});

// ======================================================================
// Errors
// ======================================================================

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

// ======================================================================
// Abstract Syntax Tree
// ======================================================================

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

// TODO: Test each part of the baxter syntax, language and standard tag library.
