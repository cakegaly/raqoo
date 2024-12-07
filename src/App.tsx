import ReactFlow, { Background } from "reactflow";
import "reactflow/dist/style.css";

function App() {
  const nodes = [
    { id: "1", position: { x: 250, y: 5 }, data: { label: "Node 1" } },
    { id: "2", position: { x: 100, y: 100 }, data: { label: "Node 2" } },
  ];

  const edges = [{ id: "e1-2", source: "1", target: "2" }];

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
      </ReactFlow>
    </main>
  );
}

export default App;
