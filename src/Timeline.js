import React from "react";
import styled from "styled-components";
import PlayBtnTriangle from "./PlayBtnTriangle";
import { pageMargin } from "./Styles";

const Timeline = () => (
  <STimelineSection>
    <SPlayButton onClick={() => alert("run!")}>
      <PlayBtnTriangle />
    </SPlayButton>
    <STimelineContainer>
      <STimelineLine />
      <STimelineDot />
      <STimelineTopLabel>Generation</STimelineTopLabel>
      <STimelineBottomLabels>
        <span>1</span>
        <span>50</span>
        <span>100</span>
      </STimelineBottomLabels>
    </STimelineContainer>
  </STimelineSection>
);

const STimelineSection = styled.section`
  padding: ${pageMargin * 0.75}px ${pageMargin}px;
  display: flex;
`;

const SPlayButton = styled.div`
  background-image: linear-gradient(-45deg, #ee72a1 0%, #f18e70 100%);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const STimelineContainer = styled.div`
  position: relative;
  flex: 1;
  margin: 0 ${pageMargin * 0.5}px;
  text-align: left;
  font-size: 14px;
`;

const STimelineLine = styled.div`
  background-image: linear-gradient(-45deg, #ee72a1 0%, #f18e70 100%);
  height: 2px;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
`;

const STimelineTopLabel = styled.div`
  color: white;
  position: absolute;
  top: 0;
  opacity: 0.4;
`;

const STimelineBottomLabels = styled.div`
  color: white;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  opacity: 0.4;
`;

const STimelineDot = styled.div`
  background-image: linear-gradient(-45deg, #ee72a1 0%, #f18e70 100%);
  border-radius: 50%;
  width: 14px;
  height: 14px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateX(-30%);
`;

export default Timeline;
