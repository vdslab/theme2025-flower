import "./App.css";
import Header from "./components/Header";
import ColorViz from "./components/ColorViz";
import ExpandableDetail from "./components/ExpandableDetail";
import { useState } from "react";

function App() {
  const [selectedData, setSelectedData] = useState(null);

  return (
    <div className="container">
      <Header />
      <main className="main-content">
        <ColorViz onNodeClick={setSelectedData} />
        {selectedData && (
          <ExpandableDetail
            data={selectedData}
            onClose={() => setSelectedData(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
