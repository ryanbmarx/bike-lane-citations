import {scaleQuantize} from 'd3-scale';
import {extent} from 'd3-array';
import * as L from "leaflet";
import 'leaflet-providers';

// import inlineQuantLegend from './inline-quant-legend.js';

function styleFeature(featureFillColor){
	// http://leafletjs.com/reference.html#path-options
	return {
		color: "#eee",
		stroke:true,
		weight:1,
		fillColor:featureFillColor,
		className:'tract',
		fillOpacity: .9
	};
}

function onEachFeature(feature, layer){
	// Everything in this function is executed on each feature.
	layer.id = feature.properties.NAME10;
	layer.bindPopup(feature.properties.NAMELSAD10);
}


class ChicagoChropleth {
	constructor(options){
		const app = this;
		app.options = options;
		app.container = app.options.container;
		app.data = app.options.data;
		app.ROOT_URL = app.options.ROOT_URL != undefined ? app.options.ROOT_URL : "";

		app.initMap();
		app.drawGeojson(app.data, app.options.propertyToMap, app.options.colorRamp)
	}

	initMap(){
		const app = this;
		app.map =  L.map(app.container,
			{
				center: app.options.mapCenter,
				zoom: 10,
				scrollWheelZoom:false,
				maxZoom:16
			}
		);

		if (app.options.maxBounds != undefined){
			console.log('setting max bounds');
			const max = app.options.maxBounds;
			console.log(max);
			app.map.setMaxBounds(L.latLngBounds(max[0], max[1]));
		}

		// L.tileLayer.provider('Hydda.Full').addTo(app.map);
		L.tileLayer.provider('OpenStreetMap.BlackAndWhite').addTo(app.map);
		// L.tileLayer.provider('Stamen.TonerBackground').addTo(app.map);
	}

	drawGeojson(data, propertyToMap, colorRamp){
		const app = this;
		// Make a scale using the desired feature attriobute.
		const dataExtent = extent(data.features, d => parseFloat(d.properties[propertyToMap]));

		const mapDataScale = scaleQuantize()
			.domain(dataExtent)
			.range(colorRamp);

		// inlineQuantLegend(mapDataScale);

		// This applies the geojson to the map 
			L.geoJSON(data, {
				style: function(feature){
					// console.log(mapDataScale(parseFloat(feature.properties[propertyToMap])), feature.properties[propertyToMap]);
					const featureFillColor = mapDataScale(parseFloat(feature.properties[propertyToMap]));
					// Returns a style object for each tract
					return styleFeature(featureFillColor);
				},
				onEachFeature: onEachFeature
			}).addTo(app.map);
	}
}


module.exports = ChicagoChropleth