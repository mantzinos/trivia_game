import React, { useState } from "react";

const Answer = ({ answer, id, clickMe }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={() => {
        clickMe(id);
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

export default Answer;
