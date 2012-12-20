// Compile a named template.
baxter("template-id", "this is {{ who }}'s template");

// Use a named template with an object.
// Produces:
//   this is joe's template
baxter("template-id", {
	who: "joe"
});

// Use a one-off template with an array. Baxter know's this is a
// one-off because no template named "<li>{{ value }}</li>" has
// been registered yet. However, after this has run Baxter will
// cached the compiled template.
// Produces:
//   <li>one</li>
//   <li>two</li>
//   <li>three</li>
baxter("<li>{{ value }}</li>", [
	{ value: "one" },
	{ value: "two" },
	{ value: "three" }
]);
