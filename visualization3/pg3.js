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

var svg = d3.select("body").append("svg")
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

  svg.selectAll(".layer")
      .data(layers)
    .enter().append("path")
      .attr("class", "layer")
      .attr("d", function(d) { return area(d.values); })
      .style("fill", function(d, i) { return z(i); });

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

  // add data label for x = 2020     
  svg.append("text")      
        .attr("x", width - 745 )
        .attr("y",  height - 80 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("986");

      
  svg.append("text")      
        .attr("x", width - 745 )
        .attr("y",  height - 150 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("873");

       
  svg.append("text")      
        .attr("x", width - 745)
        .attr("y",  height - 280 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("1541"); 

      
  svg.append("text")      
        .attr("x", width - 745)
        .attr("y",  height - 425 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("1872");  

// add data label for x = 2025   
  svg.append("text")      
        .attr("x", width - 625 )
        .attr("y",  height - 75 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("901");
     
  svg.append("text")      
        .attr("x", width - 625 )
        .attr("y",  height - 140 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("804");

       
  svg.append("text")      
        .attr("x", width - 625)
        .attr("y",  height - 260 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("1570"); 

      
  svg.append("text")      
        .attr("x", width - 625)
        .attr("y",  height - 405 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("1794");  

// add data label for x = 2030   
  svg.append("text")      
        .attr("x", width - 500 )
        .attr("y",  height - 75 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("852");
     
  svg.append("text")      
        .attr("x", width - 500 )
        .attr("y",  height - 130 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("763");
       
  svg.append("text")      
        .attr("x", width - 500)
        .attr("y",  height - 250 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("1525"); 

      
  svg.append("text")      
        .attr("x", width - 500)
        .attr("y",  height - 395 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("1711"); 

// add data label for x = 2035   
  svg.append("text")      
        .attr("x", width - 375 )
        .attr("y",  height - 75 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("843");
     
  svg.append("text")      
        .attr("x", width - 375 )
        .attr("y",  height - 130 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("766");
       
  svg.append("text")      
        .attr("x", width - 375)
        .attr("y",  height - 250 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("1532"); 

      
  svg.append("text")      
        .attr("x", width - 375)
        .attr("y",  height - 395 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("1687"); 


// add data label for x = 2040   
  svg.append("text")      
        .attr("x", width - 250 )
        .attr("y",  height - 75 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("834");
     
  svg.append("text")      
        .attr("x", width - 250 )
        .attr("y",  height - 130 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("773");
       
  svg.append("text")      
        .attr("x", width - 250)
        .attr("y",  height - 260 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("1555"); 

      
  svg.append("text")      
        .attr("x", width - 250)
        .attr("y",  height - 395 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("1717"); 

// add data label for x = 2045   

  svg.append("text")      
        .attr("x", width - 125 )
        .attr("y",  height - 75 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("825");
     
  svg.append("text")      
        .attr("x", width - 125 )
        .attr("y",  height - 130 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("790");
       
  svg.append("text")      
        .attr("x", width - 125)
        .attr("y",  height - 260 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("1575"); 

      
  svg.append("text")      
        .attr("x", width - 125)
        .attr("y",  height - 400 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("1777"); 

// add data label for x = 2050   

  svg.append("text")      
        .attr("x", width - 25 )
        .attr("y",  height - 75 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("814");
     
  svg.append("text")      
        .attr("x", width - 25 )
        .attr("y",  height - 130 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("814");
       
  svg.append("text")      
        .attr("x", width - 25)
        .attr("y",  height - 260 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("1607"); 

      
  svg.append("text")      
        .attr("x", width - 25)
        .attr("y",  height - 410 )
        .attr("font-family", "Helvetica")
        .attr("font-size", "12px")
        .attr("fill", "blue")
        .style("text-anchor", "left")
        .text("1849"); 

});
