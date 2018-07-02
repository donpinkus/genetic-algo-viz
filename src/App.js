import React, { Component } from "react";
import styled from "styled-components";
import _ from "lodash";

import { pageMargin } from "./Styles";
import Timeline from "./Timeline";
import DashboardRow from "./DashboardRow";
import { Population } from "./Population";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { frameNumber: 0, generationNumber: 0 };

    this.sequenceLength = 99;

    this.originVec = { x: 0, y: 80 };
    this.targetVec = { x: 0, y: -80 };

    this.generationCount = 20;
    const geneCount = 100;

    this.populations = [];
    this.populations[0] = new Population(
      geneCount,
      this.generationCount,
      this.originVec,
      this.targetVec
    );

    console.log("population", this.populations);
  }

  componentDidMount() {
    this.setState({ frameNumber: this.state.frameNumber });
  }

  componentDidUpdate(prevProps, prevState) {
    // Increment frame
    if (this.state.frameNumber < this.sequenceLength) {
      setTimeout(() => {
        this.setState({ frameNumber: this.state.frameNumber + 1 });
      }, 5);
    } else if (this.state.generationNumber < this.generationCount) {
      // Increment generation
      setTimeout(() => {
        this.setState({
          frameNumber: 0,
          generationNumber: this.state.generationNumber + 1
        });
      }, 500);
    } else {
      // Reset generation
      this.setState({
        frameNumber: 0,
        generationNumber: 0
      });
    }
  }

  render() {
    return (
      <main className="App">
        <SHeader>
          <span>Evolution Visualizer</span>
        </SHeader>
        <div style={{ width: 1120, margin: "0 auto" }}>
          <Timeline />
          <SDashboardSection>
            <SDashboardHeader>
              <div>Fitness Function</div>
              <div>Evolution over time</div>
              <div>Fitness over time</div>
              <div>Final Fitness</div>
            </SDashboardHeader>
            <DashboardRow
              population={this.populations[0]}
              generationNumber={this.state.generationNumber}
              frameNumber={this.state.frameNumber}
            />
          </SDashboardSection>
        </div>
      </main>
    );
  }
}

const SHeader = styled.header`
  background: #222940;
  height: 58px;
  color: #ffffff;
  text-align: left;
  display: flex;
  align-items: center;
  font-size: 25px;
  font-weight: 300;
  padding: 0 ${pageMargin}px;
  span {
    opacity: 0.75;
  }
`;

const SDashboardSection = styled.section`
  margin: 0 ${pageMargin}px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
`;

const SDashboardHeader = styled.div`
  background: #272c46;
  border-radius: 5px 5px 0px 0px;
  display: flex;
  align-items: center;
  color: white;
  height: 50px;
  font-weight: 300;
  div {
    width: 25%;
    text-align: center;
    opacity: 0.75;
  }
`;

export default App;
