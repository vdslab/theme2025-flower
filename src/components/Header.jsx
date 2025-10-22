import { useState } from "react";
import "../styles/header.css";
import GeminiApi from "./GeminiAPI";

const Header = () => {
  const generateList = ["rose"];
  const [openGemini, setOpenGemini] = useState(false);
  const [getImage, setGetImage] = useState(false);

  return (
    <div>
      <header className="header">
        <h1 className="site-title">花束作成支援サイト</h1>
        <button
          onClick={() => {
            setOpenGemini(true);
            setGetImage(true);
          }}
        >
          {getImage ? "作成中..." : "作成"}
        </button>
      </header>
      {openGemini && (
        <GeminiApi
          flowerList={generateList}
          openGemini={openGemini}
          setOpenGemini={setOpenGemini}
          setGetImage={setGetImage}
        />
      )}
    </div>
  );
};

export default Header;
