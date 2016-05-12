var Options = {
	optionsCache: {},

	init: function(options) {
		optionsCache = options === undefined ? {} : options;
		console.log(optionsCache);

		// Update UI with options from storage
		//$('input[data-optionkey=IsGlobalCssEnabled]')
		$('input[type=checkbox]').each(function(i, e) {
			$this = $(e);
			var optionKey = $this.data('optionkey');
			$this.prop('checked', optionsCache[optionKey]);
		});

		this.attachListeners();
	},

	attachListeners: function() {
		$('#options')
			.on('click', 'input[type=checkbox]', this.toggle);
	},

	toggle: function(e) {
		var $this = $(e.target);
		var optionKey = $this.data('optionkey');

		if (optionKey === undefined)
			return;

		optionsCache[optionKey] = $this.is(':checked');

		chrome.storage.sync.set({ 'options': optionsCache }, null);
		//todo: chrome.storage.sync.set({ 'css' / 'js' / ... : $options.css/js/... }, null);
	}
}

$(function(){
	//chrome.storage.sync.clear(); // Debug: use this to clear options

	// Get all storage items and initialize everything
	chrome.storage.sync.get(null, function(items){
		Options.init(items['options']);
	});
});