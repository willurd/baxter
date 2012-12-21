	baxter = new Baxter();
	baxter.template = bind(baxter, baxter.template);
	baxter.template.debug = false;
	global.baxter = baxter.template;
})(this);
