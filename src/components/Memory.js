import React from "react";
import MemoryHeader from "./MemoryHeader";
import MemoryDetails from "./MemoryDetails";
import MemoryContent from "./MemoryContent";
import "./Memory.css";

const Memory = ({ memory }) => {
  return (
    <div className="memory">
      {/* memory 객체 전체를 MemoryHeader로 전달 */}
      <MemoryHeader memory={memory} />
      <MemoryDetails 
        title={memory.title} 
        tags={memory.tags} 
        location={memory.location} 
        createdAt={memory.createdAt} 
        likeCount={memory.likeCount} 
        commentCount={memory.commentCount} 
      />
      <MemoryContent imageUrl={memory.imageUrl} content={memory.content} />
    </div>
  );
};

export default Memory;
