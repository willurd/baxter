// Gotta test those utilities...

unittest.section("Utilities");

unittest.testCase("toArray", {
	testExists: function () {
		this.assertFunction(toArray);
	},
	
	testArray: function () {
		var a1 = [ 1, 2, 3 ];
		var a2 = toArray(a1);
		
		this.assertTrue(a1 !== a2);
		this.assertEqual(a1, a2);
	},
	
	testArguments: function () {
		var args, arrayArgs;
		
		(function () {
			args = arguments;
			arrayArgs = toArray(arguments);
		})(1, 2, 3);
		
		this.assertNotArray(args);
		this.assertArray(arrayArgs);
		this.assertEqual(arrayArgs, [ 1, 2, 3 ]);
	},
	
	testNodeList: function () {
		var nodes = document.getElementsByTagName("td");
		var nodeArray = toArray(nodes);
		
		this.assertEqual(nodes.length, nodeArray.length);
	}
});

unittest.testCase("extend", {
	testExists: function () {
		this.assertFunction(extend);
	},
	
	testIdentity: function () {
		var obj = { one: "two" };
		
		this.assertTrue(extend(obj) === obj);
	},
	
	testExtendTarget: function () {
		var obj = { one: "two" };
		
		extend(obj, { three: "four" });
		
		this.assertEqual(obj.three, "four");
	},
	
	testOverwriteProperty: function () {
		var obj = { one: "two" };
		
		extend(obj, { one: 2 });
		
		this.assertEqual(obj.one, 2);
	},
	
	testMultipleObjects: function () {
		var obj = { one: 1 };
		
		extend(obj,
			{ two: 2 },
			{ three: 3 },
			{ four: 4 }
		);
		
		this.assertEqual(obj.one, 1);
		this.assertEqual(obj.two, 2);
		this.assertEqual(obj.three, 3);
		this.assertEqual(obj.four, 4);
	}
});

unittest.testCase("bind", {
	testExists: function () {
		this.assertFunction(bind);
	},
	
	testBoundFunction: function () {
		var fn = function () {};
		var bound = bind(this, fn);
		
		this.assertFunction(bound);
		this.assertNotEqual(fn, bound);
	},
	
	testSameReturnValue: function () {
		var fn = function (a, b) { return a * b; };
		var bound = bind(this, fn);
		
		this.assertEqual(fn(2, 3), bound(2, 3));
	},
	
	testContext: function () {
		var user = {
			firstName: "John",
			lastName: "Doe"
		};
		
		function fullName () {
			return this.firstName + " " + this.lastName;
		}
		
		this.assertEqual(fullName(), "undefined undefined");
		this.assertEqual(bind(user, fullName)(), "John Doe");
	}
});

unittest.testCase("trim", {
	testExists: function () {
		this.assertFunction(trim);
	},
	
	testLeft: function () {
		this.assertEqual(trim(" test"), "test");
	},
	
	testRight: function () {
		this.assertEqual(trim("test "), "test");
	},
	
	testBoth: function () {
		this.assertEqual(trim(" test "), "test");
	},
	
	testSpaces: function () {
		this.assertEqual(trim("           test                      "), "test");
	},
	
	testTabs: function () {
		this.assertEqual(trim("						test					"), "test");
	},
	
	testNewlines: function () {
		this.assertEqual(trim("\n\n\n\n\n\ntest\n\n\n\n\n\n\n"), "test");
	}
});

unittest.testCase("toString", {
	testExists: function () {
		this.assertFunction(toString);
	},
	
	testFunctionProperties: function () {
		var ast = new AST();
		
		ast.add(new AST.String());
		ast.add(new AST.String());
		ast.add(new AST.String());
		
		this.assertEqual(ast.toString(), "[AST length: 3]");
	}
});
