chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	switch (message.name) {
		case 'edit_custom_css':
			alert('test');
			break;
		case 'edit_custom_js':
			alert('test');
			break;
	}
});

chrome.extension.sendMessage({ name: 'test' });