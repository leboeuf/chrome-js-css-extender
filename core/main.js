var extender = {
	options: {},

	initialize: function(options) {
		this.setOptions(options);
	},

	setOptions: function(options) {
		for (var option in options) {
			this.options[option] = options[option];
		}	
	},
};

function loadAllStorage(callback)
{
	// Load options, styles and scripts from local storage
	chrome.storage.local.get(['options', 'styles'], function(items) {
		if (items['options']) {
			cache.options = items['options'];
		}

		if (items['styles']) {
			cache.styles = items['styles'];
		}

		if (items['scripts']) {
			cache.scripts = items['scripts'];
		}

		if (callback) {
			callback();
		}
	});
}