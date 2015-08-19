chrome.webNavigation.onCompleted.addListener(function(o) {
	chrome.tabs.executeScript(o.tabId, {
		code: "alert('ok');"
	});
}, {
	url: []
});