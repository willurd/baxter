unittest.section("Core");

unittest.testCase("Environment", {
	testExists: function () {
		this.assertFunction(Environment);
	},
	
	testBasicValue: function () {
		var env = new Environment({ test: "value" });
		
		this.assertEqual(env.resolve("test"), "value");
	},
	
	testObjectIdentity: function () {
		var obj = {a: 1, b: 2};
		var env = new Environment({ obj: obj });
		
		this.assertTrue(env.resolve("obj") === obj);
	},
	
	testDotNotation: function () {
		var env = new Environment({ a: { b: { c: 123 } } });
		
		this.assertEqual(env.resolve("a.b.c"), 123);
	}
});

unittest.testCase("Buffer", {
	testExists: function () {
		this.assertFunction(Buffer);
	}
	
	// TEST:
	//   peek, next
	//   eof
	//   line/column numbers
});

unittest.testCase("Parser", {
	testExists: function () {
		this.assertFunction(Parser);
	},
	
	testString: function () {
		var parser = new Parser();
		var ast = parser.parse("this is a string");
		var node = ast.get(0);
		
		this.assertEqual(ast.length(), 1);
		this.assertInstanceOf(node, AST.String);
		this.assertEqual(node.value, "this is a string");
	},
	
	testVariable: function () {
		var parser = new Parser();
		var ast = parser.parse("{{ test }}");
		var node = ast.get(0);
		
		this.assertEqual(ast.length(), 1);
		this.assertInstanceOf(node, AST.Variable);
		this.assertEqual(node.name, "test");
	},
	
	testDotNotation: function () {
		var parser = new Parser();
		var ast = parser.parse("{{ this.is.a.test }}");
		var node = ast.get(0);
		
		this.assertEqual(ast.length(), 1);
		this.assertInstanceOf(node, AST.Variable);
		this.assertEqual(node.name, "this.is.a.test");
	},
	
	testMultipleValues: function () {
		var parser = new Parser();
		var ast = parser.parse("this {{ is }} an {{ awesome }} test");
		
		this.assertEqual(ast.length(), 5);
		
		this.assertInstanceOf(ast.get(0), AST.String);
		this.assertEqual(ast.get(0).value, "this ");
		
		this.assertInstanceOf(ast.get(1), AST.Variable);
		this.assertEqual(ast.get(1).name, "is");
		
		this.assertInstanceOf(ast.get(2), AST.String);
		this.assertEqual(ast.get(2).value, " an ");
		
		this.assertInstanceOf(ast.get(3), AST.Variable);
		this.assertEqual(ast.get(3).name, "awesome");
		
		this.assertInstanceOf(ast.get(4), AST.String);
		this.assertEqual(ast.get(4).value, " test");
	}
	
	// TEST:
	//   function calls
	//   function calls with template arguments
	//   statements
});

unittest.testCase("Template", {
	testExists: function () {
		this.assertFunction(Template);
	}
});
