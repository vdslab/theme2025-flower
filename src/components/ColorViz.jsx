import { useEffect, useState } from "react";
import "../styles/colorViz.css";
import Sanpu from "./Sanpu";
function ColorViz({ onNodeClick, onNodesSelect, hasSidebar }) {
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

  const vizWidth = hasSidebar
    ? windowSize.width * 0.78
    : windowSize.width * 0.98;

  return (
    <section className="section">
      <Sanpu
        width={vizWidth}
        height={windowSize.height * 0.87}
        onNodeClick={onNodeClick}
        onNodesSelect={onNodesSelect}
      />
    </section>
  );
}

export default ColorViz;
