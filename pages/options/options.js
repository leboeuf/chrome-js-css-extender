$(function(){
	// DEBUG: get all storage items
	chrome.storage.sync.get(null, function(items){
		console.log(items);
		for (i = 0; i < items.length; i++) { 
		    $("#debug").text(items[i]);
		}
	});
});