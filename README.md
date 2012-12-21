# Baxter.js

Baxter.js (pronounced 'Baxter') is a JavaScript templating engine. Baxter.js doesn't use `eval`, `new Function` (which uses eval) or `with` to do its thing. Baxter.js is lightweight, has no dependencies, and doesn't polute the global namespace.

## Usage

### Compile a template that's inside an html tag (typically a script)

```javascript
baxter("whos-template", "this is {{ who }}'s template");
>> undefined
```

### Use a pre-registered template

```javascript
baxter("whos-template", {
	who: "joe"
});
>> "this is joe's template"
```

### Use an html tag template

```html
<script id="my-template" type="text/baxter">
<ul>
	<li>{{ one }}</li>
	<li>{{ two }}</li>
	<li>{{ three }}</li>
</ul>
</script>
```

```javascript
baxter("list-template", {
	one: 1,
	two: 2,
	three: 3
});
>> "\n<ul>\n\t<li>{{ one }}</li>\n\t<li>{{ two }}</li>\n\t<li>{{ three }}</li>\n</ul>\n"
```

### Use an unnamed template with an array

Baxter.js know's this is an unnamed template because no template named `<li>{{ value }}</li>` has been registered yet and no html element exists with that id. However, after this has run Baxter.js will cache the parsed template, using the cached object each subsequent time you call baxter with the same template string.

```javascript
baxter("<li>{{ value }}</li>", [
	{ value: "one" },
	{ value: "two" },
	{ value: "three" }
]);
>> "<li>one</li>\n<li>two</li>\n<li>three</li>"
```


## Alias

Baxter.js has a sweet alias, `tt`, but if you're already using that Baxter.js won't hold it against you if you call `var newAlias = baxter.noConflict()`.

## Debug mode

To run Baxter.js in debug mode add this to your code:

```javascript
baxter.debug = true;
```

This will cause otherwise silent errors (like missing values in template contexts) to fail loudly.
