module.exports = function (grunt) {
	// Example config: https://gist.github.com/3184517
	grunt.initConfig({
		files: {
			grunt: "grunt.js",
			src: [
				"src/utils.js",
				"src/AST.js",
				"src/Parser.js",
				"src/Template.js",
				"src/Baxter.js"
			],
			test: "test/**/*.js",
			build: "build/baxter.js",
			buildmin: "build/baxter.min.js"
		},
		lint: {
			before: [
				"<config:files.grunt>",
				"<config:files.src>",
				"<config:files.test>"
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
			}
		}
	});
	
	grunt.registerTask("default", "lint:before concat lint:after");
};
