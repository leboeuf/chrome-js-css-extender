var optionsCache;

(function() {
	chrome.storage.sync.get(null, function(items){
		optionsCache = items['options'] || {};
	});
})();

// This is triggered when a document has finished loading
// see http://stackoverflow.com/questions/27239280 for pushstate (e.g. youtube pages that load via ajax)
chrome.webNavigation.onCompleted.addListener(function(o) {
	// Only act on the main page
	if (o.frameId > 0) return;

	// TODO: check if there is custom JS or CSS to execute for this URL
	var match = 'https://www.google.com/calendar/render';
	var customJs = getCustomJs(o.url);

	// Return if no custom JS or CSS for this URL
    //if (match !== o.url.substring(0, match.length)) return;

	chrome.tabs.executeScript(o.tabId, {
		code: customJs
	});
}, {
	url: []
});

function getCustomJs(url) {
	// TODO: maybe add the following placeholder when creating a custom JS: (function() { ... })();
	return '/*put-custom-js-here*/' + optionsCache['globalJs'];
}