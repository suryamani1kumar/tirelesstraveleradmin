import { useState } from 'react';

const ForgetPassword = () => {
  const [isHovered, setHovered] = useState(false);
  function handleMouseEnter() {
    setHovered(true);
  }

  function handleMouseLeave() {
    setHovered(false);
  }

  return (
    <>
      <p
        style={{ backgroundColor: isHovered ? 'blue' : 'white' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        fghsdfjsfhksdfsdflkffj
      </p>
    </>
  );
};

export default ForgetPassword;
