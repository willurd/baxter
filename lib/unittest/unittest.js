/**
 * unittest.js is an easy-to-use JavaScript unit testing framework.
 * Copyright (C) 2009 - 2010  William Bowers
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * @author William Bowers <william.bowers@gmail.com>
 */

(function (global, undefined) {
	// ======================================================================
	// DEPENDENCIES
	// ======================================================================
	
	// https://github.com/douglascrockford/JSON-js/blob/master/json2.js
	var JSON={};(function(){"use strict";function f(e){return e<10?"0"+e:e}function quote(e){escapable.lastIndex=0;return escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return typeof t==="string"?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,i,s,o=gap,u,a=t[e];if(a&&typeof a==="object"&&typeof a.toJSON==="function"){a=a.toJSON(e)}if(typeof rep==="function"){a=rep.call(t,e,a)}switch(typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":case"undefined":return String(a);case"function":return"function(){},";case"object":if(!a){return"null"}gap+=indent;u=[];if(Object.prototype.toString.apply(a)==="[object Array]"){s=a.length;for(n=0;n<s;n+=1){u[n]=str(n,a)||"null"}i=u.length===0?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+o+"]":"["+u.join(",")+"]";gap=o;return i}if(rep&&typeof rep==="object"){s=rep.length;for(n=0;n<s;n+=1){if(typeof rep[n]==="string"){r=rep[n];i=str(r,a);if(i){u.push(quote(r)+(gap?": ":":")+i)}}}}else{for(r in a){if(Object.prototype.hasOwnProperty.call(a,r)){i=str(r,a);if(i){u.push(quote(r)+(gap?": ":":")+i)}}}}i=u.length===0?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+o+"}":"{"+u.join(",")+"}";gap=o;return i}}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(e){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(e){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;if(typeof JSON.stringify!=="function"){JSON.stringify=function(e,t,n){var r;gap="";indent="";if(typeof n==="number"){for(r=0;r<n;r+=1){indent+=" "}}else if(typeof n==="string"){indent=n}rep=t;if(t&&typeof t!=="function"&&(typeof t!=="object"||typeof t.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":e})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){function walk(e,t){var n,r,i=e[t];if(i&&typeof i==="object"){for(n in i){if(Object.prototype.hasOwnProperty.call(i,n)){r=walk(i,n);if(r!==undefined){i[n]=r}else{delete i[n]}}}}return reviver.call(e,t,i)}var j;text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}})();
	
	/* Simple JavaScript Inheritance
	 * By John Resig http://ejohn.org/
	 * MIT Licensed.
	 */
	var Class = (function(){
		var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\bsup\b/ : /.*/;
		
		// The base Class implementation (does nothing)
		function Class () {
			// Does nothing.
		}
		
		var emptyFunction = function () {};
		
		// Create a new Class that inherits from this class
		Class.extend = function(base, prop) {
			if (typeof prop === "undefined") {
				prop = base;
				base = this;
			}
			
			var sup = base.prototype;
			
			// Instantiate a base class (but only create the instance,
			// don't run the init constructor)
			initializing = true;
			var prototype = new base();
			initializing = false;
			
			// Copy the properties over onto the new prototype
			for (var name in prop) {
				// Check if we're overwriting an existing function
				prototype[name] = typeof prop[name] == "function" && fnTest.test(prop[name]) ?
					(function(name, fn){
						return function() {
							var tmp = this.sup;
							
							// Add a new .sup() method that is the same method
							// but on the super-class
							this.sup = sup[name] || emptyFunction;
							
							// The method only need to be bound temporarily, so we
							// remove it when we're done executing
							var ret = fn.apply(this, arguments);        
							this.sup = tmp;
							
							return ret;
						};
					})(name, prop[name]) :
					prop[name];
			}
			
			// The dummy class constructor
			function Class () {
				// All construction is actually done in the init method
				if (!initializing && this.init) {
					this.init.apply(this, arguments);
				}
			}
			
			Class.prototype = prototype;
			Class.prototype.constructor = Class;
			Class.extend = arguments.callee;
			
			return Class;
		};
		
		return Class;
	})();
	
	// http://code.google.com/p/javascript-ejs/
	var ejs=function(e){return function(t){function n(e){if(e){i.push("line.push('"+e.replace(/\\/g,"\\\\").replace(/'/g,"\\'")+"');")}}function r(e,t){var n=e.length;for(var r=0;r<t.length;r++){var i=e.search(t[r]);if(i>=0&&i<n){n=i;nearestRe=t[r]}}if(n>=0&&n<e.length){var s=e.substring(0,n);e=e.substring(n);var o=nearestRe.exec(e);e=e.substring(o[0].length);return[s,o,e]}return null}var i=[];i.push("var output = [];");var s=t.split("\n");for(var o=0;o<s.length;o++){i.push("var line = [];");var u=s[o];while(true){var a=r(u,e);if(a){n(a[0]);var f=a[1][0].substring(0,2);if(f=="{%"){i.push(a[1][1])}else if(f=="{{"){i.push("line.push(context."+a[1][1]+")")}u=a[2]}else{n(u);break}}i.push("output.push(line.join(''));")}i.push("return output.join('\\n');");var l=new Function("context",i.join("\n"));return l}}([/{%(.+?)%}/,/{{(.+?)}}/]);
	
	// ======================================================================
	// UNITTEST.JS
	// ======================================================================
	
	var emptyFunction = function () {};
	
	var cases = [];
	
	var Exception = Class.extend(Error, {
		init: function (message, name) {
			this.message = message || "";
			this.name = name || "Exception";
		}
	});
	
	var AssertionError = Exception.extend({
		init: function (message) {
			this.sup(message, "AssertionError");
		}
	});
	
	/**
	 * Makes use of eval() (yes, in a safe way) to instantiate a class given
	 * an array of arguments. This is like Function.apply, but for classes.
	 */
	function applyNew (Class, args) {
		args = args || [];
		
		var argsStrings = args.map(function (arg, index) {
			return "args[" + index + "]";
		});
		
		return eval("new Class(" + argsStrings.join(",") + ")");
	}
	
	function bind (fn, context) {
		return function () {
			return fn.apply(context, arguments);
		};
	}
	
	function makeArray (object, start) {
		return Array.prototype.slice.call(object, start || 0);
	}
	
	function extend (target) {
		var args = makeArray(arguments, 1);
		
		for (var i = 0; i < args.length; i++) {
			var obj = args[i];
			
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					target[key] = obj[key];
				}
			}
		}
		
		return target;
	}
	
	/**
	 * Returns a new object with the given properties from the given object.
	 */
	function pick (object, properties) {
		var picked = {};
		
		for (var prop in object) {
			picked[prop] = object[prop];
		}
		
		return picked;
	}
	
	/**
	 * Removes the given properties from the given object.
	 */
	function remove (object, properties) {
		for (var prop in properties) {
			delete object[prop];
		}
	}
	
	/**
	 * Returns a new object with the given properties from the given object
	 * and removes the given properties from the given object.
	 */
	function extract (object, properties) {
		var picked = pick(object, properties);
		
		remove(object, properties);
		
		return picked;
	}
	
	function move (target, object, properties) {
		extend(target, extract(object, properties));
	}
	
	function give (target, object, properties) {
		extend(target, pick(object, properties));
	}
	
	function startsWith (string1, string2) {
		return string1.match(new RegExp("^" + string2)) != null;
	}
	
	/**
	 * Returns true if object is empty. That means it's an empty array
	 * or an empty string.
	 * 
	 * {} isn't empty because some "non-empty" objects, like Date, don't
	 * have iterable properties.
	 */
	function isEmpty (object) {
		return (object === "") ||
			   (typeof object.length === "number" && object.length === 0);
	}
	
	function pluralize (count, singular, plural) {
		return (count === 1) ? singular : (plural || (singular + "s"));
	}
	
	function renderMessage (assertName, template, values) {
		return assertName + ": " + ejs(template)(values);
	}
	
	function deferMessage (assertName, template, values) {
		return function () {
			return renderMessage(assertName, template, values);
		};
	}
	
	function article (type) {
		if (type === "object" || type === "array") {
			return "an";
		} else if (type === "undefined") {
			return null;
		} else {
			return "a";
		}
	}
	
	function getClassName (Class) {
		if (Class.name || Class.className) {
			return Class.name || Class.className;
		}
		
		var match = Class.toString().match(/^\s*function\s+([^\(]+)\(/);
		
		if (match && match.length >= 2) {
			return match[1];
		}
		
		return null;
	}
	
	/**
	 * @param typeMatcher Can be a type string or a function which returns whether the
	 *                    value is of the expected type.
	 */
	function createTypeAssertion (assertionName, typeLabel, typeMatcher) {
		typeMatcher = typeMatcher || typeLabel;
		
		return function (value, customMessage) {
			var valueType = typeof value;
			var message = renderMessage(assertionName,
				"{{ value }} is not {{ type }}", {
				value: JSON.stringify(value),
				type: article(typeLabel) + " " + typeLabel
			});
			
			var typeMatches = (typeof typeMatcher === "function") ? typeMatcher(value) : (typeof value === typeMatcher);
			this.assert(typeMatches, message, customMessage);
		};
	}
	
	/**
	 * @param typeMatcher Can be a type string or a function which returns whether the
	 *                    value is of the expected type.
	 */
	function createNotTypeAssertion (assertionName, typeLabel, typeMatcher) {
		typeMatcher = typeMatcher || typeLabel;
		
		return function (value, customMessage) {
			var valueType = typeof value;
			var message = renderMessage(assertionName,
				"{{ value }} is {{ type }}", {
				value: JSON.stringify(value),
				type: article(typeLabel) + " " + typeLabel
			});
			
			var typeMatches = (typeof typeMatcher === "function") ? typeMatcher(value) : (typeof value === typeMatcher);
			this.assert(!typeMatches, message, customMessage);
		};
	}
	
	/**
	 * @param typeMatcher Can be a type string or a function which returns whether the
	 *                    value is of the expected type.
	 */
	function createPropertyOfTypeAssertion (assertionName, typeLabel, typeMatcher) {
		typeMatcher = typeMatcher || typeLabel;
		
		return function (object, propertyName, customMessage) {
			var value = object[propertyName];
			var valueType = typeof value;
			var message = renderMessage(assertionName,
				"{{ object }} does not have {{ article }} {{ typeLabel }} {{ propertyName }} (value is {{ value }}{{ type }})", {
				object: JSON.stringify(object),
				article: article(typeLabel),
				typeLabel: typeLabel,
				propertyName: JSON.stringify(propertyName),
				value: valueType === "undefined" ? "undefined" : JSON.stringify(value),
				type: (valueType !== "undefined" && value !== null) ? (", " + article(valueType) + " " + valueType) : null
			});
			
			var typeMatches = (typeof typeMatcher === "function") ? typeMatcher(value) : (typeof value === typeMatcher);
			this.assert(typeMatches, message, customMessage);
		};
	}
	
	/**
	 * @param typeMatcher Can be a type string or a function which returns whether the
	 *                    value is of the expected type.
	 */
	function createNotPropertyOfTypeAssertion (assertionName, typeLabel, typeMatcher) {
		typeMatcher = typeMatcher || typeLabel;
		
		return function (object, propertyName, customMessage) {
			var value = object[propertyName];
			var valueType = typeof value;
			var message = renderMessage(assertionName,
				"{{ object }} has {{ article }} {{ typeLabel }} {{ propertyName }}", {
				object: JSON.stringify(object),
				article: article(typeLabel),
				typeLabel: typeLabel,
				propertyName: JSON.stringify(propertyName)
			});
			
			var typeMatches = (typeof typeMatcher === "function") ? typeMatcher(value) : (typeof value === typeMatcher);
			this.assert(!typeMatches, message, customMessage);
		};
	}
	
	function getPrettyTestName (testName) {
		testName = testName.replace(/^test/, "");
		var words = [];
		var word = null;
		var i = 0;
		
		for (var i = 0; i < testName.length; i++) {
			var code = testName.charCodeAt(i);
			
			if (word === null || (code >= 65 && code <= 90)) {
				if (word !== null) {
					words.push(word);
				}
				
				word = testName[i];
			} else {
				word += testName[i];
			}
		}
		
		if (word !== null) {
			words.push(word);
		}
		
		return words.join(" ").toLowerCase();
	}
	
	/**
	 * This is the unittest.js handler contract. Each handler you write should
	 * define most, if not all, of these methods to ensure you get the
	 * most out of unittest.js's output.
	 */
	var TestHandler = Class.extend({
		init: function (verbose) {
			this.verbose = verbose;
		},
		
		// This is the order in which these methods are called.
		startRun: function () {},
		noCases: function () {},
		section: function (section) {},
		startTestCase: function (testCase) {},
		noTests: function (testCase) {},
		startTest: function (test) {},
		endTest: function (result) {},
		endTestCase: function (result) {},
		endRun: function (result) {},
	});
	
	/**
	 * The default console handler. Simply prints normal output using
	 * console.info() and error output using console.error().
	 */
	var ConsoleHandler = TestHandler.extend({
		init: function (verbose) {
			if (!console) {
				throw new Error("A JavaScript console is required for the ConsoleHandler to work.");
			}
			
			this.sup(verbose);
			
			this.pad = "  ";
			this.bullet = " - ";
		},
		
		startRun: function () {
			// console.info("Running all test cases");
		},
		
		noCases: function () {
			console.info("No test cases to run");
		},
		
		section: function (section) {
			console.info("*** " + section.label + " ***");
		},
		
		startTestCase: function (testCase) {
			console.info("Case: " + testCase.name || "<No Name>");
		},
		
		noTests: function (testCase) {
			if (!this.verbose) {
				return;
			}
			
			console.info(this.bullet + "No test cases to run");
		},
		
		startTest: function (test) {
			if (!this.verbose) {
				return;
			}
			
			console.info(this.bullet + "Running '" + test.name + "'");
		},
		
		endTest: function (result) {
			if (result.error) {
				var text = this.bullet + result.test.name + "(" + result.assertionCount + ") failed: " + result.error.message;
				console.error(text);
			}
			
			if (!this.verbose) {
				return;
			}
			
			var messages = result.messages;
			
			for (var i = 0; i < messages.length; i++) {
				console.info(this.pad + this.bullet + messages[i]);
			}
			
			var status = result.passed ? "pass" : "fail";
			console.info(this.pad + this.bullet + status);
		},
		
		endTestCase: function (result) {
			var failedTestCount = result.failedTestResults.length();
			
			if (failedTestCount == 0) {
				console.info(this.bullet + "All " + result.testResults.length() + " tests passed");
			} else {
				console.info(this.bullet + failedTestCount + " " + pluralize(failedTestCount, "test") + " failed");
			}
		},
		
		endRun: function (result) {
			var failedTestCount = result.failedTestCount;
			
			if (failedTestCount == 0) {
				console.info("All tests passed");
			} else {
				console.info(failedTestCount + " total " + pluralize(failedTestCount, "test") + " failed");
			}
		}
	});

	/**
	 * The default node.js handler.
	 * 
	 * TODO: Update this to the new handler API.
	 */
	var NodeJSHandler = TestHandler.extend({
		init: function (verbose) {
			if (typeof require !== "function") {
				throw new Exception("NodeJSHandler must be run inside Node.js.");
			}
			
			this.sup(verbose);
			
			var sys = require("sys");
			
			if (!sys || typeof sys.puts !== "function") {
				throw new Exception("NodeJSHandler must be run inside Node.js.");
			}
			
			this.p = sys.puts;
			
			this.pad = "  ";
			this.bullet = " - ";
		},
		
		noTests: function () {
			this.p(this.bullet + "No tests to run");
		},
		
		startTestCase: function (suite) {
			this.p("Case: " + suite.name || "<No Name>");
		},
		
		startTest: function (suite, testName) {
			this.p(this.bullet + "Running '" + testName + "'");
		},
		
		testMessage: function (suite, testName, message) {
			// Does nothing. Why?
		},
		
		testError: function (suite, testName, error, testAssertionCount) {
			var text = this.bullet + testName + "(" + testAssertionCount + ") failed: " + error.message;
			this.p(text);
		},
		
		testResult: function (suite, testName, passed) {
			var status = passed ? "pass" : "fail";
			this.p(this.pad + this.bullet + status);
		},
		
		testCaseResult: function (suite, testsRun, testsPassed, testsFailed) {
			if (testsFailed === 0) {
				this.p(this.bullet + "All " + testsRun + " tests passed");
			} else {
				this.p(this.bullet + testsFailed + " of " + testsRun + " " + pluralize(testsRun, "test") + " failed");
			}
		},
		
		section: function (section) {
			var label = section.label;
			var div = "";
			
			for (var i = 0; i < label.length; i++) {
				div += "-";
			}
			
			this.p("----" + div + "----");
			this.p("*** " + label.toUpperCase() + " ***");
			this.p("----" + div + "----");
		},
		
		runResult: function (casesRun, casesPassed, casesFailed) {
			if (casesFailed == 0) {
				this.p("All tests passed");
			} else {
				this.p(casesFailed + " tests " + pluralize(casesFailed, "case") + " failed");
			}
		}
	});

	/**
	 * A simple html handler. Must be initialized with a block-level html
	 * element for its information for it to work correctly.
	 * 
	 * TODO: This class sucks big time.
	 */
	var HTMLHandler = TestHandler.extend({
		init: function (verbose, containerId, prettyTestNames) {
			this.sup(verbose);
			
			this.container = document.getElementById(containerId);
			this.prettyTestNames = prettyTestNames || false;
		},
		
		getLastTest: function () {
			return this.table.lastChild;
		},
		
		getTestColumn: function (column, testrow) {
			testrow = testrow || this.getLastTest();
			
			for (var i = 0; i < testrow.childNodes.length; i++) {
				var child = testrow.childNodes[i];
				
				if (child.getAttribute("class") == column) {
					return child;
				}
			}
			
			return null;
		},
		
		addShortcut: function (type, id, label) {
			var shortcuts = document.getElementById("unittest-shortcuts");
			
			if (!shortcuts) {
				var shortcutsContainer = document.createElement("div");
				shortcutsContainer.setAttribute("id", "unittest-shortcuts-container");
				var header = document.createElement("span");
				header.setAttribute("id", "unittest-shortcuts-header");
				header.appendChild(document.createTextNode("Shortcuts"));
				shortcutsContainer.appendChild(header);
				shortcuts = document.createElement("ol");
				shortcuts.setAttribute("id", "unittest-shortcuts");
				shortcutsContainer.appendChild(shortcuts);
				this.container.insertBefore(shortcutsContainer, this.container.children[0]);
			}
			
			var li = document.createElement("li");
			li.setAttribute("class", "unittest-shortcut " + type);
			var a = document.createElement("a");
			a.setAttribute("class", "unittest-shortcut " + type);
			a.setAttribute("href", "#" + id);
			a.appendChild(document.createTextNode(label));
			li.appendChild(a);
			shortcuts.appendChild(li);
		},
		
		addMessage: function (message) {
			var testcol = this.getTestColumn("message");
			
			var span = document.createElement("span");
			span.setAttribute("class", "unittest-test-message pass");
			var div = document.createElement("div");
			div.setAttribute("class", "testmessage");
			span.appendChild(div);
			span.appendChild(document.createTextNode(message));
			
			testcol.appendChild(span);
		},
		
		startRun: function () {
			// Does nothing. why?
		},
		
		noCases: function () {
			// Does nothing. Why?
		},
		
		section: function (section) {
			var label = section.label;
			var slug = encodeURIComponent(label.split(/\s+/g).join("-"));
			
			var div = document.createElement("div");
			div.setAttribute("id", slug);
			div.setAttribute("class", "unittest-section");
			div.appendChild(document.createTextNode(label));
			this.container.appendChild(div);
			
			// Add the shortcut link
			this.addShortcut("section", slug, label);
		},
		
		startTestCase: function (testCase) {
			// this.headers = ["test", "status", "message"];
			this.headers = ["test", "message"];
			this.hiddenHeaders = ["test"];
			this.numHeaders = 0;
			
			this.tableContainer = document.createElement("div");
			this.tableContainer.setAttribute("class", "unittest-test-container");
			this.table = document.createElement("table");
			this.table.setAttribute("class", "unittest-test-case");
			this.tableContainer.appendChild(this.table);
			this.container.appendChild(this.tableContainer);
			
			this.caption = document.createElement("caption");
			this.table.appendChild(this.caption);
			
			this.thead = document.createElement("thead");
			this.headrow = document.createElement("tr");
			this.thead.appendChild(this.headrow);
			this.table.appendChild(this.thead);
			
			for (var i = 0; i < this.headers.length; i++) {
				var header = this.headers[i];
				
				if (typeof header === "function") {
					continue;
				}
				
				this.numHeaders++;
				
				var th = document.createElement("th");
				th.setAttribute("class", header);
				this.headrow.appendChild(th);
				
				if (this.hiddenHeaders.indexOf(header) == -1) {
					th.appendChild(document.createTextNode(header));
				}
			}
			
			// Add the test case name.
			this.caption.appendChild(document.createTextNode(testCase.name || ""));
		},
		
		noTests: function (testCase) {
			var text = "No tests to run";
			
			var row = document.createElement("tr");
			this.table.appendChild(row);
			var td = document.createElement("td");
			td.appendChild(document.createTextNode(text));
			td.setAttribute("colspan", this.numHeaders);
			row.appendChild(td);
		},
		
		startTest: function (test) {
			var testrow = document.createElement("tr");
			this.table.appendChild(testrow);
			
			for (var i = 0; i < this.headers.length; i++) {
				var header = this.headers[i];
				
				if (typeof header == "function")
					continue;
				
				var td = document.createElement("td");
				td.setAttribute("class", header);
				testrow.appendChild(td);
			}
			
			var testcol = this.getTestColumn("test");
			testcol.appendChild(document.createTextNode(this.prettyTestNames ? getPrettyTestName(test.name) : test.name));
		},
		
		endTest: function (result) {
			var error = result.error;
			var test = result.test;
			var testCase = test.testCase;
			var assertionCount = result.assertionCount;
			
			if (error) {
				var testcol = this.getTestColumn("message");
				
				var shortcutID = encodeURIComponent(testCase.name + "." + test);
				var span = document.createElement("span");
				span.setAttribute("id", shortcutID);
				span.setAttribute("class", "unittest-test-message fail");
				var div = document.createElement("div");
				div.setAttribute("class", "testerror");
				span.appendChild(div);
				span.appendChild(document.createTextNode(test.name + "(" + assertionCount + "): " + error.message));
				testcol.appendChild(span);
				
				// Add a shortcut for this error
				var label = testCase.name + " | " + test.name + "(" + assertionCount + ") | " + error.message;
				this.addShortcut("error", shortcutID, label);
			}
			
			var testrow = this.getLastTest();
			var status = result.passed ? "pass" : "fail";
			
			testrow.setAttribute("class", status);
			
			// Don't create the status column. The status is implicit in the design and
			// the fact that there's an error message.
			// var testcol = this.getTestColumn("status");
			// testcol.appendChild(document.createTextNode(status));
			
			var messages = result.messages;
			
			for (var i = 0; i < messages.length; i++) {
				this.addMessage(messages[i]);
			}
			
			var testCount = document.getElementById(result.passed ? "passed-tests-count" : "failed-tests-count");
			testCount.textContent = Number(testCount.textContent) + 1;
		},
		
		endTestCase: function (result) {
			var testCount = result.testResults.length();
			var failedTestCount = result.failedTestResults.length();
			
			var span = document.createElement("span");
			span.setAttribute("class", "test-case-result-label");
			this.caption.appendChild(span);
			
			if (failedTestCount > 0) {
				var label = failedTestCount + " of " + testCount + " tests failed";
			} else {
				var label = "All tests passed";
			}
			
			span.setAttribute("class", span.getAttribute("class") + " " + (failedTestCount > 0 ? "fail" : "pass"));
			span.appendChild(document.createTextNode(label));
			
			// Set the number of passed/failed assertions for the test suite.
			var element = document.getElementById("successful-assertions-count");
			element.textContent = Number(element.textContent) + result.assertions.passed;
			element = document.getElementById("failed-assertions-count");
			element.textContent = Number(element.textContent) + result.assertions.failed;
		},
		
		endRun: function (result) {
			// Does nothing. Why?
		}
	});
	
	// TODO: Make this a class, with this being the prototype.
	var assert = {
		count: {
			passed: 0,
			failed: 0
		},
		
		custom: {
			// Global custom assertions.
		},
		
		define: function (name, fn) {
			if (typeof name === "string") {
				this.custom[name] = fn;
			} else {
				var object = name;
				extend(this.custom, object);
			}
		},
		
		/**
		 * Asserts that value is truthy.
		 */
		assert: function (value, message, customMessage) {
			if (!value) {
				message = customMessage ? (message + ": " + customMessage) : message;
				
				this.assertions.failed++;
				throw new AssertionError(message);
			} else {
				this.assertions.passed++;
			}
		},
		
		/**
		 * Fails a test.
		 */
		fail: function (message) {
			this.assert(false, renderMessage("FAIL", message));
		},
		
		/**
		 * A reminder that will show up as a failure in test results.
		 */
		todo: function (message) {
			this.assert(false, renderMessage("TODO", message));
		},
		
		/**
		 * Asserts that value is true.
		 */
		assertTrue: function (value, customMessage) {
			var message = renderMessage("assertTrue", "Value {{ value }} is not true", {
				value: JSON.stringify(value)
			});
			
			this.assert(value === true, message, customMessage);
		},
		
		/**
		 * Asserts that value is false.
		 */
		assertFalse: function (value, customMessage) {
			var message = renderMessage("assertFalse", "Value {{ value }} is not false", {
				value: JSON.stringify(value)
			});
			
			this.assert(value === false, message, customMessage);
		},
		
		/**
		 * Asserts that value is truthy.
		 */
		assertTruthy: function (value, customMessage) {
			var message = renderMessage("assertTruthy", "Value {{ value }} is not truthy", {
				value: JSON.stringify(value)
			});
			
			this.assert(value, message, customMessage);
		},
		
		/**
		 * Asserts that value is falsy.
		 */
		assertFalsy: function (value, customMessage) {
			var message = renderMessage("assertFalsy", "Value {{ value }} is not falsy", {
				value: JSON.stringify(value)
			});
			
			this.assert(!value, message, customMessage);
		},
		
		/**
		 * Asserts that 'value1' and 'value2' are equal (triple equals).
		 * Performs a deep comparison on arrays and objects.
		 * 
		 * TODO: Make this function not suck.
		 */
		assertEqual: function (value1, value2, customMessage, testFunc) {
			var message = renderMessage("assertEqual", "{{ v1 }} and {{ v2 }} are not equal", {
				v1: JSON.stringify(value1),
				v2: JSON.stringify(value2)
			});
			var equal = true;
			
			if ((value1 instanceof Array) && (value2 instanceof Array)) {
				// Perform a deep comparison of the arrays.
				try {
					if (value1.length != value2.length) {
						equal = false;
					} else {
						for (var i = 0; i < value1.length; i++) {
							this.assertEqual(value1[i], value2[i], null, testFunc);
							this.assertions.passed--;
						}
					}
				} catch (e) {
					if (e instanceof AssertionError) {
						equal = false;
						this.assertions.failed--;
					} else {
						throw e;
					}
				}
			} else if (value1 && value2 && (typeof value1 === "object") && (typeof value2 === "object")) {
				// Perform a deep comparison of the objects.
				try {
					var key;
					
					for (key in value1) {
						this.assertEqual(value1[key], value2[key], null, testFunc);
						this.assertions.passed--;
					}
					
					for (key in value2) {
						this.assertEqual(value1[key], value2[key], null, testFunc);
						this.assertions.passed--;
					}
				} catch (e) {
					if (e instanceof AssertionError) {
						equal = false;
						this.assertions.failed--;
					} else {
						throw e;
					}
				}
			} else {
				equal = testFunc ? testFunc(value1, value2) : (value1 === value2);
			}
			
			this.assert(equal, message, customMessage);
		},
		
		/**
		 * Asserts that 'value1' and 'value2' are not equal (triple equals).
		 * Performs a deep comparison on arrays and objects.
		 */
		assertNotEqual: function (value1, value2, customMessage, testFunc) {
			var message = renderMessage("assertNotEqual", "{{ v1 }} and {{ v2 }} are equal", {
				v1: JSON.stringify(value1),
				v2: JSON.stringify(value2)
			});
			var equal = true;
			
			// Reuse assertEqual.
			try {
				this.assertEqual(value1, value2, null, testFunc);
				this.assertions.passed--;
			} catch (e) {
				if (e instanceof AssertionError) {
					equal = false;
					this.assertions.failed--;
				} else {
					throw e;
				}
			}
			
			this.assert(!equal, message, customMessage);
		},
		
		/**
		 * Asserts that value1 and value2 are 'comparable' (double equals).
		 * Performs a deep comparison on arrays and objects.
		 */
		assertComparable: function (value1, value2, customMessage) {
			this.fail("Write me");
		},
		
		/**
		 * Asserts that value1 and value2 are not 'comparable' (double equals).
		 * Performs a deep comparison on arrays and objects.
		 */
		assertNotComparable: function (value1, value2, customMessage) {
			this.fail("Write me");
		},
		
		/**
		 * Asserts that 'regex' matches 'value'.
		 */
		assertMatch: function (value, regex, customMessage) {
			var message = renderMessage("assertMatch", "{{ regex }} does not match {{ value }}", {
				regex: regex,
				value: value
			});
			
			this.assert(regex.test(value), message, customMessage);
		},
		
		/**
		 * Asserts that 'regex' matches 'value'.
		 */
		assertNotMatch: function (value, regex, customMessage) {
			var message = renderMessage("assertNotMatch", "{{ regex }} matches {{ value }}", {
				regex: regex,
				value: value
			});
			
			this.assert(!regex.test(value), message, customMessage);
		},
		
		/**
		 * Asserts that 'value' has the type specified by 'type'.
		 */
		assertType: function (value, type, customMessage) {
			var art = article(type);
			var message = renderMessage("assertType", "{{ value }} is not {{ article }}{{ type }}", {
				value: JSON.stringify(value),
				type: type,
				article: art ? (art + " ") : ""
			});
			
			this.assert(typeof value === type, message, customMessage);
		},
		
		/**
		 * Asserts that 'value' does not have the type specified by 'type'.
		 */
		assertNotType: function (value, type, customMessage) {
			var art = article(type);
			var message = renderMessage("assertType", "{{ value }} is {{ article }}{{ type }}", {
				value: JSON.stringify(value),
				type: type,
				article: art ? (art + " ") : ""
			});
			
			this.assert(typeof value !== type, message, customMessage);
		},
		
		/**
		 * Asserts that 'value1' has the same type as 'value2'.
		 */
		assertSameType: function (value1, value2, customMessage) {
			var message = renderMessage("assertSameType",
				"{{ v1 }} and {{ v2 }} are not the same type ({{ t1 }} and {{ t2 }})", {
				v1: JSON.stringify(value1),
				v2: JSON.stringify(value2),
				t1: typeof value1,
				t2: typeof value2
			});
			
			this.assert(typeof value1 === typeof value2, message, customMessage);
		},
		
		/**
		 * Asserts that 'value1' does not have the same type as 'value2'.
		 */
		assertNotSameType: function (value1, value2, customMessage) {
			var message = renderMessage("assertNotSameType",
				"{{ v1 }} and {{ v2 }} are the same type ({{ type }})", {
				v1: JSON.stringify(value1),
				v2: JSON.stringify(value2),
				type: typeof value1
			});
			
			this.assert(typeof value1 !== typeof value2, message, customMessage);
		},
		
		/**
		 * Asserts that value is a string.
		 */
		assertString: createTypeAssertion("assertString", "string"),
		
		/**
		 * Asserts that value is not a string.
		 */
		assertNotString: createNotTypeAssertion("assertNotString", "string"),
		
		/**
		 * Asserts that value is a number.
		 */
		assertNumber: createTypeAssertion("assertNumber", "number"),
		
		/**
		 * Asserts that value is not a number.
		 */
		assertNotNumber: createNotTypeAssertion("assertNotNumber", "number"),
		
		/**
		 * Asserts that value is an object.
		 */
		assertObject: createTypeAssertion("assertObject", "object"),
		
		/**
		 * Asserts that value is not an object.
		 */
		assertNotObject: createNotTypeAssertion("assertNotObject", "object"),
		
		/**
		 * Asserts that value is an array.
		 */
		assertArray: createTypeAssertion("assertArray", "array", function (value) {
			return value instanceof Array;
		}),
		
		/**
		 * Asserts that value is not an array.
		 */
		assertNotArray: createNotTypeAssertion("assertNotArray", "array", function (value) {
			return value instanceof Array;
		}),
		
		/**
		 * Asserts that value is a boolean.
		 */
		assertBoolean: createTypeAssertion("assertBoolean", "boolean"),
		
		/**
		 * Asserts that value is not a boolean.
		 */
		assertNotBoolean: createNotTypeAssertion("assertNotBoolean", "boolean"),
		
		/**
		 * Asserts that value is a function.
		 */
		assertFunction: createTypeAssertion("assertFunction", "function"),
		
		/**
		 * Asserts that value is not a function.
		 */
		assertNotFunction: createNotTypeAssertion("assertNotFunction", "function"),
		
		/**
		 * Asserts that number is a number and is greater than or equal to start
		 * and less than or equal to end.
		 */
		assertInRange: function (number, start, end, customMessage) {
			this.fail("Write me");
		},
		
		/**
		 * Asserts that number is a number and is less than start or greater than end.
		 */
		assertNotInRange: function (number, start, end, customMessage) {
			this.fail("Write me");
		},
		
		/**
		 * Asserts that number is a number and is equal to 0.
		 */
		assertZero: function (number, customMessage) {
			this.fail("Write me");
		},
		
		/**
		 * Asserts that number is a number and is not equal to 0.
		 */
		assertNotZero: function (number, customMessage) {
			this.fail("Write me");
		},
		
		/**
		 * Asserts that number is a number and is even.
		 */
		assertEven: function (number, customMessage) {
			this.fail("Write me");
		},
		
		/**
		 * Asserts that number is a number and is odd.
		 */
		assertOdd: function (number, customMessage) {
			this.fail("Write me");
		},
		
		/**
		 * Asserts that number and divisor are numbers and number is divisible
		 * by divisor.
		 */
		assertDivisibleBy: function (number, divisor, customMessage) {
			this.fail("Write me");
		},
		
		/**
		 * Asserts that number and divisor are numbers and number is not
		 * divisible by divisor.
		 */
		assertNotDivisibleBy: function (number, divisor, customMessage) {
			this.fail("Write me");
		},
		
		/**
		 * Asserts that factor and number are numbers and factor is a factor
		 * of number.
		 */
		assertFactorOf: function (factor, number, customMessage) {
			this.fail("Write me");
		},
		
		/**
		 * Asserts that factor and number are numbers and factor is not a
		 * factor of number.
		 */
		assertNotFactorOf: function (factor, number, customMessage) {
			this.fail("Write me");
		},
		
		/**
		 * Asserts that number is a number and is less than 0.
		 */
		assertNegative: function (number, customMessage) {
			this.fail("Write me");
		},
		
		/**
		 * Asserts that number is a number and is greater than or equal to 0.
		 */
		assertNotNegative: function (number, customMessage) {
			this.fail("Write me");
		},
		
		/**
		 * Asserts that number is a number and is greater than 0.
		 */
		assertPositive: function (number, customMessage) {
			this.fail("Write me");
		},
		
		/**
		 * Asserts that number is a number and is less than or equal to 0.
		 */
		assertNotPositive: function (number, customMessage) {
			this.fail("Write me");
		},
		
		/**
		 * Asserts that 'value' is an instance of 'Class'.
		 */
		assertInstanceOf: function (value, Class, customMessage) {
			var message = renderMessage("assertInstanceOf",
				"{{ value }} is not an instance of {{ className }}", {
				value: JSON.stringify(value),
				className: getClassName(Class)
			});
			
			this.assert(value instanceof Class, message, customMessage);
		},
		
		/**
		 * Asserts that 'value' is not an instance of 'class'.
		 */
		assertNotInstanceOf: function (value, Class, customMessage) {
			var message = renderMessage("assertNotInstanceOf",
				"{{ value }} is an instance of {{ className }}", {
				value: JSON.stringify(value),
				className: getClassName(Class)
			});
			
			this.assert(!(value instanceof Class), message, customMessage);
		},
		
		/**
		 * Asserts that 'value' is null.
		 */
		assertNull: function (value, customMessage) {
			var message = renderMessage("assertNull", "{{ value }} is not null", {
				value: JSON.stringify(value)
			});
			
			this.assert(value === null, message, customMessage);
		},
		
		/**
		 * Asserts that 'value' is null.
		 */
		assertNotNull: function (value, customMessage) {
			var message = renderMessage("assertNotNull", "value is null");
			
			this.assert(value !== null, message, customMessage);
		},
		
		/**
		 * Asserts that 'value' is undefined.
		 */
		assertUndefined: function (value, customMessage) {
			var message = renderMessage("assertUndefined", "{{ value }} is not undefined", {
				value: JSON.stringify(value)
			});
			
			this.assert(value === undefined, message, customMessage);
		},
		
		/**
		 * Asserts that 'value' is undefined.
		 */
		assertNotUndefined: function (value, customMessage) {
			var message = renderMessage("assertNotUndefined", "value is undefined");
			
			this.assert(value !== undefined, message, customMessage);
		},
		
		/**
		 * Asserts that isNaN(value) returns true.
		 */
		assertNaN: function (value, customMessage) {
			var message = renderMessage("assertNaN", "{{ value }} is not NaN", {
				value: JSON.stringify(value)
			});
			
			this.assert(isNaN(value), message, customMessage);
		},
		
		/**
		 * Asserts that isNaN(value) returns false.
		 */
		assertNotNaN: function (value, customMessage) {
			var message = renderMessage("assertNotNaN", "{{ value }} is NaN", {
				value: JSON.stringify(value)
			});
			
			this.assert(!isNaN(value), message, customMessage);
		},
		
		/**
		 * Asserts that 'value1' is greater than 'value2'.
		 */
		assertGreaterThan: function (value1, value2, customMessage) {
			var message = renderMessage("assertGreaterThan", "{{ v1 }} is not greater than {{ v2 }}", {
				v1: JSON.stringify(value1),
				v2: JSON.stringify(value2)
			});
			
			this.assert(value1 > value2, message, customMessage);
		},
		
		/**
		 * Asserts that 'value1' is less than 'value2'.
		 */
		assertLessThan: function (value1, value2, customMessage) {
			var message = renderMessage("assertLessThan", "{{ v1 }} is not less than {{ v2 }}", {
				v1: JSON.stringify(value1),
				v2: JSON.stringify(value2)
			});
			
			this.assert(value1 < value2, message, customMessage);
		},
		
		/**
		 * Asserts that 'value1' is greater than or equal to 'value2'.
		 */
		assertGreaterThanOrEqual: function (value1, value2, customMessage) {
			var message = renderMessage("assertGreaterThanOrEqual",
				"{{ v1 }} is not greater than or equal to {{ v2 }}", {
				v1: JSON.stringify(value1),
				v2: JSON.stringify(value2)
			});
			
			this.assert(value1 >= value2, message, customMessage);
		},
		
		/**
		 * Asserts that 'value1' is less than or equal to 'value2'.
		 */
		assertLessThanOrEqual: function (value1, value2, customMessage) {
			var message = renderMessage("assertLessThanOrEqual",
				"{{ v1 }} is not less than or equal to {{ v2 }}", {
				v1: JSON.stringify(value1),
				v2: JSON.stringify(value2)
			});
			
			this.assert(value1 <= value2, message, customMessage);
		},
		
		/**
		 * Asserts the return value of fn with the given arguments is truthy.
		 */
		assertWith: function (context, fn, customMessage /*, ...args */) {
			var args;
			var message;
			
			if (context && typeof fn === "string") {
				// We were passed the name of a method on the context.
				fn = context[fn];
			}
			
			if (typeof fn !== "function") {
				message = renderMessage("assertWith",
					"Unable to call value {{ value }} of type {{ type }}", {
					value: JSON.stringify(fn),
					type: JSON.stringify(typeof fn)
				});
				
				this.assert(false, message);
			} else {
				args = makeArray(arguments, 3);
				message = renderMessage("assertWith",
					"Function did not return a truthy value given the arguments {{ args }}", {
					args: JSON.stringify(args)
				});
				
				this.assert(fn.apply(context, args), message, customMessage);
			}
		},
		
		/**
		 * Asserts the return value of fn with the given arguments is falsy.
		 */
		assertNotWith: function (context, fn, customMessage /*, ...args */) {
			var args;
			var message;
			
			if (context && typeof fn === "string") {
				// We were passed the name of a method on the context.
				fn = context[fn];
			}
			
			if (typeof fn !== "function") {
				message = renderMessage("assertNotWith",
					"Unable to call value {{ value }} of type {{ type }}", {
					value: JSON.stringify(fn),
					type: JSON.stringify(typeof fn)
				});
				
				this.assert(false, message);
			} else {
				args = makeArray(arguments, 3);
				message = renderMessage("assertNotWith",
					"Function did not return a falsy value given the arguments {{ args }}", {
					args: JSON.stringify(args)
				});
				
				this.assert(!fn.apply(context, args), message, customMessage);
			}
		},
		
		/**
		 * Asserts that 'func' raises an exception of type 'ErrorClass' when
		 * called with the rest of the arguments passed in.
		 */
		assertRaises: function (ErrorClass, func, customMessage /*, ...args */) {
			var args = makeArray(arguments, 3);
			var raised = false;
			var errorName = getClassName(ErrorClass);
			var errorMessage;
			
			try {
				func.apply(null, args);
			} catch (e) {
				if (e instanceof ErrorClass) {
					raised = true;
					errorName = e.name;
				} else {
					errorMessage = e.message || e.toString();
				}
			}
			
			var message = renderMessage("assertRaises",
				"Exception {{ errorName }}was not raised{{ errorMessage }}", {
				errorName: (errorName ? "'" + errorName + "' " : ""),
				errorMessage: (errorMessage ? (": " + errorMessage) : "")
			});
			
			this.assert(raised, message, customMessage);
		},
		
		/**
		 * Asserts that 'func' does not raise an exception of type 'ErrorClass'
		 * when called with the rest of the arguments passed in.
		 */
		assertNotRaises: function (ErrorClass, func, customMessage /*, ...args */) {
			var args = makeArray(arguments, 3);
			var raised = false;
			var errorName = getClassName(ErrorClass);
			var errorMessage;
			
			try {
				func.apply(null, args);
			} catch (e) {
				if (e instanceof ErrorClass) {
					raised = true;
					errorName = e.name;
					errorMessage = e.message || e.toString();
				}
			}
			
			var message = renderMessage("assertNotRaises",
				"Exception {{ errorName }}was raised{{ errorMessage }}", {
				errorName: (errorName ? "'" + errorName + "' " : ""),
				errorMessage: (errorMessage ? (": " + errorMessage) : "")
			});
			
			this.assert(!raised, message, customMessage);
		},
		
		/**
		 * Asserts that fn doesn't raise an exception when called with the
		 * rest of the arguments passed in.
		 */
		assertRaisesNothing: function (fn, customMessage) {
			var args = makeArray(arguments, 2);
			var raised = false;
			var errorName;
			var errorMessage;
			
			try {
				fn.apply(null, args);
			} catch (e) {
				raised = true;
				errorName = e.name;
				errorMessage = e.message || e.toString();
			}
			
			var message = renderMessage("assertRaisesNothing",
				"Function raised an exception{{ errorName }}{{ errorMessage }}", {
				errorName: (errorName ? " '" + errorName + "'" : ""),
				errorMessage: (errorMessage ? (": " + errorMessage) : "")
			});
			
			this.assert(!raised, message, customMessage);
		},
		
		/**
		 * Asserts that fn raises any exception of any type when called with the
		 * rest of the arguments passed in.
		 */
		assertRaisesSomething: function (fn, customMessage) {
			var args = makeArray(arguments, 2);
			var raised = false;
			
			try {
				fn.apply(null, args);
			} catch (e) {
				raised = true;
			}
			
			var message = renderMessage("assertRaisesSomething", "Function did not raise an exception");
			
			this.assert(raised, message, customMessage);
		},
		
		/**
		 * Asserts that 'object' has a property named by 'property'.
		 */
		assertHasProperty: function (object, property, customMessage) {
			var message = renderMessage("assertHasProperty",
				"{{ object }} does not have property {{ property }}", {
				object: JSON.stringify(object),
				property: property
			});
			
			this.assert(property in object, message, customMessage);
		},
		
		/**
		 * Asserts that 'object' does not have a property named by
		 * 'property'.
		 */
		assertNotHasProperty: function (object, property, customMessage) {
			var message = renderMessage("assertNotHasProperty",
				"{{ object }} has property {{ property }}", {
				object: JSON.stringify(object),
				property: property
			});
			
			this.assert(!(property in object), message, customMessage);
		},
		
		/**
		 * Asserts that object has a method with the name propertyName.
		 */
		assertHasMethod: createPropertyOfTypeAssertion("assertHasMethod", "method", "function"),
		
		/**
		 * Asserts that object does not have a method with the name propertyName.
		 */
		assertNotHasMethod: createNotPropertyOfTypeAssertion("assertNotHasMethod", "method", "function"),
		
		/**
		 * Asserts that object has a string with the name propertyName.
		 */
		assertHasString: createPropertyOfTypeAssertion("assertHasString", "string"),
		
		/**
		 * Asserts that object does not have a string with the name propertyName.
		 */
		assertNotHasString: createNotPropertyOfTypeAssertion("assertNotHasString", "string"),
		
		/**
		 * Asserts that object has a number with the name propertyName.
		 */
		assertHasNumber: createPropertyOfTypeAssertion("assertHasNumber", "number"),
		
		/**
		 * Asserts that object does not have a number with the name propertyName.
		 */
		assertNotHasNumber: createNotPropertyOfTypeAssertion("assertNotHasNumber", "number"),
		
		/**
		 * Asserts that object has a boolean with the name propertyName.
		 */
		assertHasBoolean: createPropertyOfTypeAssertion("assertHasBoolean", "boolean"),
		
		/**
		 * Asserts that object does not have a boolean with the name propertyName.
		 */
		assertNotHasBoolean: createNotPropertyOfTypeAssertion("assertNotHasBoolean", "boolean"),
		
		/**
		 * Asserts that object has an object with the name propertyName.
		 */
		assertHasObject: createPropertyOfTypeAssertion("assertHasObject", "object"),
		
		/**
		 * Asserts that object does not have an object with the name propertyName.
		 */
		assertNotHasObject: createNotPropertyOfTypeAssertion("assertNotHasObject", "object"),
		
		/**
		 * Asserts that object has an array with the name propertyName.
		 */
		assertHasArray: createPropertyOfTypeAssertion("assertHasArray", "array", function (value) {
			return value instanceof Array;
		}),
		
		/**
		 * Asserts that object does not have an array with the name propertyName.
		 */
		assertNotHasArray: createNotPropertyOfTypeAssertion("assertNotHasArray", "array", function (value) {
			return value instanceof Array;
		}),
		
		/**
		 * Asserts that 'object' is empty. That means it's an empty array
		 * or an empty string.
		 */
		assertEmpty: function (value, customMessage) {
			var message = renderMessage("assertEmpty",
				"{{ value }} is not empty", {
				value: JSON.stringify(value)
			});
			
			this.assert(isEmpty(value), message, customMessage);
		},
		
		/**
		 * Asserts that 'object' is not empty.
		 */
		assertNotEmpty: function (value, customMessage) {
			var message = renderMessage("assertNotEmpty",
				"{{ value }} is empty", {
				value: JSON.stringify(value)
			});
			
			this.assert(!isEmpty(value), message, customMessage);
		}
	};
	
	var Set = Class.extend({
		init: function () {
			this.values = [];
		},
		
		call: function (methodName /*, ...args */) {
			var args = makeArray(arguments, 1);
			
			this.each(function (value) {
				value[methodName].apply(value, args);
			}, this);
		},
		
		each: function (fn, context) {
			var values = this.values;
			var len = values.length;
			var ret;
			
			for (var i = 0; i < len; i++) {
				ret = fn.call(context, values[i]);
				
				if (ret) {
					break;
				}
			}
			
			return ret;
		},
		
		indexOf: function (value) {
			return this.values.indexOf(value);
		},
		
		add: function (value) {
			if (this.has(value)) {
				return;
			}
			
			this.values.push(value);
			
			return this;
		},
		
		remove: function (value) {
			var index = this.indexOf(value);
			
			if (index != -1) {
				this.values.splice(index, 1);
			}
			
			return this;
		},
		
		has: function (value) {
			return this.indexOf(value) != -1;
		},
		
		length: function () {
			return this.values.length;
		}
	});
	
	var eachCase = function (fn, context) {
		var ret;
		
		for (var i = 0, testCase; testCase = cases[i]; i++) {
			ret = fn.call(context, testCase);
			
			if (ret) {
				break;
			}
		}
		
		return ret;
	};
	
	var TestRunner = Class.extend({
		init: function () {
			this.handlers = new unittest.Set();
		},
		
		/**
		 * Runs all of the test cases that have been defined up until the point
		 * at which this method is called.
		 */
		run: function () {
			var result = new RunResult();
			
			this.handlers.call("startRun");
			
			if (cases.length === 0) {
				this.handlers.call("noCases");
			} else {
				unittest.eachCase(function (testCase) {
					if (testCase instanceof Section) {
						var section = testCase;
						this.handlers.call("section", section);
					} else {
						var testCaseResult = testCase.run(this.handlers);
						result.testCaseResults.add(testCaseResult);
					}
				}, this);
			}
			
			result.finish();
			this.handlers.call("endRun", result);
			
			return result;
		}
	});
	
	var RunResult = Class.extend({
		init: function () {
			this.testCaseResults = new unittest.Set();
			this.failedTestCount = 0;
			this.assertions = {
				passed: 0,
				failed: 0
			};
		},
		
		testCasesRun: function () {
			return this.testCaseResults.length();
		},
		
		finish: function () {
			this.failedTestCount = 0;
			this.assertions = {
				passed: 0,
				failed: 0
			};
			
			this.testCaseResults.each(function (testCaseResult) {
				this.failedTestCount += testCaseResult.failedTestResults.length();
				this.assertions.passed += testCaseResult.assertions.passed;
				this.assertions.failed += testCaseResult.assertions.failed;
			}, this);
		}
	});
	
	var TestCase = Class.extend({
		init: function (name, definition) {
			this.name = name;
			this.tests = new unittest.Set();
			
			// Process the definition and sanitize it before giving it to the context.
			for (var key in definition) {
				if (startsWith(key, "test") && typeof definition[key] === "function") {
					this.tests.add(new Test(this, key, definition[key]));
					delete definition[key];
				}
			}
			
			move(this, definition, [
				"beforeCase",
				"beforeTest",
				"afterTest",
				"afterCase"
			]);
			
			// Create the `this` object for tests.
			this.context = new TestContext(definition);
		},
		
		beforeCase: function (caseName) {},
		beforeTest: function (testName) {},
		afterTest: function (testName) {},
		afterCase: function (caseName) {},
		
		run: function (handlers) {
			handlers.call("startTestCase", this);
			
			var result = new TestCaseResult(this);
			
			this.beforeCase.call(this.context, this.name);
			
			if (this.tests.length() === 0) {
				handlers.call("noTests", this);
			} else {
				this.tests.each(function (test) {
					var testResult = test.run(handlers);
					
					if (!testResult.passed) {
						result.failedTestResults.add(testResult);
					}
					
					result.testResults.add(testResult);
				}, this);
			}
			
			this.afterCase.call(this.context, this.name);
			
			result.finish();
			handlers.call("endTestCase", result);
			
			return result;
		}
	});
	
	var TestCaseResult = Class.extend({
		init: function (testCase) {
			this.testCase = testCase;
			this.testResults = new unittest.Set();
			this.failedTestResults = new unittest.Set();
			this.assertions = {
				passed: 0,
				failed: 0
			};
		},
		
		testsRun: function () {
			this.testResults.length();
		},
		
		finish: function () {
			this.assertions = {
				passed: 0,
				failed: 0
			};
			
			this.testResults.each(function (testResult) {
				this.assertions.passed += testResult.assertions.passed;
				this.assertions.failed += testResult.assertions.failed;
			}, this);
		}
	});
	
	var Test = Class.extend({
		init: function (testCase, name, fn) {
			this.testCase = testCase;
			this.name = name;
			this.fn = fn;
		},
		
		run: function (handlers) {
			handlers.call("startTest", this);
			
			var result = new TestResult(this);
			var context = this.context();
			
			// TODO: Figure out a better way to do this.
			context.messages = [];
			context.assertions = {
				passed: 0,
				failed: 0
			};
			
			this.testCase.beforeTest.call(context, this.name);
			
			try {
				this.fn.call(context);
			} catch (e) {
				result.passed = false;
				result.error = e;
			}
			
			this.testCase.afterTest.call(context, this.name);
			
			move(result, context, [
				"message",
				"assertions"
			]);
			
			result.finish();
			handlers.call("endTest", result);
			
			return result;
		},
		
		context: function () {
			return this.testCase.context;
		}
	});
	
	var TestResult = Class.extend({
		init: function (test) {
			this.test = test;
			this.passed = true; // Tests pass unless there's an error.
			this.message = [];
			this.assertions = {
				passed: 0,
				failed: 0
			};
		},
		
		finish: function () {
			this.assertionCount = this.assertions.passed + this.assertions.failed;
		}
	});
	
	/**
	 * This is the `this` value when you're in a test.
	 */
	var TestContext = Class.extend({
		init: function (definition) {
			// These fields will be populated during a test run.
			this.messages = [];
			this.assertions = {};
			
			extend(this, unittest.assert);          // Default assertions.
			extend(this, unittest.assert.custom);   // Global custom assertions.
			extend(this, definition.assert);        // Local custom assertions.
			delete definition.assert;
			extend(this, definition);
		},
		
		message: function (message) {
			this.messages.push(message);
		}
	});
	
	/**
	 * TestCases are the objects that contain all of your tests and the logic
	 * for running them.
	 * 
	 * To create a test case, you create a new 'instance' of this class and
	 * pass in an object containing your individual tests and setup/teardown
	 * methods
	 */
	function testCase (name, definition) {
		cases.push(new TestCase(name, definition));
	};
	
	var Section = Class.extend({
		init: function (label) {
			this.label = label;
		}
	});
	
	function section (label) {
		cases.push(new Section(label));
	}
	
	global.unittest = {
		assert: assert,
		
		AssertionError: AssertionError,
		Set: Set,
		TestRunner: TestRunner,
		
		testCase: testCase,
		section: section,
		
		eachCase: eachCase,
		
		/**
		 * A unittest.js handler is a proxy object that takes output from a unittest.js run
		 * and displays it in whatever medium the handler chooses. The 'handler'
		 * property of unittest contains unittest.js's default handlers, so you can jump
		 * right in and start using it.
		 */
		handler: {
			TestHandler: TestHandler,
			
			ConsoleHandler: ConsoleHandler,
			NodeJSHandler: NodeJSHandler,
			HTMLHandler: HTMLHandler,
			
			DEFAULT: ConsoleHandler
		}
	};
})(this);
