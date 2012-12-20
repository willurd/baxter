module.exports = function (grunt) {
	// Example config: https://gist.github.com/3184517
	grunt.initConfig({
		files: {
			grunt: "grunt.js",
			src: [
				"src/utils.js",
				"src/error/EOFError.js",
				"src/Environment.js",
				"src/Buffer.js",
				"src/ast/ASTNode.js",
				"src/ast/ASTString.js",
				"src/ast/AST.js",
				"src/Parser.js",
				"src/Template.js",
				"src/Baxter.js"
			],
			tests: "test/**/*.js",
			build: "build/baxter.js",
			buildmin: "build/baxter.min.js"
		},
		lint: {
			tests: [
				"<config:files.tests>"
			],
			before: [
				"<config:files.grunt>",
				"<config:files.src>",
				"<config:files.tests>"
			],
			after: [
				"<config:files.build>"
			]
		},
		jshint: {
			options: {
				browser: true
			}
		},
		concat: {
			dist: {
				src: [
					"src/_header.js",
					"<config:files.src>",
					"src/_footer.js"
				],
				dest: "<config:files.build>"
			}
		},
		watch: {
			src: {
				files: [
					"<config:files.src>",
					"<config:files.grunt>"
				],
				tasks: ["default"]
			},
			tests: {
				files: [
					"<config:files.tests>"
				],
				tasks: ["lint:tests"]
			}
		}
	});
	
	grunt.registerTask("default", "lint:before concat lint:after");
};
