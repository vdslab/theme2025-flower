import "../styles/header.css";

const Header = ({ onColorSearchClick }) => {
  return (
    <div>
      <header className="header">
        <h1 className=" font-dancing site-title">BooPick</h1>
        <div className="search-content">
          {/* todo:クリックしたら下矢印を上矢印にする */}
          <button className="search-button" onClick={onColorSearchClick}>
            色▼
          </button>
          <button className="search-button">開▼</button>
          <button className="search-button">イ▼</button>
        </div>
      </header>
    </div>
  );
};

export default Header;
