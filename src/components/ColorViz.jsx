import { useEffect, useState } from "react";
import "../styles/colorViz.css";
import Sanpu from "./Sanpu";
function ColorViz({ onNodeClick }) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // useEffectをリサイズ専用に変更
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
}

export default ColorViz;
