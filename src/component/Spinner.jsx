import React from "react";
import spinner from "../assets/svg/spinner.svg";

function Spinner() {
  return (
    <div className="bg-black bg-opacity-30 z-50 flex items-center justify-center fixed top-0 right-0 bottom-0 left-0">
      <div>
        <img src={spinner} alt="Loading..." />
      </div>
    </div>
  );
}

export default Spinner;
