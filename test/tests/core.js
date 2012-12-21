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
