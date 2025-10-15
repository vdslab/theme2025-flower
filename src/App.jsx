import "./App.css";
import Header from "./components/Header";
import ColorViz from "./components/ColorViz";

function App() {
  return (
    <div className="container">
      <Header />
      <main className="main-content">
        <ColorViz />
      </main>
    </div>
  );
}

export default App;
