import React from "react";
import loading from "./loading.gif";
const Spinner = () => {
  return (
    <div className="text-center" style={{ marginTop: "50vh" }}>
      <img src={loading} alt="loading" />
    </div>
  );
};

export default Spinner;
