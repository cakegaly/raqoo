import { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Node,
  NodeMouseHandler,
  useEdgesState,
  useNodesState,
} from "reactflow";
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
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onNodeClick: NodeMouseHandler = useCallback((event, node) => {
    event.preventDefault();
    setSelectedNode(node);
  }, []);

  const deleteSelectedNode = useCallback(() => {
    if (!selectedNode) return;
    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
    setEdges((eds) =>
      eds.filter(
        (edge) =>
          edge.source !== selectedNode.id && edge.target !== selectedNode.id
      )
    );
    setSelectedNode(null);
  }, [selectedNode, setNodes, setEdges]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4 flex gap-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() =>
            setNodes((nds) =>
              nds.concat({
                id: getId(),
                position: { x: Math.random() * 400, y: Math.random() * 400 },
                data: { label: `Node ${id}` },
              })
            )
          }
        >
          Add Node
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={deleteSelectedNode}
          disabled={!selectedNode}
        >
          Delete Selected Node
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
      >
        <Background />
      </ReactFlow>
    </div>
  );
}

export default App;
