var InjectUtils = {
	injectCSS: function(css, id) {
		var style = document.createElement('style');
		style.type = 'text/css';
		if (id != undefined)
			style.setAttribute('id', id);
		style.appendChild(document.createTextNode(css));
		document.documentElement.appendChild(style);
	}
};


// https://github.com/ankit/stylebot/blob/master/stylebot/browseraction/browseraction.js
// chrome.tabs.sendRequest(this.tab.id, {
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