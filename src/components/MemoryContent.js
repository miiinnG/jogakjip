import React from "react";
import "./MemoryContent.css";

const MemoryContent = ({ imageUrl, content }) => {
  return (
    <div className="memory-content">
      <img className="memoryImg" src={imageUrl} alt="Memory" />
      <p>{content}</p>
    </div>
  );
};

export default MemoryContent;
