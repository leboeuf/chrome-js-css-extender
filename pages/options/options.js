var Options = {
	optionsCache: {},

	init: function(options) {
		optionsCache = options;

		// Update UI with options from storage
		//$('input[data-optionkey=IsGlobalCssEnabled]')

		this.attachListeners();
	},

	attachListeners: function() {
		$("#options")
			.on("click", "input", this.toggle);
	},

	toggle: function(e) {
		var $this = $(e.target);
		var optionKey = $this.data("optionkey");

		if (optionKey === undefined)
			return;

		optionsCache[optionKey] = $this.val();

		chrome.storage.sync.set({ 'options': optionsCache }, null);
		//todo: chrome.storage.sync.set({ 'css' / 'js' / ... : $options.css/js/... }, null);
	}
}

$(function(){
	//chrome.storage.sync.clear(); // Debug: use this to clear options

	// Get all storage items and initialize everything
	chrome.storage.sync.get(null, function(items){
		console.log(items);
		Options.init(items);
	});
});