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
        <SItem
          style={{ flexDirection: "column", justifyContent: "space-between" }}
        >
          <SParameters>
            <div>100</div>
            <div>Population size</div>

            <div>50%</div>
            <div>% genes from fitter parent</div>

            <div>Linear</div>
            <div>Fitness function</div>

            <div>Mid-point</div>
            <div>Recombination type</div>

            <div>0%</div>
            <div>Mutation rate</div>
          </SParameters>

          <SButton>Edit</SButton>
        </SItem>
        <SItem style={{ padding: 0 }}>
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

const SButton = styled.div`
  background: linear-gradient(160.48deg, #db5e39 11.37%, #cf4076 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  color: white;
  display: block;
  padding: 8px 12px;
  font-weight: 500;
  width: 100%;
  text-align: center;

  cursor: pointer;

  &:hover {
    box-shadow: 2px 6px 4px rgba(0, 0, 0, 0.5);
  }
`;

const SParameters = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 20px repeat;

  column-gap: 10px;
  row-gap: 10px;

  color: white;
  font-size: 14px;
  font-weight: medium;
  white-space: nowrap;

  > :nth-child(odd) {
    color: #ffaf97;
    text-align: right;
  }
`;

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
  padding: ${pageMargin / 2}px;
  border: 1px solid #15172b66;
`;

export default DashboardRow;
