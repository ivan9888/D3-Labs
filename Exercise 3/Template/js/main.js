/*
*    main.js
*/
/*
d3.csv("data/ages.csv").then((data)=> {

	console.log(data);

});
d3.tsv("data/ages.tsv").then((data)=> {

	console.log(data);

});
d3.json("data/ages.json").then((data)=> {

	console.log(data);

});
*/
var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", 400)
	.attr("height", 400);

d3.json("data/ages.json").then((data) => {
	data.forEach((d)=>{

		d.age = +d.age;

	});
	var circles=svg.selectAll("circle")
		.data(data);

	circles.enter()
		.append("circle")
			.attr("cx", (d,i)=>{return (i*30)+80;})
		.attr("cy", 100)
		.attr("r", (d)=>{return d.age;})
		.attr("fill",(d)=>{
			if(d.age>10)
				return "red";
			else
				return "blue"
		});
		console.log(data);
	
	}).catch((error)=> {
	
	console.log(error);
	
	});
		
