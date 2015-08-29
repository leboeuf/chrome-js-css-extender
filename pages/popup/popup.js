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

}

function editCustomJs() {
	
}

//http://stackoverflow.com/questions/9915311/chrome-extension-code-vs-content-scripts-vs-injected-scripts