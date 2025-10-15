import { useEffect, useState } from "react";
import "../styles/colorViz.css";
import Sanpu from "./Sanpu";
function ColorViz() {
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
      <Sanpu width={windowSize.width} height={windowSize.height * 0.79} />
    </section>
  );
}

export default ColorViz;
