unittest.section("Abstract Syntax Tree");

unittest.testCase("AST", {
	testExists: function () {
		this.assertFunction(AST);
	},
	
	testEvaluateSingleStringNode: function () {
		var env = new Environment();
		var ast = new AST();
		
		ast.add(new AST.String("this is a test"));
		
		this.assertEqual(ast.evaluate(env), "this is a test");
	},
	
	testEvaluateSingleVariableNode: function () {
		var env = new Environment({ name: "value" });
		var ast = new AST();
		
		ast.add(new AST.Variable("name"));
		
		this.assertEqual(ast.evaluate(env), "value");
	},
	
	testEvaluateMultipleNodes: function () {
		var env = new Environment({ one: "two", three: "four" });
		var ast = new AST();
		
		ast.add(new AST.String("| "));
		ast.add(new AST.Variable("one"));
		ast.add(new AST.String(" | "));
		ast.add(new AST.Variable("three"));
		ast.add(new AST.String(" |"));
		
		this.assertEqual(ast.evaluate(env), "| two | four |");
	},
	
	testEvaluateDifferentEnvironments: function () {
		var ast = new AST();
		
		ast.add(new AST.Variable("one"));
		ast.add(new AST.String(" -> "));
		ast.add(new AST.Variable("two"));
		
		this.assertEqual(ast.evaluate(new Environment({ one: 1, two: 2 })), "1 -> 2");
		this.assertEqual(ast.evaluate(new Environment({ one: 3, two: 4 })), "3 -> 4");
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
	},
	
	testEvaluatesToEnvironmentValue: function () {
		var env = new Environment({ one: "two" });
		var node = new AST.Variable("one");
		
		this.assertEqual(node.evaluate(env), "two");
	},
	
	testDotNotation: function () {
		var env = new Environment({ one: { two: { three: 123 } } });
		var node = new AST.Variable("one.two.three");
		
		this.assertEqual(node.evaluate(env), 123);
	},
	
	testEvaluateDifferentEnvironments: function () {
		var node = new AST.Variable("name");
		
		this.assertEqual(node.evaluate(new Environment({ name: "John" })), "John");
		this.assertEqual(node.evaluate(new Environment({ name: "Jacob" })), "Jacob");
		this.assertEqual(node.evaluate(new Environment({ name: "Jingleheimer" })), "Jingleheimer");
		this.assertEqual(node.evaluate(new Environment({ name: "Schmidt" })), "Schmidt");
	}
});
