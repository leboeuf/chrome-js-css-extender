$(function(){
	$("#toggle").click(function(){ alert('clicked'); });
	$("#css").click(function(){ alert('clicked'); });
	$("#js").click(function(){ alert('clicked'); });
});

function getStoredFile() {
	chrome.storage.sync.get('itemKeyHere', callbackFromGetStoredFile);
}

function callbackFromGetStoredFile() {

}

//http://stackoverflow.com/questions/9915311/chrome-extension-code-vs-content-scripts-vs-injected-scripts