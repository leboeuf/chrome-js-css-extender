// This is triggered when a document has finished loading
// see http://stackoverflow.com/questions/27239280 for pushstate (e.g. youtube pages that load via ajax)
chrome.webNavigation.onCompleted.addListener(function(o) {

	// Only act on the main page
	if (o.frameId > 0) return;

	chrome.tabs.executeScript(o.tabId, {
		code: 'document.body.style.backgroundColor="red"'
	});
}, {
	url: []
});