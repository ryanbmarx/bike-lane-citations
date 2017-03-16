import {scaleQuantize} from 'd3-scale';
import {extent} from 'd3-array';
import * as d3 from 'd3-selection';
import * as L from "leaflet";
import 'leaflet-providers';
import inlineQuantLegend from './inline-quant-legend.js';

function styleFeature(featureFillColor, featureOpacityColor){
	// http://leafletjs.com/reference.html#path-options
	return {
		color: "#eee",
		stroke:true,
		weight:1,
		fillColor:featureFillColor,
		className:'tract',
		fillOpacity: featureOpacityColor
	};
}

function onEachFeature(feature, layer, tooltips){
	// Everything in this function is executed on each feature.
	if (tooltips != false && tooltips != undefined){
		layer.id = feature.properties[tooltips];
		layer.bindPopup(feature.properties[tooltips]);
	}
}


class ChicagoChropleth {
	constructor(options){
		const app = this;
		app.options = options;
		app.container = app.options.container;
		app.data = app.options.data;
		app.ROOT_URL = app.options.ROOT_URL != undefined ? app.options.ROOT_URL : "";
		app.tooltips = app.options.tooltipPropertyLabel;

		app.initMap();
		app.drawGeojson(app.data, app.options.propertyToMap, app.options.colorRamp, app.options.opacityRamp)
		
		console.log(app.options.addLegend);
		if (app.options.addLegend == true) {
			app.addLegend()
		}
	}

	addLegend(){
	// 	console.log('adding legend');
	// 	const app = this;
	// 	const legendContainer = d3.select(app.container)
	// 		.append('div')
	// 		.classed('legend', true);
	// 	app.addLegend(legendContainer);
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
			const max = app.options.maxBounds;
			app.map.setMaxBounds(L.latLngBounds(max[0], max[1]));
		}

		// L.tileLayer.provider('Hydda.Full').addTo(app.map);
		L.tileLayer.provider('OpenStreetMap.BlackAndWhite').addTo(app.map);
		// L.tileLayer.provider('Stamen.TonerBackground').addTo(app.map);
	}

	drawGeojson(data, propertyToMap, colorRamp, opacityRamp){
		const app = this;
		// Make a scale using the desired feature attriobute.
		const dataExtent = extent(data.features, d => parseFloat(d.properties[propertyToMap]));

		const mapColorScale = scaleQuantize()
			.domain(dataExtent)
			.range(colorRamp);

		const mapOpacityScale = scaleQuantize()
			.domain(dataExtent)
			.range(opacityRamp);

		// inlineQuantLegend(mapColorScale);

		// This applies the geojson to the map 
			L.geoJSON(data, {
				style: function(feature){
					// console.log(mapColorScale(parseFloat(feature.properties[propertyToMap])), feature.properties[propertyToMap]);
					const featureFillColor = mapColorScale(parseFloat(feature.properties[propertyToMap]));
					const featureFillOpacity = mapOpacityScale(parseFloat(feature.properties[propertyToMap]));

					// Returns a style object for each tract
					return styleFeature(featureFillColor, featureFillOpacity);
				},
				onEachFeature: onEachFeature(app.tooltips)
			}).addTo(app.map);
	}
}


module.exports = ChicagoChropleth