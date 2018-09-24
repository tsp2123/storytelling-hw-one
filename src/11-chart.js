import * as d3 from 'd3'
;(function() {
  // Build your SVG here
  var margin = { top: 50, right: 50, bottom: 5, left: 50 }

  var width = 400
  var height = 400
  var svg = d3
    .select('#chart11')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // using all of that cut-and-paste magic

  // Build your scales here

  var pointScale = d3
    .scalePoint()
    .domain(['cat', 'cow', 'dog'])
    .range([0, 400])
    .padding(0.25)

  var xPositionScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([0, 350])

  d3.csv(require('./eating-data.csv'))
    .then(ready)
    .catch(function(err) {
      console.log('Failed with', err)
    })

  function ready(datapoints) {
    // Add and style your marks here
    svg
      .selectAll('circle')
      .data(datapoints)
      .enter()
      .append('circle')
      .attr('r', 6)
      .attr('cy', function(d) {
        return pointScale(d.animal)
      })
      .attr('cx', function(d) {
        return xPositionScale(d.hamburgers)
      })
      .attr('fill', 'lightpink')
  }

  var yAxis = d3.axisLeft(pointScale)
  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)

  var xAxis = d3.axisBottom(xPositionScale)
  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)
})()
