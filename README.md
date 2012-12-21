# Baxter.js

Baxter.js (pronounced 'Baxter') is a safe JavaScript templating engine. Baxter.js doesn't use `eval`, `new Function` (which uses eval) or `with` to do its thing. Baxter.js is lightweight, has no dependencies, and doesn't polute the global namespace.

## Debug usage

To run Baxter.js in debug mode add this to your code:

```javascript
baxter.debug = true;
```

This will cause otherwise silent errors (like missing values in template contexts) to fail loudly.
