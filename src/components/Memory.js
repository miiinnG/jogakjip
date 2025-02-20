import React from "react";
import MemoryHeader from "./MemoryHeader";
import MemoryDetails from "./MemoryDetails";
import MemoryContent from "./MemoryContent";
import "./Memory.css";

const Memory = ({ memory, setMemory }) => {
  return (
    <div className="memory">
      <MemoryHeader memory={memory} />
      <MemoryDetails 
        title={memory.title} 
        tags={memory.tags} 
        location={memory.location} 
        createdAt={memory.createdAt} 
        likeCount={memory.likeCount} 
        commentCount={memory.commentCount} 
        id={memory.id}
        setMemory={setMemory}
      />
      <MemoryContent imageUrl={memory.imageUrl} content={memory.content} />
    </div>
  );
};


export default Memory;
