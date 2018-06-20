import React from "react";

const PlayBtnTriangle = () => (
  <svg
    width="33px"
    height="33px"
    viewBox="0 0 33 33"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <polygon id="path-1" points="29 14.5 4 27 4 2" />
      <filter
        x="-28.0%"
        y="-20.0%"
        width="156.0%"
        height="156.0%"
        filterUnits="objectBoundingBox"
        id="filter-2"
      >
        <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur
          stdDeviation="2"
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
        />
        <feColorMatrix
          values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0"
          type="matrix"
          in="shadowBlurOuter1"
        />
      </filter>
    </defs>
    <g
      id="Page-1"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g id="Triangle">
        <use
          fill="black"
          fill-opacity="1"
          filter="url(#filter-2)"
          xlinkHref="#path-1"
        />
        <use fill="#FFFFFF" fill-rule="evenodd" xlinkHref="#path-1" />
      </g>
    </g>
  </svg>
);

export default PlayBtnTriangle;
