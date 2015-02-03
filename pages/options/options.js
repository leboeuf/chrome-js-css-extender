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
		console.log($this);
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