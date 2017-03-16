import ChicagoChorpleth from './chicago-choropleth.js';
import {json} from 'd3-request';


window.onload = function(){
	console.log('window is onloaded');
	
	const maps = document.querySelectorAll('.map');

	json(`http://${ window.ROOT_URL }/data/tickets-population-nonwhite.geojson`, (err, data) => {
		if (err) throw err;

		for (var i = 0; i < maps.length; i++){
			
			const property = maps[i].dataset.value;
			const format = maps[i].dataset.format;
			console.log(format);

			const commuters = new ChicagoChorpleth({
				container: maps[i].querySelector('.map__container'),
				data:  data,
				ROOT_URL: window.ROOT_URL,
				mapCenter: [41.886635, -87.637839],
				propertyToMap: property,
				// Use false or omit to skip tooltips. Otherwise, put the string of the feature property to go in the tooltip.
				tooltipPropertyLabel: false,
				// As many hex color strings (in order of lowest to highest) 
				// as you would like, stored in an array.
				colorRamp:["#FFFFC4","#F5F50A","#EB964F","#C11B17"],
				opacityRamp:[.5, .8, .8, .8],
				addLegend:true, // Whether or not to show a legend
				legendFormatString:format, // d3.format() string.
				propertyStrokeColor:"#eee", // border color for each shape on the map
				propertyStrokeWeight:1, // Border weight for each feature
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
		}



	})

}