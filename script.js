
$(document).ready(function() {

	var width = $("#canvas").width();
	var height = $("#canvas").height();

	var center = {x: width/2, y: height/2}

	var date = new Date(2000, 1, 1);

	var planets = Planets.allCoordinates(date);

	var orbits = Planets.allOrbits(100);

	var orbitalRadius = d3.max(orbits, function(d) {
		return d3.max(d.orbit, function(d) {
			return Math.abs(d.r);
		})
	})

	var scale = Math.min(6, Math.min(height,width)/(orbitalRadius * 2.2));

	console.log(orbitalRadius)

	// Sun
	d3.select("#canvas")
		.append("circle")
		.attr("cx", center.x)
		.attr("cy", center.y)
		.attr("r", 6)
		.attr("class", "sun")
		.style("stroke-width", 2);
	


	// Should the orbits be shown in actual size?
	var rescaleOrbits = true;

	var sun = {x:width/2, y:width/4}

	var orbitGroup = d3.select("#canvas")
		.append("g")
		.attr("transform", "translate(" + center.x + "," + center.y + ")");

	orbitGroup.selectAll("polygon")
  	.data(orbits)
	  .enter().append("polygon")
	  .attr("points", function(d, i) {
	  	return d.orbit.map(function(d) {
	    	return [ 0,0 ].join(",");     
	    }).join(" ");
	  })
	  .attr("class", "orbit");


	var planetGroup = d3.select("#canvas")
		.append("g")
		.attr("transform", "translate(" + center.x + "," + center.y + ")");
		
	planetGroup.selectAll("circle")
		.data(planets)
		.enter()
		.append("circle")
		.attr("cx", 0)
		.attr("cy", 0)
		.attr("class", function(d){
			return d.name == "Earth" ? "planet earth" : "planet"
		})
		.attr("r", 3);

	updateOrbits()


	function updatePlanets(planets) {
		planetGroup.selectAll("circle")
			.data(planets)
			.transition()
			.duration(50)
			.attr("cx", function(d,i) { 
				if (rescaleOrbits) d.r = (i+1) * (orbitalRadius / orbits.length);
				return scale * (Math.toCartesianCoords(d.r, d.theta).x); 
			})
			.attr("cy", function(d,i) { 
				if (rescaleOrbits) d.r = (i+1) * (orbitalRadius / orbits.length);
				return scale * (Math.toCartesianCoords(d.r, d.theta).y); 
			})
	}

	function updateOrbits() {

		orbitGroup.selectAll("polygon")	
		  .transition()
		  .ease("elastic")
      .duration(1000)
			.attr("points",function(d,i) {
		    return d.orbit.map(function(d) { 
		    	var r = rescaleOrbits ? (i+1) * (orbitalRadius / orbits.length) : d.r;
		    	var c = Math.toCartesianCoords(r, d.theta);
		    	return [ c.x * scale, c.y * scale ].join(",");     
		    }).join(" ");
		  });

	}

	function windowResize(width, height) {

		var center = {x: width/2, y: height/2};

		orbitGroup
			.attr("transform", "translate(" + center.x + "," + center.y + ")");

		planetGroup
			.attr("transform", "translate(" + center.x + "," + center.y + ")");

		d3.select(".sun")
			.attr("cx", center.x)
			.attr("cy", center.y)

		scale = Math.min(6, Math.min(height,width)/(orbitalRadius * 2.2));

		updatePlanets(planets);

		updateOrbits(orbits);

	}

	// "Animation"
	var i = 0;
	setInterval(function() {
		i++;
		date = new Date(1970, 1, 1) - 0 + (i * 1000 * 3600 * 24 * 20);

		planets = Planets.allCoordinates(date);

		updatePlanets(planets);
	
	}, 50)

	$("#toggleOrbit").click(function(){
		
		rescaleOrbits = !rescaleOrbits;

		updatePlanets(planets);
		updateOrbits();

	})

	$(window).resize(function(e){
		var height = $(window).height();
		var width = $(window).width();

		windowResize(width, height)

		

	})




});



