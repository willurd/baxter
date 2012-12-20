function extend (target /*, ...objects */) {
	throw new Error("Write me");
}

function bind (context, fn) {
	return function () {
		return fn.apply(context, arguments);
	};
}
