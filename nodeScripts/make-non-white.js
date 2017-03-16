var fs = require('fs');

fs.readFile(`./data/tickets-population.geojson`, 'utf8', (err, data) => {
	var jsonData = JSON.parse(data);

	jsonData['features'].forEach(feature => {
		
		properties = feature.properties;
		
		properties['pop_nonwhite'] = properties['pop_total'] - properties['pop_white'];
	})


		


		fs.writeFile(`./data/tickets-population-nonwhite.geojson`, JSON.stringify(jsonData), (err) => {
			if(err) {
				return console.log(err);
			} else {
				return console.log('done writing file');
			}
		}); 
});

