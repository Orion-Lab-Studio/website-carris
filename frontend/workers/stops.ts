//

//
// This is the worker that will fetch the locality name for a given locality
self.addEventListener('message', (event: MessageEvent) => {
	const { locations, stops } = event.data;

	stops.forEach((stop) => {
		const locality = locations.find(location => location.municipality_id === stop.municipality_id);

		if (locality) {
			stop.stop_locality_name = locality.name;
			stop.display = locality.display;
		}
	});

	self.postMessage(stops);
});

//
