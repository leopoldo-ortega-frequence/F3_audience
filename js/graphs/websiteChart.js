export class WebsiteChart {
  constructor(_selector, _data, _width, _height) {
    this.selector = _selector;
    this.data = _data;
    this.width = _width;
    this.height = _height;

    this.init();
  }

  init() {
    const title = "WEBSITE SNAPSHOT";
    this.updateData(this.data);
    this.selector
      .append("text")
      .attr("x", 20)
      .attr("font-size", "1.4rem")
      .attr("class", "fill-tertiary")
      .text(title);
  }

  updateData(data) {
    let xPos = 0;
    let xCounter = 0;
    let yPos = 0;
    const maxLinesPerCol = 10;
    // will have to manipulate data so that it can neatly append the text onto the canvas
    for (let i = 0; i < data.length; i++) {
      if (xCounter === maxLinesPerCol) {
        xPos += 1;
        xCounter = 0;
      }
      if (yPos === maxLinesPerCol) {
        yPos = 0;
      }
      data[i].x = xPos;
      data[i].y = yPos;
      xCounter++;
      yPos++;
    }

    this.updateVis(data);
  }

  updateVis(data) {
    this.websiteListG = this.selector
      .append("g")
      .attr("class", "website-lis-container")
      .attr("transform", "translate(60,40)");

    this.websiteListG
      .selectAll(".list-item")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "fill-dark")
      .attr("font-size", "0.8rem")
      .attr("x", (d) => d.x * 180)
      .attr("y", (d) => d.y * 22)
      .text((d) => d.name);
  }
}
