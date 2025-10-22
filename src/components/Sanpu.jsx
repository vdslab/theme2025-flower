import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";

const margin = { top: 20, right: 20, bottom: 40, left: 40 };

const Sanpu = ({ height, width, onNodeClick, onNodesSelect }) => {
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [bunsanData, setBunsanData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data/umap1_flower.json");
        const data = await res.json();
        console.log(data);
        setBunsanData(data);
      } catch (error) {
        console.error("データの読み込みエラー:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    onNodesSelect?.(selectedNodes);
  }, [selectedNodes, onNodesSelect]);

  // データが空の場合のデフォルト値を設定
  const xScale = d3
    .scaleLinear()
    .domain(
      bunsanData.length > 0
        ? [d3.min(bunsanData, (d) => d.x), d3.max(bunsanData, (d) => d.x)]
        : [0, 1]
    )
    .range([margin.left, width - margin.right])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain(
      bunsanData.length > 0
        ? [d3.min(bunsanData, (d) => d.y), d3.max(bunsanData, (d) => d.y)]
        : [0, 1]
    )
    .range([height - margin.bottom, margin.top])
    .nice();

  // Create refs for axes
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);

  const [simulateData, setSimulateData] = useState([]);
  const size = 60;

  // Set up x-axis and y-axis with useEffect to handle D3 rendering
  useEffect(() => {
    if (bunsanData.length === 0) return;

    if (xAxisRef.current) {
      const xAxis = d3.axisBottom(xScale);
      d3.select(xAxisRef.current).call(xAxis);
    }

    if (yAxisRef.current) {
      const yAxis = d3.axisLeft(yScale);
      d3.select(yAxisRef.current).call(yAxis);
    }

    const node = bunsanData.map((d) => ({ ...d }));
    const simulation = d3
      .forceSimulation(node)
      .force(
        "x",
        d3.forceX((d) => xScale(d.x))
      )
      .force(
        "y",
        d3.forceY((d) => yScale(d.y))
      )
      .force("collide", d3.forceCollide(size / 2))
      .stop();

    simulation.tick(200);
    // node.forEach((d) => {
    //   d.x = Math.max(padding + r, Math.min(w - padding - r, d.x));
    //   d.y = Math.max(padding + r, Math.min(h - padding - r, d.y));
    // });

    setSimulateData(node);
  }, [bunsanData, width, height]);

  return (
    <svg width={width} height={height}>
      {simulateData.map((d, i) => {
        const isSelected = selectedNodes.some(
          (node) => node.filename === d.filename
        );

        return (
          <g key={i}>
            {isSelected && (
              <circle
                cx={d.x}
                cy={d.y}
                r={size / 2 + 3}
                fill="none"
                stroke="#00ffc3ff"
                strokeWidth="4"
              />
            )}
            <image
              href={`/image/all_flower/${d.filename}`}
              x={d.x - size / 2}
              y={d.y - size / 2}
              height={size}
              width={size}
              preserveAspectRatio="xMidYMid slice"
              style={{
                cursor: "pointer",
                clipPath: "circle(50%)",
              }}
              onClick={() => {
                console.log(d.filename);
                onNodeClick(d);
                setSelectedNodes((prev) => {
                  const isSelected = prev.some(
                    (node) => node.filename === d.filename
                  );
                  if (isSelected) {
                    return prev.filter((node) => node.filename !== d.filename);
                  } else {
                    return [...prev, d];
                  }
                });
              }}
            />
          </g>
        );
      })}
    </svg>
  );
};

export default Sanpu;
