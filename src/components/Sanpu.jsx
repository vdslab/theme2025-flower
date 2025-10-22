import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";

const margin = { top: 10, right: 20, bottom: 10, left: 10 };

const Sanpu = ({ height, width, onNodeClick, onNodesSelect }) => {
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [bunsanData, setBunsanData] = useState([]);
  const size = 65;
  const [simulateData, setSimulateData] = useState([]);

  const svgRef = useRef();
  const zoomRef = useRef();
  const [k, setK] = useState(1);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

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
    //zoom
    zoomRef.current = d3
      .zoom()
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .on("zoom", (event) => {
        const { x, y, k } = event.transform;
        setK(k);
        setX(x);
        setY(y);
      });
    d3.select(svgRef.current).call(zoomRef.current);
  }, []);

  // データが空の場合のデフォルト値を設定
  const xScale = d3
    .scaleLinear()
    .domain([d3.min(bunsanData, (d) => d.x), d3.max(bunsanData, (d) => d.x)])
    .range([margin.left, width - margin.right])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain([d3.min(bunsanData, (d) => d.y), d3.max(bunsanData, (d) => d.y)])
    .range([margin.top, height - margin.bottom])
    .nice();

  useEffect(() => {
    if (bunsanData.length === 0) return;

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

    simulation.tick(500);
    node.forEach((d) => {
      d.x = Math.max(
        margin.right + size / 2,
        Math.min(width - margin.left - size / 2, d.x)
      );
      d.y = Math.max(
        margin.bottom + size / 2,
        Math.min(height - margin.top - size / 2, d.y)
      );
    });

    setSimulateData(node);
  }, [bunsanData, width, height]);

  const zoomToNde = (node) => {
    if (!zoomRef.current) return;

    const zoomSvg = d3.select(svgRef.current);

    const scale = 2;
    const translateX = width / 2 - node.x * scale;
    const translateY = height / 2 - node.y * scale;

    zoomSvg
      .transition()
      .duration(750)
      .call(
        zoomRef.current.transform,
        d3.zoomIdentity.translate(translateX, translateY).scale(scale)
      );
  };

  return (
    <svg ref={svgRef} width={width} height={height}>
    <g transform={`translate(${x},${y})scale(${k})`}>
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
                zoomToNde(d);
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
       </g>
    </svg>
  );
};

export default Sanpu;
