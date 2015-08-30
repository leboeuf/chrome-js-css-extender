$(function(){
	$("#toggle").click(function(){ toggleEnabledOnThisSite($(this).prop('checked')); });
	$("#css").click(function(){ editCustomCss(); });
	$("#js").click(function(){ editCustomJs() });
});

function getStoredFile() {
	chrome.storage.sync.get('itemKeyHere', callbackFromGetStoredFile);
}

function callbackFromGetStoredFile() {

}

function toggleEnabledOnThisSite(isEnabled) {

}

function editCustomCss() {
	console.log(getCurrentTabUrl());
}

function editCustomJs() {
	
}

function getCurrentTabUrl() {
	var url;
	chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
		// http://stackoverflow.com/questions/6132018
		// Since only one tab should be active and in the current window at once
		// the return variable should only have one entry
		var activeTab = arrayOfTabs[0];
		url = activeTab.url;
	});
	return url;
	// see: http://stackoverflow.com/questions/18592705 for async
}



//http://stackoverflow.com/questions/9915311/chrome-extension-code-vs-content-scripts-vs-injected-scripts