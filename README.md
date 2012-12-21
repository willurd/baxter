# Baxter.js

Baxter.js (pronounced 'Baxter') is a JavaScript templating engine. Baxter.js doesn't use `eval`, `new Function` (which uses eval) or `with` to do its thing. Baxter.js is lightweight, has no dependencies, and doesn't polute the global namespace.

## Usage

### Manually register a template

```javascript
// template name, template content
baxter("whos-template", "this is {{ who }}'s template");
>> undefined
```

### Use a pre-registered template

```javascript
// template name, context
baxter("whos-template", {
	who: "joe"
});
>> "this is joe's template"
```

### Use an html tag template

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

### Use an unnamed template with an array

Baxter.js know's this is an unnamed template because no template named `<li>{{ value }}</li>` has been registered yet and no html element exists with that id. However, after this has run Baxter.js will cache the parsed template, using the cached object each subsequent time you call Baxter.js with the same template string.

Baxter.js also smartly handles array contexts by running each item in the array over the template individually, then joining the results together.

```javascript
// template content, context
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
