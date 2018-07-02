import React, { Component } from "react";
import * as d3 from "d3";
import _ from "lodash";

class MaxFitnessViz extends Component {
  constructor(props) {
    super(props);

    const data = props.population.generationMaxFitnesses.map((maxFit, i) => ({
      maxFit,
      i
    }));

    const min = _.minBy(data, d => d.maxFit).maxFit;
    const max = _.maxBy(data, d => d.maxFit).maxFit;

    const maxI = _.maxBy(data, d => d.maxFit).i;

    console.log(min, max, maxI);

    // Scale X and Y.
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length])
      .range([0, 200]);

    const yScale = d3
      .scaleLog()
      .domain([min, max])
      .range([200, 0]);

    console.log(data[0].maxFit, yScale(data[0].maxFit));
    console.log(data[1].maxFit, yScale(data[1].maxFit));
    console.log(data[2].maxFit, yScale(data[2].maxFit));
    console.log(data[maxI].maxFit, yScale(data[maxI].maxFit));

    this.path = d3
      .line()
      .x(d => xScale(d.i))
      .y(d => yScale(d.maxFit))(data);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <svg viewBox="0 0 200 200" width="100%" height="100%">
          <path d={this.path} stroke="white" strokeWidth="2" fill="none" />
        </svg>
      </div>
    );
  }
}

export default MaxFitnessViz;
