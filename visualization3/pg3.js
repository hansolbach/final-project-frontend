var format = d3.time.format("%Y");

var margin = {top: 20, right: 150, bottom: 60, left: 100},
    width = 1100 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var z = d3.scale.category20c();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%Y"));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var stack = d3.layout.stack()
    .offset("zero")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value; });

var nest = d3.nest()
    .key(function(d) { return d.key; });

var area = d3.svg.area()
    .interpolate("cardinal")
    .x(function(d) { return x(d.date); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

// Add chart variable to enable mouse tracker

var chart = d3.select("#chart").append("svg");

// change svg variable to link with chart variable
// this is the different with master version
var svg = chart
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("co2projection_edit.csv", function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
    d.date = format.parse(d.date);
    d.value = +d.value;
  });

  var layers = stack(nest.entries(data));

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);

  // ad div variable for tooltip
  var div = d3.select(".tooltip")
    .attr("class", "tooltip")
    .style("opacity", 1e-6);

  //initialize dataPoints
  var dataPoints = {};

  svg.selectAll(".layer")
      .data(layers)
    .enter().append("path")
      .attr("class", "layer")
      .attr("d", function(d) { return area(d.values); })
      .style("fill", function(d, i) { return z(i); });

  //points
  var points = svg.selectAll('.dots')
    .data(layers)
    .enter()
    .append("g")
    .attr("class", "dots")
    .attr("d", function(d) { return area(d.values); })
    .attr("clip-path", "url(#clip)");   

  points.selectAll('.dot')
    .data(function(d, index){   
        var a = [];
        
  d.values.forEach(function(point,i){
    a.push({'index': index, 'point': point});
        });     
        return a;
    })
    .enter()
    .append('circle')
    .attr('class','dot')
    .attr("r", 2.5)
    .attr('fill', function(d,i){    
        return '#abc';
    })  
    .attr("transform", function(d) { 
        var key = x(d.point.date);
        dataPoints[key] = dataPoints[key] || [];
        dataPoints[key].push(d);
        return "translate(" + x(d.point.date) + "," + y(d.point.y+d.point.y0) + ")"; }
    );

//vertical line
var vertline = svg.append('line')
  .attr('class','vertline')
  .attr('x1',0)
  .attr('x2',0)
  .attr('y1',0)
  .attr('y2',height)
  .attr('stroke','rgba(100,150,200,0.8)')
  .attr('stroke-width',1);

chart.on('mousemove', function () {
  mouseX = d3.event.pageX-margin.left;
  var keys = _.keys(dataPoints).sort();
  var epsilon = (keys[1]-keys[0])/2;
  var nearest = _.find(keys, function(a) {
    return Math.abs(a - mouseX) <= epsilon
  });
  if(nearest){
    var dps = dataPoints[nearest];
    vertline.attr('x1', nearest)
            .attr('x2', nearest)
    div.transition()
      .duration(500)
      .text(_.collect(dps,function(dp){
        return dp.point.y0 + dp.point.y;
      }).join(','))
      .style("opacity", 1)
  }
});

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  // add text label for x axis    
  svg.append("text")      
        .attr("x", width/2 )
        .attr("y",  height + 50 )
        .style("text-anchor", "middle")
        .style("font-weight","bold")
        .text("Year");
      
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
  
  //add data label to Y-axis
  svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("font-weight","bold")
        .style("text-anchor", "middle")
        .text("CO2 emission (million metric ton)");

  // add text label for area    
  svg.append("text")      
        .attr("x", width + 10 )
        .attr("y",  height - 30 )
        .style("text-anchor", "left")
        .text("Residential");

  // add text label for area    
  svg.append("text")      
        .attr("x", width + 10 )
        .attr("y",  height - 90 )
        .style("text-anchor", "left")
        .text("Commercial");

    // add text label for area    
  svg.append("text")      
        .attr("x", width + 10 )
        .attr("y",  height - 180 )
        .style("text-anchor", "left")
        .text("Industrial"); 

    // add text label for area    
  svg.append("text")      
        .attr("x", width + 10 )
        .attr("y",  height - 330 )
        .style("text-anchor", "left")
        .text("Transportation");   
});
