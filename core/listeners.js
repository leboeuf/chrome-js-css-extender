chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	switch (message.name) {
		case 'activateBrowserAction':
			alert('test');
			break;
	}
});

chrome.extension.sendMessage({ name: 'test' });