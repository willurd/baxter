	baxter = new Baxter();
	baxter.template = bind(baxter, baxter.template);
	baxter.template.debug = false;
	
	baxter.template.noConflict = function () {
		ns[alias] = previousAtAlias;
		return ns.baxter;
	};
	
	ns.baxter = baxter.template;
	ns[alias] = ns.baxter;
})(this);
