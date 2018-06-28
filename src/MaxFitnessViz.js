import React, { Component } from "react";
import * as d3 from "d3";

class MaxFitnessViz extends Component {
  constructor(props) {
    super(props);

    const data = props.population.generationMaxFitnesses.map((maxFit, i) => ({
      maxFit,
      i
    }));

    console.log(data);

    this.path = d3
      .line()
      .x(d => d.i)
      .y(d => d.maxFit)(data);

    console.log(this.path);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <svg width="100%" height="100%">
          <path d={this.path} stroke="white" strokeWidth="2" fill="none" />
        </svg>
      </div>
    );
  }
}

export default MaxFitnessViz;
