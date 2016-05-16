var Options = {
	optionsCache: {},

	init: function(options) {
		console.log(options);
		optionsCache = options['options'] || {};

		// Update UI with options from storage
		$('input[type=checkbox]').each(function(i, e) {
			$this = $(e);
			var optionKey = $this.data('optionkey');
			$this.prop('checked', optionsCache[optionKey]);
		});

		this.attachListeners();
	},

	attachListeners: function() {
		$('#main-container')
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
	},

	// Persist what is in the edition textarea (happens then the user clicks 'Save')
	persistEditbox: function() {
		var $editDiv = $('#edit');
		var optionKey = $editDiv.find('#edit-target').val();
		var value = $editDiv.find('textarea').val();

		if (optionKey.indexOf('js-') === 0 || optionKey.indexOf('css-'))
			Options.addOrEditCustomJsOrCss(optionKey, value);
		else
			optionsCache[optionKey] = value;

		chrome.storage.sync.set({ 'options': optionsCache }, null);
		//todo: chrome.storage.sync.set({ 'css' / 'js' / ... : $options.css/js/... }, null);

		Options.closeEdit();
	},

	buttonClick: function(e) {
		var $this = $(e.target);
		var action = $this.data('action');

		if (action === undefined)
			return;

		switch (action) {
			case 'add':
			case 'edit-js':
				var targetUrl = 'todo';
				Options.edit('js-' + targetUrl, 'Edit JS', '');
				break;
			case 'edit-css':
				var targetUrl = 'todo';
				Options.edit('css-' + targetUrl, 'Edit CSS', '');
				break;
			case 'import':
			case 'backup':
			case 'edit-global-js':
				Options.edit('globalJs', 'Edit global JS', optionsCache['globalJs'] || '');
				break;
			case 'edit-global-css':
				Options.edit('globalCss', 'Edit global CSS', optionsCache['globalCss'] || '');
				break;
			case 'save':
				Options.persistEditbox();
				break;
			case 'cancel':
				Options.closeEdit();
				break;
			default:
				break;
		}
	},

	edit: function(target, titleText, content) {
		var $editDiv = $('#edit');
		$editDiv.find('h2').text(titleText);
		$editDiv.find('#edit-target').val(target);
		$editDiv.find('textarea').val(content);
		$editDiv.show();
	},

	closeEdit: function() {
		var $editDiv = $('#edit');
		$editDiv.find('h2').text('');
		$editDiv.find('#edit-target').val('');
		$editDiv.find('textarea').val('');
		$editDiv.hide();
	},

	addOrEditCustomJsOrCss: function(target, content) {

	}
}

$(function(){
	// chrome.storage.sync.clear(); // Debug: use this to clear options

	// Get all storage items and initialize everything
	chrome.storage.sync.get(null, function(items){
		Options.init(items);
	});
});