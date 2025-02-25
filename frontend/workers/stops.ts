//

//
// This is the worker that will fetch the locality name for a given locality
self.addEventListener('message', (event: MessageEvent) => {
	const { localities, municipalities, stops } = event.data;

	stops.forEach((stop) => {
		const municipality = municipalities.find(municipality => municipality.id === stop.municipality_id);
		const locality = localities.find(location => location.id === stop.locality_id);

		if (locality) {
			stop.locality_name = locality.name;
		}

		if (municipality) {
			stop.municipality_name = municipality.name;
		}
	});
	console.log(stops);

	self.postMessage(stops);
});

//
