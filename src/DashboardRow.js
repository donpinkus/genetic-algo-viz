import React, { Component } from "react";
import styled from "styled-components";
import _ from "lodash";

import { pageMargin } from "./Styles";
import EvolutionViz from "./EvolutionViz";
import MaxFitnessViz from "./MaxFitnessViz";

class DashboardRow extends Component {
  render() {
    return (
      <SDashboardRow>
        <SItem>
          <svg viewBox="0 0 100 100" width="100%" height="180">
            <path
              d="M 0,100 L 100,0"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </SItem>
        <SItem>
          <EvolutionViz
            population={this.props.population}
            generationNumber={this.props.generationNumber}
            frameNumber={this.props.frameNumber}
          />
        </SItem>
        <SItem>
          <MaxFitnessViz
            population={this.props.population}
            generationNumber={this.props.generationNumber}
          />
        </SItem>
        <SItem />
      </SDashboardRow>
    );
  }
}

const SDashboardRow = styled.div`
  background: #1e2339;
  margin-bottom: 2px;
  display: flex;
`;

const SItem = styled.div`
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${pageMargin}px;
`;

export default DashboardRow;
