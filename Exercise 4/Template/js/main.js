/*
*    main.js
*/
var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", 500)
	.attr("height", 500);

d3.json("data/buildings.json").then((data) => {
	var x = d3.scaleBand()
		.domain(data.map((d) => {return d.name; }))
		.range([0, 400])
		.paddingInner(0.3)
		.paddingOuter(0.2);
	var max = d3.max(data, (d) => { return d.height; }) ; 
	var y = d3.scaleLinear()
		.domain([0,max])
		.range([0,400]);
	var rects=svg.selectAll("rect")
		.data(data);
	
	rects.enter()
		.append("rect")
		.attr("x", (d)=>{return x(d.name);})
		.attr("y",(d)=>{return (500 - y(d.height));})
		.attr("width", x.bandwidth())
		.attr("height", (d)=>{return y(d.height);})
		.attr("fill","red");
	
	}).catch((error)=> {
	
	console.log(error);
	
	});