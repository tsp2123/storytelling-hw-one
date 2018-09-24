import * as d3 from 'd3'
;(function() {
  // Build your SVG here
  // using all of that cut-and-paste magic
  var margin = { top: 30, right: 30, bottom: 60, left: 80 }

  var width = 700 - margin.left - margin.right
  var height = 500 - margin.top - margin.bottom

  var svg = d3
    .select('#chart14')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // Build your scales here
  var heightScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([0, height])

  var xPositionScale = d3.scaleBand().range([height, 0])

  var colorScale = d3.scaleOrdinal().range(['#fc9272', '#de2d26', 'pink'])

  d3.csv(require('./eating-data.csv'))
    .then(ready)
    .catch(function(err) {
      console.log('Failed with', err)
    })

  function ready(datapoints) {
    var names = datapoints.map(function(d) {
      return d.name
    })

    xPositionScale.domain(names)
    // Add and style your marks here

    svg
      .selectAll('rect')
      .data(datapoints)
      .enter()
      .append('rect')
      .attr('y', d => {
        return height - heightScale(d.hamburgers)
      })
      .attr('x', d => {
        return xPositionScale(d.name)
      })
      .attr('width', xPositionScale.bandwidth())
      .attr('height', d => {
        return heightScale(d.hamburgers)
      })
      .attr('fill', d => {
        return colorScale(d.animal)
      })

    var yAxis = d3.axisLeft(xPositionScale)
    svg
      .append('g')
      .attr('class', 'axis y-axis')
      .call(yAxis)

    var xAxis = d3.axisBottom(heightScale).ticks(10)
    svg
      .append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
  }
})()
