import React from "react";
import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div className="loading-spinner">
      <CircularProgress />
    </div>
  );
};

export default Loading;
