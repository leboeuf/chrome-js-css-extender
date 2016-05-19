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

		Options.loadSitesTable();

		this.attachListeners();
	},

	loadSitesTable: function() {
		if (optionsCache['sites'] === undefined)
		{
			optionsCache['sites'] = {};
		}

		// Remove all table rows except header row
		$('#customization-list table tr:not(:first)').empty();

		// Add rows
		for (var site in optionsCache['sites']) {
			var $tr = $('<tr><td class="customized-url">' + site + '</td>' +
						'<td><button data-action="edit-js">Edit JS</button></td>' +
						'<td><button data-action="edit-css">Edit CSS</button></td>' +
						'<td><button data-action="delete">delete</button></td></tr>')

			$('#customization-list table').append($tr);
		}
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
		Options.persistOptionsCacheToStorage();
	},

	// Persist what is in the edition textarea (happens then the user clicks 'Save')
	persistEditbox: function() {
		var $editDiv = $('#edit');
		var optionKey = $editDiv.find('#edit-target').val();
		var value = $editDiv.find('textarea').val();
		var targetUrl = $editDiv.find('#edit-url').val();

		if (optionKey.indexOf('js-') === 0 || optionKey.indexOf('css-'))
			Options.addOrEditCustomJsOrCss(optionKey, value, targetUrl);
		else
			optionsCache[optionKey] = value;

		Options.persistOptionsCacheToStorage();
	},

	buttonClick: function(e) {
		var $this = $(e.target);
		var action = $this.data('action');

		if (action === undefined)
			return;

		switch (action) {
			case 'add':
				Options.edit('js-', 'Edit JS', '', '');
				break;
			case 'edit-js':
				var targetUrl = $this.parent().parent().find('.customized-url').text();
				Options.edit('js-' + targetUrl, 'Edit JS', optionsCache['sites'][targetUrl]['js'], targetUrl);
				break;
			case 'edit-css':
				var targetUrl = $this.parent().parent().find('.customized-url').text();
				Options.edit('css-' + targetUrl, 'Edit CSS', optionsCache['sites'][targetUrl]['css'], targetUrl);
				break;
			case 'delete':
				var targetUrl = $this.parent().parent().find('.customized-url').text();
				Options.delete(targetUrl);
				Options.loadSitesTable();
				Options.closeEdit();
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
				Options.loadSitesTable();
				Options.closeEdit();
				break;
			case 'cancel':
				Options.closeEdit();
				break;
			default:
				break;
		}
	},

	edit: function(target, titleText, content, url = '') {
		var $editDiv = $('#edit');
		$editDiv.find('h2').text(titleText);
		$editDiv.find('#edit-target').val(target);
		$editDiv.find('textarea').val(content);

		if (url != '')
		{
			$editDiv.find('#edit-url').val(url);
		}

		$editDiv.show();
	},

	delete: function(url) {
		delete optionsCache['sites'][url];
		Options.persistOptionsCacheToStorage();
	},

	closeEdit: function() {
		var $editDiv = $('#edit');
		$editDiv.find('h2').text('');
		$editDiv.find('#edit-target').val('');
		$editDiv.find('#edit-url').val('');
		$editDiv.find('textarea').val('');
		$editDiv.hide();
	},

	addOrEditCustomJsOrCss: function(target, content, newUrl) {
		var dashPos = target.indexOf('-');
		var oldUrl = target.substring(dashPos + 1);
		var jsOrCss = target.substring(0, dashPos);

		if (optionsCache['sites'][newUrl] === undefined)
		{
			optionsCache['sites'][newUrl] = {};
		}

		if (newUrl != oldUrl && optionsCache[oldUrl] !== undefined)
		{
			// Move other (JS or CSS) content if present
			var oldJs = optionsCache['sites'][oldUrl]['js'];
			var oldCss = optionsCache['sites'][oldUrl]['css'];
			optionsCache['sites'][newUrl][js] = oldJs;
			optionsCache['sites'][newUrl][css] = oldCss;

			delete optionsCache['sites'][oldUrl];
			
			Options.loadSitesTable();
		}

		optionsCache['sites'][newUrl][jsOrCss] = content;
		Options.persistOptionsCacheToStorage();
	},

	persistOptionsCacheToStorage: function() {
		chrome.storage.sync.set({ 'options': optionsCache }, null);
		chrome.runtime.sendMessage({ message: 'optionsCacheUpdated' }, null);
	}
}

$(function(){
	// chrome.storage.sync.clear(); // Debug: use this to clear options

	// Get all storage items and initialize everything
	chrome.storage.sync.get(null, function(items){
		Options.init(items);
	});
});