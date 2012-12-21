function toArray (object, start) {
	return Array.prototype.slice.call(object, start || 0);
}

function extend (target /*, ...objects */) {
	var objects = toArray(arguments, 1);
	
	for (var i = 0, len = objects.length; i < len; i++) {
		var object = objects[i];
		
		for (var key in object) {
			target[key] = object[key];
		}
	}
	
	return target;
}

function bind (context, fn) {
	return function () {
		return fn.apply(context, arguments);
	};
}

function trim (string) {
	return string.replace(/^\s+|\s+$/g, "");
}

/**
 * TODO: This function is pretty gross.
 */
function toString (object /*, properties */) {
	var properties = toArray(arguments, 1);
	var parts = ["[", object.constructor.className];
	var propertyStrings = [];
	var property, value;
	
	if (properties.length > 0) {
		for (var i = 0; i < properties.length; i++) {
			property = properties[i];
			
			if (property instanceof Array) {
				value = property[1](object);
				property = property[0];
			} else {
				if (typeof object[property] === "string") {
					value = "'" + object[property].replace(/'/g, "\\'") + "'";
				} else {
					value = object[property];
				}
			}
			
			if (typeof value === "function") {
				value = value.apply(object);
			}
			
			propertyStrings.push(property + ": " + value);
		}
		
		parts.push(" ");
		parts.push(propertyStrings.join(", "));
	}
	
	parts.push("]");
	
	return parts.join("");
}
