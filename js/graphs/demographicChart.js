export class DemographicChart {
  constructor(_selector, _data, _width, _height) {
    this.selector = _selector;
    this.data = _data;
    this.width = _width;
    this.height = _height;

    this.init();
  }

  init() {
    // bottom vertical line
    this.selector
      .append("line")
      .attr("class", "stroke-dark")
      .style("stroke-width", 1)
      .attr("x1", this.width)
      .attr("y1", 0)
      .attr("x2", this.width)
      .attr("y2", this.height);

    this.updateData(this.data);
  }

  updateData(data) {
    let sum = 0;
    data.forEach((i) => {
      sum += i.value;
    });

    this.avgPop = sum / data.length;
    this.updateVis(data);
  }

  updateVis(data) {
    const cellHeight = 110;
    const rectHeight = 45;
    const numCircles = 10;
    const rectWidth = this.width / 2.5;

    // group containe for bottom data display
    this.resultRectG = this.selector
      .append("g")
      .attr("transform", `translate(0,${this.height - cellHeight})`);
    this.dataCall = this.selector
      .selectAll(".demographic-data")
      .data(data, (d, i) => {
        return d;
      });

    this.enterG = this.dataCall
      .enter()
      .append("g")
      .attr("class", "demographic-data")
      .merge(this.dataCall);

    this.enterG
      .append("line")
      .attr("class", "stroke-dark")
      .style("stroke-width", 1)
      .attr("x1", 0)
      .attr("y1", (d, i) => (i + 1) * cellHeight)
      .attr("x2", this.width)
      .attr("y2", (d, i) => (i + 1) * cellHeight);
    this.enterG
      .append("line")
      .attr("class", "stroke-dark")
      .style("stroke-width", 1)
      .attr("x1", rectWidth)
      .attr("y1", 0)
      .attr("x2", rectWidth)
      .attr("y2", (d, i) => (i + 1) * cellHeight);

    // The group element for the category data
    this.subG = this.enterG
      .append("g")
      .attr("transform", (d, i) => `translate(0,${i * cellHeight})`);
    // the group for the circles
    this.circleG = this.enterG
      .append("g")
      .attr("transform", (d, i) => `translate(${rectWidth},${i * cellHeight})`);
    this.circles = this.circleG
      .selectAll(null)
      .data(function (d) {
        let range = d3.range(numCircles).map(function (x) {
          return {
            idx: x,
            fill: Math.floor(d.value / 10) >= x + 1,
          };
        });
        return range;
      })
      .enter()
      .append("circle")
      .attr("r", 8)
      .attr("cy", cellHeight / 2)
      .attr("cx", (d, i) => {
        return i * 22 + 22;
      })

      .attr("class", (d, i) => {
        return d.fill === true ? "fill-quaternary" : "fill-outline";
      });

    this.subG
      .append("rect")
      .attr("x", 0)
      .attr("y", cellHeight - rectHeight)
      .attr("width", rectWidth)
      .attr("height", rectHeight)
      .attr("class", "fill-quaternary");

    this.subG
      .append("text")
      .attr("class", "fill-primary")
      .attr("font-weight", "bold")
      .attr("x", 20)
      .attr("y", (cellHeight - rectHeight) / 2.5)
      .text((d) => d.name.toUpperCase());
    this.subG
      .append("text")
      .attr("class", "fill-primary")
      .attr("font-size", "0.9rem")
      .attr("x", 20)
      .attr("y", (cellHeight - rectHeight) / 1.3)
      .text((d) => d.range);
    this.subG
      .append("text")
      .attr("class", "fill-primary")
      .attr("font-weight", "bold")
      .attr("x", 20)
      .attr("y", cellHeight - rectHeight / 2.4)
      .text((d) => `${d.value}% OF POP`);

    // append the bottom rect
    this.resultRectG
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", this.width)
      .attr("height", cellHeight)
      .attr("class", "fill-primary");

    this.resultRectG
      .append("text")
      .attr("font-size", "0.9rem")
      .attr("x", 20)
      .attr("y", cellHeight / 2)
      .attr("fill", "#fff")
      .text(`TOTAL POP: ${this.avgPop}%`);

    this.resultRectG
      .selectAll(null)
      .data(function () {
        let range = d3.range(10);

        return range;
      })
      .enter()
      .append("circle")
      .attr("r", 8)
      .attr("cy", cellHeight / 2 - 4)
      .attr("cx", (d, i) => {
        return i * 22 + 180;
      })

      .attr("class", (d, i) => {
        return d <= Math.floor(this.avgPop / 10)
          ? "fill-quaternary"
          : "fill-outline stroke-inverse";
      });
  }
}
