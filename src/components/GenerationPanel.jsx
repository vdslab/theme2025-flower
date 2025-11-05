import "../styles/generationPanel.css";
import GeminiApi from "./GeminiAPI";
const GenerationPanel = ({ flowerList }) => {
  return <GeminiApi flowerList={flowerList} />;
};

export default GenerationPanel;
