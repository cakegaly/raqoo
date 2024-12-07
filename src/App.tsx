import { useCallback } from "react";
import ReactFlow, { Background, useEdgesState, useNodesState } from "reactflow";
import "reactflow/dist/style.css";

let id = 2;

function getId() {
  return `${++id}`;
}

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    { id: "1", position: { x: 250, y: 5 }, data: { label: "Node 1" } },
    { id: "2", position: { x: 100, y: 100 }, data: { label: "Node 2" } },
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([
    { id: "e1-2", source: "1", target: "2" },
  ]);

  // add new node
  const addNode = useCallback(() => {
    const newNode = {
      id: getId(),
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `Node ${id}` },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  // delete exist node
  const deleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );
    },
    [setNodes, setEdges]
  );

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4 flex gap-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={addNode}
        >
          Add Node
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => deleteNode("2")} // ID 2 のノードを削除
        >
          Delete Node 2
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        <Background />
      </ReactFlow>
    </main>
  );
}

export default App;
