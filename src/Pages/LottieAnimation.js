import React from "react";
import Lottie from "react-lottie";
// import animationData from "./your-animation.json"; // Replace with the path to your JSON file

const LottieAnimation = ({ animationData }) => {
  const defaultOptions = {
    loop: true, // Set to true if you want the animation to loop
    autoplay: true, // Set to true if you want the animation to play on load
    animationData: animationData, // Your animation JSON data
  };

  return (
    <div>
      <Lottie options={defaultOptions} />
    </div>
  );
};

export default LottieAnimation;
