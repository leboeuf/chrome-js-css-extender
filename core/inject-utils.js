var InjectUtils = {
	injectCSS: function(css, id) {
		var style = document.createElement('style');
		style.type = 'text/css';
		if (id != undefined)
			style.setAttribute('id', id);
		style.appendChild(document.createTextNode(css));
		document.documentElement.appendChild(style);
	},

	injectJS: function(js, id) {
		var script = document.createElement('script');
		if (id != undefined)
			script.setAttribute('id', id);
		script.appendChild(document.createTextNode(js));
		document.documentElement.appendChild(script);
	}
};