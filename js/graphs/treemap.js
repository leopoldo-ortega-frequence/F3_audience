// Will change things up, do a functional component

export const treeMapChart = (selector, props) => {
  const { data, width, graphWidth, graphHeight, title, interestCategories } =
    props;
  const colorScale = d3.scaleOrdinal([
    "primary",
    "secondary",
    "tertiary",
    "quaternary",
  ]);
  const treemapG = selector
    .append("g")
    .attr("class", "treemapG")
    .attr("transform", `translate(20,40)`);
  // title for the chart
  treemapG
    .append("text")
    .attr("font-size", "1.4rem")
    .attr("class", "fill-tertiary")
    .text(title);

  // appending the circles on the right
  const titleColorGroup = treemapG
    .selectAll(null)
    .data(interestCategories)
    .enter()
    .append("g")
    .attr("class", "color-category-group")
    .attr("transform", "translate(400,-10)");
  // group properties for the legend
  titleColorGroup
    .append("text")
    .attr("font-size", "0.8rem")
    .attr("text-anchor", "start")
    .attr("font-style", "italic")
    .attr("y", 4)
    .attr("x", (d, i) => {
      return i * 100 + 10;
    })
    .text((d) => d);
  titleColorGroup
    .append("circle")
    .attr("r", 8)
    .attr("cx", (d, i) => i * 100)
    .attr("class", (d) => `fill-${colorScale(d)}`);
  // append line below header
  treemapG
    .append("line")
    .attr("class", "stroke-dark")
    .style("stroke-width", 1)
    .attr("x1", 0)
    .attr("y1", 20)
    .attr("x2", width)
    .attr("y2", 20);
  // append line below the graph
  treemapG
    .append("line")
    .attr("class", "stroke-dark")
    .style("stroke-width", 1)
    .attr("x1", 0)
    .attr("y1", 300)
    .attr("x2", width)
    .attr("y2", 300);

  treemapG
    .append("image")
    .attr("xlink:href", "./assets/couple-icon.png")
    .attr("x", 0)
    .attr("y", 10)
    .attr("width", 200)
    .attr("height", 300);

  const treeGraphG = treemapG
    .append("g")
    .attr("class", "treemapG")
    .attr("transform", `translate(210, 30)`);

  // redners the treemap graph
  const render = () => {
    // Give the data to this cluster layout:
    const root = d3.hierarchy(data).sum(function (d) {
      return d.value;
    }); // Here the size of each leave is given in the 'value' field in input data

    // Then d3.treemap computes the position of each element of the hierarchy
    d3.treemap().size([graphWidth, graphHeight]).padding(2)(root);

    // use this information to add rectangles:
    treeGraphG
      .selectAll("rect")
      .data(root.leaves())
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return d.x0;
      })
      .attr("y", function (d) {
        return d.y0;
      })
      .attr("width", function (d) {
        return d.x1 - d.x0;
      })
      .attr("height", function (d) {
        return d.y1 - d.y0;
      })
      .attr("class", (d) => {
        return `fill-${colorScale(d.data.group)}`;
      });


    treeGraphG
      .selectAll(".node-text")
      .data(root.leaves())
      .enter()
      .append("foreignObject")
      .attr("class", "node-text")
      .attr("width", function (d) {
        return d.x1 - d.x0;
      })
      .attr("height", function (d) {
        return d.y1 - d.y0;
      })
      .attr("x", function (d) {
        return d.x0;
      }) // +10 to adjust position (more right)
      .attr("y", function (d) {
        return d.y0;
      })
      .append("xhtml:div")
      .attr("class", "svg-text")
      .append("span")
      .style('font-size', (d,i) => {
        const width = d.x1 - d.x0;
        const fontSize = Math.floor(width / 8)
       return  `${fontSize}px`
      })
      .html((d) => d.data.name); // +20 to adjust position (lower)
    // .text(function (d) {
    //   return d.data.name;
    // });
  };

  render();
};
