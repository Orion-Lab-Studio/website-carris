addEventListener('message', (event: MessageEvent<string>) => {
	postMessage('this came from the worker');
});
