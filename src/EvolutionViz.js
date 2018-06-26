import React, { Component } from "react";

class EvolutionVis extends Component {
  render() {
    const f = this.props.frameNumber;

    const previousGenerations =
      this.props.generationNumber > 1
        ? this.props.population.generations.slice(
            0,
            this.props.generationNumber - 1
          )
        : [];

    const currentGeneration = this.props.population.generations[
      this.props.generationNumber
    ];

    return (
      <div>
        <svg
          viewBox="-100 -100 200 200"
          width="100%"
          height="100%"
          // style={{ border: "1px solid #14172B" }}
        >
          {/* {previousGenerations.reverse().map((population, i) => {
            return population.rockets.map((rocket, j) => {
              const genesToPath = rocket.posVectors.map(
                pos => `L ${pos.x},${pos.y}`
              );

              let d = `M ${currentGeneration.originVec.x},${currentGeneration
                .originVec.y} ${genesToPath.join(" ")}`;

              return (
                <g key={j}>
                  <path
                    d={d}
                    stroke={`rgba(255, 255, 255, ${0.3 - i * 0.06})`}
                    strokeWidth="1"
                    fill="none"
                  />
                </g>
              );
            });
          })} */}
          {currentGeneration.map((rocket, i) => {
            const genesToPath = rocket.posVectors
              .slice(0, f + 1) // Frame number is 0 indexed.
              .map(pos => `L ${pos.x},${pos.y}`);

            let d = `M ${this.props.population.originVec.x},${this.props
              .population.originVec.y} ${genesToPath.join(" ")}`;

            return (
              <g key={i}>
                <path
                  d={d}
                  stroke="rgba(225, 114, 125, 0.8)"
                  strokeWidth="1"
                  fill="none"
                />
                <circle
                  cx={rocket.posVectors[f].x}
                  cy={rocket.posVectors[f].y}
                  r="2"
                  fill="#E1727D"
                />
              </g>
            );
          })}

          <circle
            cx={this.props.population.targetVec.x}
            cy={this.props.population.targetVec.y}
            r="5"
            fill="#83C183"
          />
          <circle
            cx={this.props.population.originVec.x}
            cy={this.props.population.originVec.y}
            r="5"
            fill="#4285F4"
          />
        </svg>
      </div>
    );
  }
}

export default EvolutionVis;
