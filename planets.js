// ftp://ssd.jpl.nasa.gov/pub/eph/planets/ioms/ExplSupplChap8.pdf 
// page 26

var Planets = (function(){

	var Constants = {
		keplarian: {  
		  "Mercury":{  
		    "axis":[  
		      0.3871,
		      0
		    ],
		    "eccentricity":[  
		      0.2056,
		      0
		    ],
		    "inclination":[  
		      7.0056,
		      -0.0059
		    ],
		    "meanLon":[  
		      252.2517,
		      149472.6749
		    ],
		    "perihelionLon":[  
		      77.4577,
		      0.1594
		    ],
		    "nodeLon":[  
		      48.3396,
		      -0.1221
		    ]
		  },
		  "Venus":{  
		    "axis":[  
		      0.7233,
		      -2.6e-07
		    ],
		    "eccentricity":[  
		      0.0068,
		      -0.0001
		    ],
		    "inclination":[  
		      3.3978,
		      0.0004
		    ],
		    "meanLon":[  
		      181.9797,
		      58517.8156
		    ],
		    "perihelionLon":[  
		      131.7676,
		      0.0568
		    ],
		    "nodeLon":[  
		      76.6726,
		      -0.2727
		    ]
		  },
		  "Earth":{  
		    "axis":[  
		      1,
		      -3e-08
		    ],
		    "eccentricity":[  
		      0.0167,
		      -0
		    ],
		    "inclination":[  
		      -0.0005,
		      -0.0134
		    ],
		    "meanLon":[  
		      100.4669,
		      35999.3731
		    ],
		    "perihelionLon":[  
		      102.9301,
		      0.318
		    ],
		    "nodeLon":[  
		      -5.1126,
		      -0.2412
		    ]
		  },
		  "Mars":{  
		    "axis":[  
		      1.5237,
		      9.7e-07
		    ],
		    "eccentricity":[  
		      0.0934,
		      0.0001
		    ],
		    "inclination":[  
		      1.8518,
		      -0.0072
		    ],
		    "meanLon":[  
		      -4.5681,
		      19140.2993
		    ],
		    "perihelionLon":[  
		      -23.9174,
		      0.4522
		    ],
		    "nodeLon":[  
		      49.7132,
		      -0.2685
		    ]
		  },
		  "Jupiter":{  
		    "axis":[  
		      5.2025,
		      -0
		    ],
		    "eccentricity":[  
		      0.0485,
		      0.0002
		    ],
		    "inclination":[  
		      1.2986,
		      -0.0032
		    ],
		    "meanLon":[  
		      34.3348,
		      3034.9037
		    ],
		    "perihelionLon":[  
		      14.275,
		      0.182
		    ],
		    "nodeLon":[  
		      100.2928,
		      0.1302
		    ]
		  },
		  "Saturn":{  
		    "axis":[  
		      9.5415,
		      -0
		    ],
		    "eccentricity":[  
		      0.0555,
		      -0.0003
		    ],
		    "inclination":[  
		      2.4942,
		      0.0045
		    ],
		    "meanLon":[  
		      50.0757,
		      1222.1149
		    ],
		    "perihelionLon":[  
		      92.8614,
		      0.5418
		    ],
		    "nodeLon":[  
		      113.64,
		      -0.2502
		    ]
		  },
		  "Uranus":{  
		    "axis":[  
		      19.188,
		      -0.0002
		    ],
		    "eccentricity":[  
		      0.0469,
		      -0
		    ],
		    "inclination":[  
		      0.773,
		      -0.0018
		    ],
		    "meanLon":[  
		      314.2028,
		      428.4951
		    ],
		    "perihelionLon":[  
		      172.434,
		      0.0927
		    ],
		    "nodeLon":[  
		      73.9625,
		      0.0574
		    ]
		  },
		  "Neptune":{  
		    "axis":[  
		      30.0695,
		      0.0001
		    ],
		    "eccentricity":[  
		      0.009,
		      8.18e-06
		    ],
		    "inclination":[  
		      1.7701,
		      0.0002
		    ],
		    "meanLon":[  
		      304.2229,
		      218.4652
		    ],
		    "perihelionLon":[  
		      46.6816,
		      0.0101
		    ],
		    "nodeLon":[  
		      131.7864,
		      -0.0061
		    ]
		  },
		  "Pluto":{  
		    "axis":[  
		      39.4869,
		      0.0045
		    ],
		    "eccentricity":[  
		      0.2489,
		      0.0001
		    ],
		    "inclination":[  
		      17.141,
		      5.01e-06
		    ],
		    "meanLon":[  
		      238.9654,
		      145.1804
		    ],
		    "perihelionLon":[  
		      224.097,
		      -0.0097
		    ],
		    "nodeLon":[  
		      110.3017,
		      -0.0081
		    ]
		  }
		},
		additional: { 
			"Jupiter": { b:-0.00012452, c:0.06064060,  s:-0.35635438, f:38.35125000 }, 
			"Saturn":  { b:0.00025899,  c:-0.13434469, s:0.87320147,  f:38.35125000 }, 
			"Uranus":  { b:0.00058331,  c:-0.97731848, s:0.17689245,  f:7.67025000 }, 
			"Neptune": { b:-0.00041348, c:0.68346318,  s:-0.10162547, f:7.67025000 }, 
			"Pluto":   { b:-0.01262724, c:0, s:0, f:0 }  
		},
		yearLength : {
			"Mercury": 87.97,
			"Venus": 224.7,
			"Earth": 365.26,
			"Mars": 686.98,
			"Jupiter": 4332.82,
			"Saturn": 10755.7,
			"Uranus": 30687.15,
			"Neptune": 60190.03,
			"Pluto": 90553
		},
		radius : {
			"Sun": 109.3,
			"Mercury": 0.383,
			"Venus": 0.950,
			"Earth": 1,
			"Mars": 0.532,
			"Jupiter": 10.97,
			"Saturn": 9.14,
			"Uranus": 3.98,
			"Neptune": 3.86,
			"Pluto": 0.185
		},
		density: {
			"Sun": 1.408,
			"Mercury": 5.427,
			"Venus": 5.243,
			"Earth": 5.514,
			"Mars": 3.9335,
			"Jupiter": 1.326,
			"Saturn": 0.687,
			"Uranus": 1.27,
			"Neptune": 1.638,
			"Pluto": 2.03
		},
		mass: {
			"Sun": 333000,
			"Mercury": 0.0553,
			"Venus": 0.815,
			"Earth": 1,
			"Mars": 0.107,
			"Jupiter": 317.83,
			"Saturn": 95.159,
			"Uranus": 14.536,
			"Neptune": 17.147,
			"Pluto": 0.0022
		}
	};

	this.Constants = Constants;

	// Modify the Math object with useful functions
	Math.degToRad = function(angle) {
		return angle * (Math.PI / 180);
	};

	Math.radToDeg = function(angle) {
		return angle * (180 / Math.PI);
	};


	Math.toPolarCoords = function(x, y) {
		coords = {
			r: Math.sqrt(x * x + y * y),
			theta: Math.atan(y / x)
		}
		if (x < 0) {
			coords.theta = coords.theta + Math.PI;
		}
		return coords;
	}

	Math.toCartesianCoords = function(r, theta) {
		return {
			x: r * Math.cos(theta),
			y: r * Math.sin(theta)
		}
	}

	// Calculate the number of days since jan 1st, 12:00 2000
	getJDay = function(date) {

		// JDAY on jan 1st, 12:00 2000
		var d1 = 2451545;

		// JS date object for jan 1st, 12:00 2000
		var d2 = new Date(2000, 1, 1, 12);

		// Number of milliseconds since 2000
		var diff = (date - d2)

		// Return number of days
		return (diff / (1000 * 60 * 60 * 24));

	}


	// Based on time and the table of constants calculate updated constants
	calcNewConstants = function(kepElement, T) {

		var newC = {};

		var eleConstants = Constants.keplarian[kepElement];

		for (key in eleConstants) {
			newC[key] = eleConstants[key][0] + (T * eleConstants[key][1]);
		}

		return newC;

	}


	// Solve keplars equation for M with Newton's Method
	var keplarsEquation = function(M, eRad) {

		var eDeg = Math.radToDeg(eRad);

		var En = M + (eDeg * Math.sin(Math.degToRad(M)));

		var tol = 1;

		while (tol > 0.0001) {

			var DM = M - (En - eDeg * Math.sin(Math.degToRad(En)));
			var DE = DM / (1 - eRad * Math.cos(Math.degToRad(En)));
			En = En + DE;
			tol = Math.abs(DE);

		}

		return En;

	}




	// get the x and y coordinates on the J2000 eliptic plane
	this.coordinates = function(kepElement, date) {

		// Get number of centuries since jan 1st, 12:00 2000
		var T = getJDay(date) / (36500);

		var newConstants = calcNewConstants(kepElement, T)

		// Assign constants to variables consistent with NASA document
		var a  = 		newConstants.axis; 
		var e  = 		newConstants.eccentricity;
		var I  = 		Math.degToRad(newConstants.inclination);
		var L  = 		newConstants.meanLon;
		var omHat = newConstants.perihelionLon;
		var OM = 		newConstants.nodeLon;

		// Perihelion
		var om = omHat - OM;

		// Mean anomaly
		var M = L - omHat;

		// Some celestial bodies require additional terms
		if (Object.keys(Constants.additional).indexOf(kepElement) > -1) {

			var additional = Constants.additional[kepElement]
			var v1 = additional.b * T * T;
			var v2 = additional.c * Math.cos(Math.degToRad(additional.f * T));
			var v3 = additional.s * Math.sin(Math.degToRad(additional.f * T));
		
			M = M + v1 + v2 + v3;
		}

		// meanAnomaly must be between -180 and 180
		M = M % 360 ;
		if (M > 180) M = - (360 - M);
		if (M < -180) M = 360 + M;

		var E = keplarsEquation(M, e);

		var xp = a * (Math.cos(Math.degToRad(E)) - e);
		var yp = a * Math.sqrt(1-(e*e)) * Math.sin(Math.degToRad(E));
		var zp = 0;

		var x_ecl_x = (Math.cos(om) * Math.cos(OM) - Math.sin(om) * Math.sin(OM) * Math.cos(I)) * xp;
		var x_ecl_y = (-Math.sin(om) * Math.cos(OM) - Math.cos(om) * Math.sin(OM) * Math.cos(I)) * yp;
		var x_ecl   = x_ecl_x + x_ecl_y;

		var y_ecl_x = (Math.cos(om) * Math.sin(OM) + Math.sin(om) * Math.cos(OM) * Math.cos(I)) * xp;
		var y_ecl_y = (-Math.sin(om) * Math.sin(OM) + Math.cos(om) * Math.cos(OM) * Math.cos(I)) * yp;
		var y_ecl   = y_ecl_x + y_ecl_y;

		var z_ecl = (Math.sin(om) * Math.sin(I) * xp) + (Math.cos(om) * Math.sin(I) * yp);

		// optional? Unclear
		// y_ecl = Math.cos(Math.radToDeg(23.43928)) * y_ecl - Math.sin(Math.radToDeg(23.43928)) * z_ecl;



		// return [x_ecl,y_ecl];	
		return Math.toPolarCoords(x_ecl,y_ecl);



	};

	this.allCoordinates = function(date) {

		var coordinates = this.coordinates;

		var planets = [
			{name: "Mercury", r: 0, theta: 0},
			{name: "Venus", r: 0, theta: 0},
			{name: "Earth", r: 0, theta: 0},
			{name: "Mars", r: 0, theta: 0},
			{name: "Jupiter", r: 0, theta: 0},
			{name: "Saturn", r: 0, theta: 0},
			{name: "Uranus", r: 0, theta: 0},
			{name: "Neptune", r: 0, theta: 0},
			{name: "Pluto", r: 0, theta: 0}
		]

		for (var i=0; i < planets.length; i++) {
			var c = coordinates(planets[i].name, date);
			planets[i].r = c.r;
			planets[i].theta = c.theta;
		}

		return planets;

	};

	// Calculate the points for an orbit with a given number of steps
	this.calculateOrbit = function(kepElement, intervals) {

		var yearLength = Constants.yearLength[kepElement];

		var t1 = new Date(2000, 1, 1);
		var tDiff = (yearLength * 24 * 60 * 60 * 1000);

		var points = [];

		for (var i=0; i<intervals; i++) {
			var t2 = (t1 - 0) + (tDiff * i)/intervals;
			points.push(this.coordinates(kepElement, t2));
		}

		return points;

	}

	this.allOrbits = function(intervals) {

		var orbits = [
			{name: "Mercury", orbit:[]},
			{name: "Venus", orbit:[]},
			{name: "Earth", orbit:[]},
			{name: "Mars", orbit:[]},
			{name: "Jupiter", orbit:[]},
			{name: "Saturn", orbit:[]},
			{name: "Uranus", orbit:[]},
			{name: "Neptune", orbit:[]},
			{name: "Pluto", orbit:[]}
		];

		for (var i=0; i < orbits.length; i++) {
			var o = calculateOrbit(orbits[i].name, intervals);
			orbits[i].orbit = o;
		}

		return orbits;

	}

	return this;


})();


// var date = getJDay(new Date(2015, 1, 1, 12));




// Keplarian contants for calculating orbital position




// var test = computeCoordinates("Mars", new Date());

// console.log(computeCoordinates("Mercury", new Date(2000, 4, 4)));
// console.log(computeCoordinates("Venus", new Date(2000, 4, 4)));
// console.log(computeCoordinates("Earth", new Date(2000, 4, 4)));
// console.log(computeCoordinates("Mars", new Date(2000, 4, 4)));
// console.log(computeCoordinates("Jupiter", new Date(2000, 4, 4)));
// console.log(computeCoordinates("Saturn", new Date(2000, 4, 4)));
// console.log(computeCoordinates("Uranus", new Date(2000, 4, 4)));
// console.log(computeCoordinates("Neptune", new Date(2000, 4, 4)));
// console.log(computeCoordinates("Pluto", new Date(2000, 4, 4)));


// l2 = list(c(-0.14996799142268374, -0.1496387561010146 ),
// c(-0.012297911687107865, 0.41573727118201503 ),
// c(-0.664917496912074, -0.07891026437423462 ),
// c(-0.9921749288780551, -1.2397638804755775 ),
// c(-4.882062262797104, -4.9442103815029474 ),
// c(-8.365869815439794, -3.6080290182029726 ),
// c(9.612694426594517, -4.986097222389408 ),
// c(-2.1941647288684027, -4.089988049881435 ),
// c(-11.934368779617838, -9.308697564453675))

// l1 = list(c(0.08214318212313965, -0.33256309328186456),
// c(0.7022459717829288, -0.6177022424241515),
// c(-0.6671679586776996, -0.07109420948688691),
// c(-1.2628578204095797, -1.2592860945967421),
// c(-3.624432538020753, -4.012499114858725),
// c(-8.6931270773641, -5.445331859429971),
// c(8.814370398441078, -4.033561350653232),
// c(-1.076888331053441, -2.9788539118643635),
// c(-12.955995823107052, -10.385669206330833))
