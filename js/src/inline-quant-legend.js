import {formatSpecifier} from 'd3-format';
import {format} from 'd3-format';
import * as d3 from 'd3-selection';


function inlineQuantLegend(container, colorScale, opacityScale, formatString){


	if (container.node().childNodes.length > 0){
		container.selectAll('*').remove();
	}
	console.log(colorScale);
	const 	divisions = colorScale.range().length,
			width = 100 / divisions,
			formatter = format(formatString);
	
	

	let bucketCounter = 0;

	colorScale.range().forEach( bucket =>{

		const bucketLabel = formatter(colorScale.invertExtent(bucket)[0]);

		container.append('div')
			.classed('legend__box', true)
			.style('background', bucket)
			.style('left', `${bucketCounter * width}%`)
			.style('width', `${width}%`);

		const label = container.append('span')
			.classed('legend__label', true)
			.text(bucketLabel)
		


		if (bucketCounter == 0){
			label.style('left', 0)
				.style('margin-left', 0);
		} else {
			const labelWidth = label.node().getBoundingClientRect().width;
			label.style('left', `${bucketCounter * width}%`)
				.style('margin-left', `${labelWidth/-2}px`);
		}
		
		bucketCounter++;

		if (bucketCounter == divisions){
			container.append('span')
				.classed('legend__label', true)
				.text(formatter(colorScale.invertExtent(bucket)[1]))
				.style('right', 0)
				.style('margin-left', 0);
		}
		
	})
}

module.exports = inlineQuantLegend;