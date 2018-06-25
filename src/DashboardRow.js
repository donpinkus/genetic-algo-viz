import React, { Component } from "react";
import styled from "styled-components";
import _ from "lodash";

import { pageMargin } from "./Styles";
import { Population } from "./Population";
import EvolutionViz from "./EvolutionViz";

class DashboardRow extends Component {
  constructor(props) {
    super(props);

    this.originVec = { x: 0, y: 80 };
    this.targetVec = { x: 0, y: -80 };

    const generationCount = 100;

    this.generations = _.times(
      generationCount,
      () => new Population(this.originVec, this.targetVec)
    );
  }

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
            frameNumber={this.props.frameNumber}
            generationNumber={this.props.generationNumber}
            generations={this.generations}
          />
        </SItem>
        <SItem />
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
