export default function OpenGraphAlertsDynamic({ alertData }) {
	//
	// A. Render components
	return (
		<div style={{ backgroundColor: '#fff', display: 'flex', height: '100%', width: '100%' }}>
			<OpenGraphAlertTitle alert={alertData} />
		</div>
	);
}

function OpenGraphAlertTitle({ alert }) {
	console.log('This is the alert: ', alert);

	return (
		<p>{alert}</p>
	);
}
