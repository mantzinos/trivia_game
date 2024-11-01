import React, { useState } from "react";

const Choose = ({ answer, correct, clickMe }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={() => {
        clickMe(correct);
      }}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false);
      }}
      style={{
        backgroundColor: hover && "#112d4e",
        border: hover && "2px solid #f9f7f7"
      }}
      className="answer"
    >
      <h2>{answer}</h2>
    </div>
  );
};

export default Choose;
