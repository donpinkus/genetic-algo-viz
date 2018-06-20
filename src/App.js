import React, { Component } from "react";
import logo from "./logo.svg";
import styled from "styled-components";

import Timeline from "./Timeline";
import { pageMargin } from "./Styles";

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

const SDashboardRow = styled.div`
  background: #1e2339;
  height: 290px;
  margin-bottom: 2px;
`;

class App extends Component {
  render() {
    return (
      <main className="App">
        <SHeader>
          <span>Evolution Visualizer</span>
        </SHeader>
        <Timeline />
        <SDashboardSection>
          <SDashboardHeader>
            <div>Fitness Function</div>
            <div>Evolution over time</div>
            <div>Fitness over time</div>
            <div>Final Fitness</div>
          </SDashboardHeader>
          <SDashboardRow />
          <SDashboardRow />
          <SDashboardRow />
        </SDashboardSection>
      </main>
    );
  }
}

export default App;
