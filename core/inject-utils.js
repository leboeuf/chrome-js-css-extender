var InjectUtils = {
	injectCSS: function(css, id) {
		var style = document.createElement('style');
		style.type = 'text/css';
		if (id != undefined)
			style.setAttribute('id', id);
		style.appendChild(document.createTextNode(css));
		document.documentElement.appendChild(style);
	},

	injectJS: function(js, id) {
		var script = document.createElement('script');
		if (id != undefined)
			script.setAttribute('id', id);
		script.appendChild(document.createTextNode(js));
		document.documentElement.appendChild(script);
	}
};


// https://github.com/ankit/stylebot/blob/master/stylebot/browseraction/browseraction.js
// chrome.tabs.sendRequest(this.tab.id, { //sendRequest deprecated, use chrome.runtime.sendMessage(string extensionId, any message, object options, function responseCallback) or chrome.tabs.sendMessage(integer tabId, any message, object options, function responseCallback)
//       name: 'install',
//       id: id,
//       title: $el.data('title'),
//       timestamp: $el.data('timestamp'),
//       url: $el.data('url'),
//       css: this.css[id]
//     }, function() {});

// chrome.tabs.sendRequest(this.tab.id, {
//       name: 'toggle'
//     }, function() {}); window.close();

// $(document).ready(function() {
//   BrowserAction.init();
// });