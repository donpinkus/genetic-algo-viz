import React, { Component } from "react";
import styled from "styled-components";
import _ from "lodash";

import { pageMargin } from "./Styles";
import Timeline from "./Timeline";
import DashboardRow from "./DashboardRow";
import { Population } from "./Population";

/*
1. At app level we define the population size, generations, genecounts, etc.

2. We generate a population, which includes how the population evolves over generations

*/
class App extends Component {
  constructor(props) {
    super(props);

    this.state = { frameNumber: 0, generationNumber: 0, isPlaying: false };

    this.sequenceLength = 99;

    this.originVec = { x: -60, y: -80 };
    this.targetVec = { x: 60, y: 80 };

    this.generationCount = 30;

    const geneCount = 100; // TODO: changing genecount breaks?

    this.populations = [];

    this.populations[0] = new Population(
      geneCount,
      this.generationCount,
      this.originVec,
      this.targetVec
    );

    this.populations[1] = new Population(
      geneCount,
      this.generationCount,
      this.originVec,
      this.targetVec
    );

    this.populations[2] = new Population(
      geneCount,
      this.generationCount,
      this.originVec,
      this.targetVec
    );

    this.populations[3] = new Population(
      geneCount,
      this.generationCount,
      this.originVec,
      this.targetVec
    );

    console.log("population", this.populations);
  }

  componentDidMount() {
    this.setState({
      isPlaying: true,
    });
  }

  advanceFrameOrResetGeneration() {
    // Increment frame
    if (this.state.frameNumber < this.sequenceLength) {
      setTimeout(() => {
        this.setState({ frameNumber: this.state.frameNumber + 1 });
      }, 5);
    } else if (this.state.generationNumber < this.generationCount - 1) {
      // The "- 1" is so that the last time we increment the generation count is when we're setting it equal to the generation count.
      setTimeout(() => {
        this.setState({
          frameNumber: 0,
          generationNumber: this.state.generationNumber + 1,
        });
      }, 500);
    } else {
      console.log("reset generation number");
      // Reset generation
      this.setState({
        frameNumber: 0,
        generationNumber: 0,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isPlaying) {
      this.advanceFrameOrResetGeneration();
    }
  }

  startPlaying() {
    this.setState({ isPlaying: true });
  }

  stopPlaying() {
    this.setState({ isPlaying: false });
  }

  render() {
    return (
      <main className="App">
        <SHeader>
          <span>Genetic Algorithm Visualizer</span>
        </SHeader>
        <div style={{ width: 1120, margin: "0 auto" }}>
          <Timeline
            generationNumber={this.state.generationNumber}
            max={this.generationCount}
            isPlaying={this.state.isPlaying}
            onPlayClick={this.startPlaying.bind(this)}
            onPauseClick={this.stopPlaying.bind(this)}
          />
          <SDashboardSection>
            <SDashboardHeader>
              <div>Parameters</div>
              <div>Evolution over time</div>
              <div>Max fitness over time</div>
              <div>Final max fitness</div>
            </SDashboardHeader>
            <DashboardRow
              population={this.populations[0]}
              generationNumber={this.state.generationNumber}
              frameNumber={this.state.frameNumber}
            />
            <DashboardRow
              population={this.populations[1]}
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
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 3020;
  padding: 0 ${pageMargin}px;
  span {
    opacity: 0.75;
  }
`;

const SDashboardSection = styled.section`
  margin: 0 ${pageMargin}px 50px;
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
