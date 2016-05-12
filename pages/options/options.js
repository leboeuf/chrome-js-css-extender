var Options = {
	optionsCache: {},
	globalJs: '',
	globalCss: '',

	init: function(options) {
		console.log(options);
		optionsCache = options['options'] === undefined ? {} : options['options'];
		globalJs = options['globalJs'] === undefined ? {} : options['globalJs'];
		globalJs = options['globalCss'] === undefined ? {} : options['globalCss'];

		// Update UI with options from storage
		$('input[type=checkbox]').each(function(i, e) {
			$this = $(e);
			var optionKey = $this.data('optionkey');
			$this.prop('checked', optionsCache[optionKey]);
		});

		this.attachListeners();
	},

	attachListeners: function() {
		$('#options')
			.on('click', 'input[type=checkbox]', this.toggle)
			.on('click', 'button', this.buttonClick);
	},

	toggle: function(e) {
		var $this = $(e.target);
		var optionKey = $this.data('optionkey');

		if (optionKey === undefined)
			return;

		optionsCache[optionKey] = $this.is(':checked');

		chrome.storage.sync.set({ 'options': optionsCache }, null);
		//todo: chrome.storage.sync.set({ 'css' / 'js' / ... : $options.css/js/... }, null);
	},

	buttonClick: function(e) {
		var $this = $(e.target);
		var action = $this.data('action');

		if (action === undefined)
			return;

		switch (action) {
			case 'add':
			case 'import':
			case 'backup':
			case 'edit-global-js':
				Options.edit('globalJs', 'Edit global JS', this.globalJs);
				break;
			case 'edit-global-css':
				Options.edit('globalCss', 'Edit global CSS', this.globalCss);
				break;
			default:
				break;
		}
	},

	edit: function(target, titleText, content) {
		var $editDiv = $('#edit');
		$editDiv.find('h2').text(titleText);
		$editDiv.find('textarea').val(content);
		$editDiv.show();
	}
}

$(function(){
	//chrome.storage.sync.clear(); // Debug: use this to clear options

	// Get all storage items and initialize everything
	chrome.storage.sync.get(null, function(items){
		Options.init(items);
	});
});