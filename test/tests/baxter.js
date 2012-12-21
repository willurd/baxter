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
		var text = baxter("Your name: {{ user.name }}", { user: { name: "Bob" } });
		
		this.assertEqual(text, "Your name: Bob");
	},
	
	testShallowMissingNestedValue: function () {
		var text = baxter("Your name: {{ user.name }}", { user: {} });
		
		this.assertEqual(text, "Your name: ");
	},
	
	testDeepMissingNestedValue: function () {
		var text = baxter("Your name: {{ account.user.name }}", { account: {} });
		
		this.assertEqual(text, "Your name: ");
	},
	
	testFunctionCall: function () {
		var user = {
			firstName: "John",
			lastName: "Doe",
			fullName: function () {
				return this.firstName + " " + this.lastName;
			}
		};
		var template = "Your name is: {{ fullName() }}";
		var text = baxter(template, user);
		
		this.assertEqual(text, "Your name is: John Doe");
	},
	
	testMissingFunctionCall: function () {
		var template = "This function doesn't exist: {{ whereAmI() }}";
		this.todo("Write me");
	},
	
	testMethodCall: function () {
		var template = "Your name is: {{ user.fullName() }}";
		this.todo("Write me");
	},
	
	testMissingMethodCall: function () {
		var template = "This method doesn't exist: {{ user.whereAmI() }}";
		this.todo("Write me");
	},
	
	testMethodCallWithArguments: function () {
		var template = "The square root of 2 is {{ sqrt(2) }}";
		this.todo("Write me");
	},
	
	testChainedMethodCalls: function () {
		var context = {
			getUserManager: function () {
				return {
					getUser: function (firstName, lastName) {
						return {
							fullName: function () {
								return firstName + " " + lastName;
							}
						};
					}
				};
			}
		};
		var template = "User name: {{ getUserManager().getUser('John', 'Doe').getFullName() }}";
		var text = baxter(template, context);
		
		this.assertEqual(text, "User name: John Doe");
	},
	
	testVariableInMethodCall: function () {
		var template = "The name of the number {{ number }} is {{ numberName({{ number }}) }}";
		this.todo("Write me");
	}
});
