import { useEffect, useRef, useState } from "react";
import "../styles/colorViz.css";
import Sanpu from "./Sanpu";
import * as d3 from "d3";

const ColorViz = ({ onNodeClick }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  //リサイズ
  useEffect(() => {
    const reSizeWindow = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", reSizeWindow);

    return () => window.removeEventListener("resize", reSizeWindow);
  }, []);

  return (
    <section className="section">
      <Sanpu
        width={windowSize.width * 0.98}
        height={windowSize.height * 0.87}
        onNodeClick={onNodeClick}
      />
    </section>
  );
};

export default ColorViz;
