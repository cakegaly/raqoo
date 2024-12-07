import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Edge,
  Node,
  NodeMouseHandler,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

let id = 2;

function getId() {
  return `${++id}`;
}

const initialNodes: Node[] = [
  { id: "1", data: { label: "Node 1" }, position: { x: 100, y: 100 } },
  { id: "2", data: { label: "Node 2" }, position: { x: 300, y: 100 } },
];
const initialEdges: Edge[] = [];
// const initialEdges: Edge[] = [
//   {
//     id: "e1-2",
//     source: "1",
//     target: "2",
//     style: { stroke: "red", strokeWidth: 2 },
//   },
// ];

function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
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

  const handleConnect = (connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  };

  const onEdgeClick = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      event.preventDefault();
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    },
    [setEdges]
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="my-4 flex gap-4">
        <Button
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
        </Button>
        <Button onClick={deleteSelectedNode} disabled={!selectedNode}>
          {selectedNode ? `Delete Node ${selectedNode.id}` : "No node selected"}
        </Button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onConnect={handleConnect}
      >
        <Background />
      </ReactFlow>
    </div>
  );
}

function App() {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
}

export default App;
