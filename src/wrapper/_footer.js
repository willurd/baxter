	baxter = new Baxter();
	baxter.template = bind(baxter, baxter.template);
	baxter.template.debug = false;
	
	baxter.template.noConflict = function () {
		global[alias] = previousAtAlias;
		return global.baxter;
	};
	
	global.baxter = baxter.template;
	global[alias] = global.baxter;
})(this);
