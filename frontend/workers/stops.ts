//

//
// This is the worker that will fetch the locality name for a given locality
self.addEventListener('message', (event: MessageEvent) => {
	const { localities, municipalities, stops, type } = event.data;

	switch (type) {
		case 'stop_add_extra_fields':
			console.log(type);
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

			self.postMessage(stops);
			break;
		case 'stop_map_geojson':
			console.log('hit here');
			break;
		default:
			break;
	}
});

//
