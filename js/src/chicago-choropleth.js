import {scaleQuantize} from 'd3-scale';
import {extent} from 'd3-array';
import * as d3 from 'd3-selection';
import * as L from "leaflet";
import 'leaflet-providers';
import inlineQuantLegend from './inline-quant-legend.js';

function styleFeature(featureFillColor, featureOpacityColor, featureStrokeColor, featureStrokeWeight){
	// http://leafletjs.com/reference.html#path-options
	return {
		color: "#eee",
		stroke:featureStrokeColor,
		weight:featureStrokeWeight,
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

function cleanUpRamps(ramp){
	// Take a potential ramp and makes sure it's an array. The big exception being caught here is 
	// when the user inputs a single value. For instance, if the user wants all features to be one 
	// color, the input for colorRamp might just be "#eeeeee" when D3 would require ["#eeeeee"]. 
	// Other exceptions might be added in the future.

	if (Array.isArray(ramp)){
		// if it's an array, no worries. Keep firing a-holes.
		return ramp;
	} else {
		// For now, just assume it's a single value and return it as a length=1 array
		return [ramp];
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

		app.colorRamp = cleanUpRamps(app.options.colorRamp)
		app.opacityRamp = cleanUpRamps(app.options.opacityRamp)
		app.drawGeojson(app.data, app.options.propertyToMap, app.colorRamp, app.opacityRamp)
		
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
					const 	featureFillColor = mapColorScale(parseFloat(feature.properties[propertyToMap])),
							featureFillOpacity = mapOpacityScale(parseFloat(feature.properties[propertyToMap])),
							featureStrokeColor = app.options.propertyStrokeColor,
							featureStrokeWeight = app.options.propertyStrokeWeight;

					// Returns a style object for each tract
					return styleFeature(featureFillColor, featureFillOpacity, featureStrokeColor, featureStrokeWeight);
				},
				onEachFeature: onEachFeature(app.tooltips)
			}).addTo(app.map);
	}
}


module.exports = ChicagoChropleth