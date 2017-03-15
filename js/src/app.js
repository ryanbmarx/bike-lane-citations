import ChicagoChorpleth from './chicago-choropleth.js';
import {json} from 'd3-request';


window.onload = function(){
	console.log('window is onloaded');
	const container = document.querySelector('#map');
	json(`http://${ window.ROOT_URL }/data/test-tract-data2.geojson`, (err, data) => {
		if (err) throw err;

		const commuters = new ChicagoChorpleth({
			container: container,
			data:  data,
			ROOT_URL: window.ROOT_URL,
			mapCenter: [41.886635, -87.637839],
			propertyToMap: 'hispanic',
			// As many hex color strings (in order of lowest to highest) 
			// as you would like, stored in an array.

			colorRamp:[
				"#FFFFC4",
				"#F5F50A",
				"#EB964F",
				"#C11B17"
			],
			// Must provide two lat/lng pairs (northwest and southeast 
			// corners of the constrinaing rectangle) using this formula:
			// [
			//	  [swLat, swLng], 
			//	  [neLat, neLng]
			// ]
			maxBounds:[
				[41.627651, -87.923735], 
				[42.036434, -87.488402]
			]
		})

	})

}