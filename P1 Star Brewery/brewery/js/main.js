/*
*    main.js
*/
var margin = {top: 10, right: 10, bottom: 100, left:100};
var width = 500;
var height = 400;
var svg = d3.select("#chart-area")
	.append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
    .attr('fill',"black");
	
var g=svg.append("g")
	.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


d3.json("data/revenues.json").then((data) => {
    
//  Scale
	var x = d3.scaleBand()
		.domain(data.map((d) => {return d.month; }))
		.range([0, width])
		.paddingInner(0.3)
		.paddingOuter(0.3);
	var max = d3.max(data, (d) => { return d.revenue; }) ; 
	var y = d3.scaleLinear()
		.domain([0,max])
		.range([height,0]);

	var rects = g.selectAll('rect').data(data)
	.enter()
	.append("rect")
	.attr("x", (d) => { return x(d.month); })
	.attr("y", (d) => { return y(d.revenue);} )
	.attr("height", (d) => { return height - y(d.revenue); })
	.attr("width", x.bandwidth())
	.attr('fill', "yellow");
	
	var bottomAxis = d3.axisBottom(x);
	
	g.append("g")
		.attr("class", "bottom axis")
		.attr("transform", "translate(0, " + height + ")")
		.call(bottomAxis)
	  	.selectAll("text")
		.attr("transform", "rotate(0)")
		.attr("dx", 15).attr("dy", 15)
		.attr('text-anchor', 'end');
	
    var leftAxis = d3.axisLeft(y);

	var leftAxis = d3.axisLeft(y).ticks(5).tickFormat((d) => { return '$' + d/1000 + 'K';  });
	g.append('g')
		.attr('class', 'y axis')
		.call(leftAxis);

	g.append('text')
        .attr('class', 'x axis-label')
        .attr('x', width / 2)
        .attr('y', height + 80)
        .attr("font-size", "30px")
        .attr('text-anchor', 'middle')
        //.style("fill","white")
        .text("Month");

	g.append('text')
	.attr('class', 'y axis-label')
	.attr('x', -(height / 2))
	.attr('y', -60)
	.attr("font-size", "20px")
	.attr('text-anchor', 'middle')
	.attr("transform", "rotate(-90)")
	.text("Revenue (dlls)");  

	}).catch((error)=> {
	
	console.log(error);
	
	});