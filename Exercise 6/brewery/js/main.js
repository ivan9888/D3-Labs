/*
*    main.js
*/
var margin = {top: 10, right: 10, bottom: 100, left:100};
var width = 500;
var height = 400;
var flag = true;
var svg = d3.select("#chart-area")
	.append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
    .attr('fill',"black");
	
var g=svg.append("g")
	.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var x = d3.scaleBand().range([0, width]).padding(0.2);
var y = d3.scaleLinear().range([height, 0]);
// X & Y scale generators
var xAxisGroup = g.append("g").attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")");
var yAxisGroup = g.append("g").attr("class", "y-axis");

//label
var yLabel = g.append("text")
    .attr('class', 'y axis-label')
    .attr('x', -(height / 2))
    .attr('y', -60)
    .attr("font-size", "20px")
    .attr('text-anchor', 'middle')
    .attr("transform", "rotate(-90)")
    .text("Revenue (dlls)");
g.append('text')
    .attr('class', 'x axis-label')
    .attr('x', width / 2)
    .attr('y', height + 80)
    .attr("font-size", "30px")
    .attr('text-anchor', 'middle')
    .text("Month");


d3.json("data/revenues.json").then((data) => {
    
    data.forEach((d)=>{
		d.revenue = +d.revenue;
        d.profit= +d.profit;
	});
    d3.interval(() => {
        update(data);
        flag = !flag;
        }, 1000);
    
	}).catch((error)=> {
	
	console.log(error);
	
});
function update(data) {
    var value = flag ? "revenue" : "profit";

    var maxHght = d3.max(data, (d) => { return d[value]; })

    x.domain(data.map((d) => { return d.month; }));
    y.domain([0, maxHght]);

    var xAxisCall = d3.axisBottom(x);
    xAxisGroup.call(xAxisCall)
        .selectAll("text")
        .style("fill","black");
    g.select(".x.axis")
        .select(".domain")
        .attr("stroke", "black");

    var yAxisCall = d3.axisLeft(y).ticks(5).tickFormat((d) => { return '$' + d/1000 + 'K'; });
    yAxisGroup.call(yAxisCall)
        .selectAll("text").style("fill","black");
    g.select(".y.axis")
    .select(".domain")
    .attr("stroke", "black");
    
    var rects = g.selectAll('rect').data(data);
    rects.exit().remove();

    // Update
    rects.attr("x", (d) => { return x(d.month); })
        .attr("y", (d) => { return y(d[value]);} )
        .attr("height", (d) => { return height - y(d[value]); })
        .attr("width", x.bandwidth());
        
    rects.enter().append("rect")
        .attr("x", (d) => { return x(d.month); })
        .attr("y", (d) => { return y(d[value]);} )
        .attr("height", (d) => { return height - y(d[value]); })
        .attr("width", x.bandwidth())
        .attr('fill', "yellow");

    
    var label = flag ? "Revenue (dlls)" : "Profit (dlls)";
    yLabel.text(label);

}
    