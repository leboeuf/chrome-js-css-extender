var optionsCache;

(function() {
	loadOptionsFromStorage();
})();

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if (message['message'] == 'optionsCacheUpdated')
		loadOptionsFromStorage(); // Reload options cache
});

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

function loadOptionsFromStorage() {
	chrome.storage.sync.get(null, function(items){
		optionsCache = items['options'] || {};
	});
}

function getCustomJs(url) {
	// TODO: maybe add the following placeholder when creating a custom JS: (function() { ... })();
	var isGlobalJsEnabled = optionsCache['IsGlobalJsEnabled'] || false;
	var customJs = optionsCache['sites'][url] !== undefined && optionsCache['sites'][url] !== undefined
		? optionsCache['sites'][url]['js'] || ''
		: '';
		
	if (customJs == '')
	{
		// Look for wildcards at the end of the string (TODO: make true wildcards that can be anywhere in the string)
		for (var siteUrl in optionsCache['sites']){
			if (siteUrl.indexOf('*') !== -1){
				let siteUrlWithoutWildcard = siteUrl.replace('*', '');
				if (url.includes(siteUrlWithoutWildcard)){
					customJs = optionsCache['sites'][siteUrl]['js'] || '';
					break;
				}
			}
		}
	}

	if (isGlobalJsEnabled)
	{
		customJs += optionsCache['globalJs'];
	}

	return customJs;
}