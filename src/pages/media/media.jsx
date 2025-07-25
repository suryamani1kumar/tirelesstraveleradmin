import React, { useState } from "react";

const Media = () => {
  const [images, setImages] = useState([]);
  const handleFileUpload = (e) => {
    setImages([...images, ...e.target.files]);
  };
  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default Media;
