import "./App.css";
import Header from "./components/Header";
import ColorViz from "./components/ColorViz";
import ExpandableDetail from "./components/ExpandableDetail";
import SelectedNodesPanel from "./components/SelectedNodesPanel";
import { useState } from "react";

function App() {
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  const handleNodeRemove = (nodeToRemove) => {
    setSelectedNodes((prev) =>
      prev.filter((node) => node.filename !== nodeToRemove.filename)
    );
  };

  const handleClearAll = () => {
    setSelectedNodes([]);
  };
  console.log("selectedNodes:", selectedNodes);

  return (
    <div className="container">
      <Header />
      <main className="main-content">
        <div
          className={`viz-area ${
            selectedNodes.length > 0 ? "with-sidebar" : ""
          }`}
        >
          <ColorViz
            onNodeClick={setSelectedData}
            onNodesSelect={setSelectedNodes}
            hasSidebar={selectedNodes.length > 0}
          />
        </div>
        {selectedNodes.length > 0 && (
          <SelectedNodesPanel
            selectedNodes={selectedNodes}
            onNodeRemove={handleNodeRemove}
            onClearAll={handleClearAll}
          />
        )}

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
