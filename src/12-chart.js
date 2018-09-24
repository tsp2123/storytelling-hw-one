import * as d3 from 'd3'
;(function() {
  // Build your SVG here
  // using all of that cut-and-paste magic
  var margin = { top: 100, right: 60, bottom: 20, left: 20 }

  var width = 400 - margin.left - margin.right
  var height = 200 - margin.top - margin.bottom

  var svg = d3
    .select('#chart12')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // Build your scales here
  var xPositionScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([0, width])

  var radiusScale = d3
    .scaleSqrt()
    .domain([0, 10])
    .range([0, 30])

  var colorScale = d3
    .scaleOrdinal()
    .domain(['dog', 'cat', 'cow'])
    .range(['#7fcdbb', '#fdbb84', '#2c7fb8'])

  d3.csv(require('./eating-data.csv'))
    .then(ready)
    .catch(function(err) {
      console.log('Failed with', err)
    })

  function ready(datapoints) {
    // Add and style your marks here
    console.log('Data is', datapoints)

    svg
      .selectAll('circle')
      .data(datapoints)
      .enter()
      .append('circle')
      .attr('r', d => {
        return radiusScale(d.hotdogs)
      })
      .attr('fill', d => {
        return colorScale(d.animal)
      })
      .attr('cx', d => {
        return xPositionScale(d.hamburgers)
      })
      .attr('opacity', 0.25)
  }

  var xAxis = d3.axisBottom(xPositionScale)
  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)
})()
