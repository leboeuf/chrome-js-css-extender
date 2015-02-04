var Options = {
	init: function() {
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

		chrome.storage.sync.set({ optionKey: $this.val() }, null);
		//todo: chrome.storage.sync.set({ 'css' / 'js' / ... : $options.css/js/... }, null);
	}
}

$(function(){
	// DEBUG: get all storage items
	chrome.storage.sync.get(null, function(items){
		console.log(items);
		for (i = 0; i < items.length; i++) { 
		    $("#debug").text(items[i]);
		}
	});

	Options.init();
});