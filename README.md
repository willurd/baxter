# Baxter.js

Baxter.js (pronounced 'Baxter') is a JavaScript templating engine. Baxter.js doesn't use `eval`, `new Function` (which uses eval) or `with` to do its thing. Baxter.js is lightweight, has no dependencies, and doesn't polute the global namespace.

## Syntax

Baxter.js' syntax was originally inspired by [the Django template language][0].

### Identifiers

Baxter.js uses `{{` and `}}` to denote an identifier, which will be replaced by the value that identifier has in the context.

```javascript
baxter("Hello, it is {{ time }} o'clock.", {
	time: "ten"
});
>> "Hello, it is ten o'clock."
```

### Identifier chains

An identifier chain is several identifiers linked together using the familiar dot notation. Each identifier in the chain will be applied to the value of the previous identifier.

```javascript
baxter("Your name is {{ user.name.length }} characters long", {
	user: {
		name: "John Doe"
	}
});
>> "Your name is 8 characters long"
```

### Function calls &mdash; **NOT IMPLEMENTED**

An identifier can also be a function which can be called with or without arguments. Note: The previous value will be the function's context.

```javascript
baxter("Your name is {{ user.getFullName() }}", {
	user: {
		firstName: "John",
		lastName: "Doe",
		getFullName: function () {
			return this.firstName + " " + this.lastName;
		}
	}
});
>> "Your name is John Doe"
```

```javascript
baxter("The square root of {{ number }} is {{ sqrt(number) }}", {
	number: 4,
	sqrt: Math.sqrt
});
>> "The square root of 4 is 2"
```

### Comments &mdash; **NOT IMPLEMENTED**

Baxter.js uses `{#` and `#}` to denote a comment. These values get tossed when the template is parsed.

```javascript
baxter("this is {# naaaaht #} a test");
>> "this is  a test"
```

## Usage

### Manually registering a template

```javascript
// template name, template text
baxter("whos-template", "this is {{ who }}'s template");
>> undefined
```

### Using a pre-registered template

```javascript
// template name, context
baxter("whos-template", {
	who: "joe"
});
>> "this is joe's template"
```

### Using an html tag template

```html
<script id="list-template" type="text/baxter">
<ul>
	<li>{{ one }}</li>
	<li>{{ two }}</li>
	<li>{{ three }}</li>
</ul>
</script>
```

```javascript
// html tag id, context
baxter("list-template", {
	one: 1,
	two: 2,
	three: 3
});
>> "
<ul>
	<li>1</li>
	<li>2</li>
	<li>3</li>
</ul>
"
```

### Using an unnamed template with an array

Baxter.js know's this is an unnamed template because no template named `<li>{{ value }}</li>` has been registered yet and no html element exists with that id. However, after this has run Baxter.js will cache the parsed template, using the cached object each subsequent time you call Baxter.js with the same template string.

Baxter.js also smartly handles array contexts by running each item in the array over the template individually, then joining the results together.

```javascript
// template text, context
baxter("<li>{{ value }}</li>", [
	{ value: "one" },
	{ value: "two" },
	{ value: "three" }
]);
>> "<li>one</li>
<li>two</li>
<li>three</li>"
```

## Alias

Baxter.js has a sweet alias, `tt`, but if you're already using that Baxter.js won't hold it against you if you call `var newAlias = baxter.noConflict()`.

## Debug mode

To run Baxter.js in debug mode add this to your code:

```javascript
baxter.debug = true;
```

This will cause otherwise silent errors (like missing values in template contexts) to fail loudly.

## Future plans

*Note: Nothing in this document from this point on has been implemented.*

### Tags

Using the planned *tags* feature, Baxter.js could be used to create DSLs for generating content, such as a DSL for making forms:

```html
<script id="form-template" type="text/baxter">
{% form "post", "/{{ model }}/{{ id }}", field-class: "form-field" %}
	{% text "name", "Name", value: name, placeholder: "Enter your name" %}
	{% number "age", "Age", value: age, min: 0, max: 100 %}
	{% textarea "about", "About you", value: about %}
	{% checkbox "signedUp", "Sign up for the newsletter", selected: signedUp %}
	{% submit "Save changes" %}
{% end %}
</script>
```

Which would be used like, and could produce something like, the following:

```javascript
var user = {
	model: "users",
	id: "7",
	name: "John Doe",
	age: 30,
	about: "Loves long walks on the beach",
	signedUp: true
};
baxter("form-template", user);
>> '
<form method="post" action="/users/7">
	<div class="form-field">
		<label for="name">Name</label>
		<input type="text" name="name" value="John Doe" placeholder="Enter your name" />
	</div>
	<div class="form-field">
		<label for="age">Age</label>
		<input type="number" value="30" minimum="0" maximum="100" />
	</div>
	<div class="form-field">
		<label for="about">About</label>
		<textarea name="about">Loves long walks on the beach</textarea>
	</div>
	<div class="form-field">
		<label for="signedUp">Sign up for the newsletter</label>
		<input type="checkbox" name="signedUp" checked />
	</div>
	<div class="form-field">
		<input type="submit" value="Save changes" />
	</div>
</form>
'
```

For now, the syntax for a tag will be: `{% tag-name [*positional-args, [**keyword-args]] %} inner-content {% end %}`. Some tags won't have inner content, so no end tag will be required.

### Custom tags

An important feature of Baxter.js will be the ability to customize it with 3rd party tags. With a custom tag you could write the previous form template example in a single line:

```html
{% model-form user, field-class: "form-field" %}
```

### Lambda syntax

Because lambdas are awesome. Some example usage using the Python lambda syntax:

```javascript
baxter("Following: {{ users.map(lambda u: u.username).join(', ') }}", {
	users: [
		{ username: "john" },
		{ username: "marie" }
	]
});
>> "Following: john, marie"
```

Some possibilities for a lambda syntax in Baxter.js include:

* Javascript: `{{ function (a, b) { return a + b; } }}`
* Python: `{{ lambda a, b: a + b }}`
* Ruby: `{{ { |a, b| a + b } }}`
* Lua: `{{ function (a, b) return a + b end }}`
* Coffeescript: `{{ (a, b) -> a + b }}`
* C#: `{{ (a, b) => a + b }}`
* C++11: `{{ (a, b) { a + b } }}`

### Keyword (or symbol) syntax

A keyword would be short-hand for a function that takes an object and returns the value of object["keyword"]. So, inside a template, `users.map(:name)` would become `users.map(function (user) { return user["name"]; })` (a-la [Symbol#to_proc][1] in Ruby). For example:

```javascript
baxter("Following: {{ users.map(:username).join(', ') }}", {
	users: [
		{ username: "john" },
		{ username: "marie" }
	]
});
>> "Following: john, marie"
```




[0]: https://docs.djangoproject.com/en/dev/topics/templates/
[1]: http://pragdave.pragprog.com/pragdave/2005/11/symbolto_proc.html
