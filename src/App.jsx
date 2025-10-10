import "./App.css";
import Header from "./components/Header";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";

function App() {
  return (
    <div className="container">
      <Header />
      <main className="main-content">
        <Section1 />
        <Section2 />
      </main>
    </div>
  );
}

export default App;
