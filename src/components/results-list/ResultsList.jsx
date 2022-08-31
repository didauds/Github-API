import React from "react";
import ResultItem from "../Result-item/ResultItem";
import "./results-list.css";

const ResultList = ({ results }) => {
  return (
    <div className="results-container">
      {results.map((result) => (
        <ResultItem key={result.id} {...result} />
      ))}
    </div>
  );
};

export default ResultList;
