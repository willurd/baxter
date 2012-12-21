// TODO: Test each part of the baxter syntax, language and standard tag library.

unittest.testCase("Baxter.js Smoke Test", {
	testExists: function () {
		this.assertFunction(baxter);
	},
	
	testAlias: function () {
		this.assertEqual(tt, baxter);
		
		baxter.noConflict();
		this.assertEqual(tt, "alias test");
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
	},
	
	testRegisteredTemplate: function () {
		var name = "my-template";
		var template = "This is a {{ what }}";
		var text;
		
		baxter(name, template);
		text = baxter(name, { what: "registered template" });
		
		this.assertEqual(text, "This is a registered template");
	},
	
	testHtmlTagTemplate: function () {
		var text = baxter("anchor-template", { url: "http://google.com", text: "Google" });
		
		this.assertEqual(text, '<a href="http://google.com">Google</a>');
	},
	
	testArrayContext: function () {
		var text = baxter("<li>{{ value }}</li>", [
			{ value: "one" },
			{ value: "two" },
			{ value: "three" }
		]);
		
		this.assertEqual(text, "<li>one</li>\n<li>two</li>\n<li>three</li>");
	},
	
	testMultilineTemplate: function () {
		var template = '<div class="person">\n' +
			'	<h5>{{ name }}</h5>\n' +
			'	<p>{{ name }} is {{ age }} years old.</p>\n' +
			'</div>';
		var text = baxter(template, { name: "John", age: 101 });
		
		this.assertEqual(text, '<div class="person">\n\t<h5>John</h5>\n\t<p>John is 101 years old.</p>\n</div>');
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
		var text = baxter(template, { user: { fullName: function () { return "John Doe"; } } });
		
		this.assertEqual(text, "Your name is: John Doe");
	},
	
	testMissingMethodCall: function () {
		var template = "This method doesn't exist: {{ user.whereAmI() }}";
		var text = baxter(template, { user: {} });
		
		this.assertEqual(text, "This method doesn't exist: ");
	},
	
	testMethodCallWithArguments: function () {
		var template = "The square root of 4 is {{ sqrt(4) }}";
		var text = baxter(template, Math);
		
		this.assertEqual(text, "The square root of 4 is 2");
	},
	
	testChainedMethodCalls: function () {
		var context = {
			users: function () {
				return {
					user: function (firstName, lastName) {
						return {
							fullName: function () {
								return firstName + " " + lastName;
							}
						};
					}
				};
			}
		};
		var template = "User name: {{ users().user('John', 'Doe').fullName() }}";
		var text = baxter(template, context);
		
		this.assertEqual(text, "User name: John Doe");
	},
	
	testVariableInMethodCall: function () {
		var template = "The name of the number {{ number }} is {{ numberName(number) }}";
		var text = baxter(template, { number: 2, numberName: function (num) {
			return ({
				1: "one",
				2: "two",
				3: "three"
			})[num];
		}});
		
		this.assertEqual(text, "The name of the number 2 is two");
	}
});
