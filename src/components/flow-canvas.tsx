import { useId } from "@/context/id-context";
import { initialEdges, initialNodes } from "@/lib/data";
import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Edge,
  Node,
  Position,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

export function FlowCanvas() {
  const { getId } = useId();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const { project } = useReactFlow();

  const calculateChildPosition = (
    parentPosition: { x: number; y: number },
    currentChildIndex: number,
    totalChildren: number
  ) => {
    const xOffset = 200;
    const ySpacing = 100;
    const yOffset = (currentChildIndex - (totalChildren - 1) / 2) * ySpacing;

    return {
      x: parentPosition.x + xOffset,
      y: parentPosition.y + yOffset,
    };
  };

  const addChildNode = useCallback(
    (parentNode: Node) => {
      const newNodeId = getId();

      const childNodes = nodes.filter((node) =>
        edges.some(
          (edge) => edge.source === parentNode.id && edge.target === node.id
        )
      );

      const newPosition = calculateChildPosition(
        parentNode.position,
        childNodes.length,
        childNodes.length + 1
      );

      const newNode: Node = {
        id: newNodeId,
        position: newPosition,
        data: { label: `Node ${newNodeId}` },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      };

      const newEdge: Edge = {
        id: `edge-${parentNode.id}-${newNodeId}`,
        source: parentNode.id,
        target: newNodeId,
      };

      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) => eds.concat(newEdge));
      setSelectedNodeId(null);
    },
    [getId, nodes, edges, setNodes, setEdges]
  );

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id === selectedNodeId ? null : node.id);
    },
    [selectedNodeId]
  );

  const handleConnect = (connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onConnect={handleConnect}
      >
        <Background />
      </ReactFlow>

      {selectedNodeId &&
        nodes.map((node) =>
          node.id === selectedNodeId ? (
            <div
              key={`button-container-${node.id}`}
              className="absolute"
              style={{
                top: project(node.position).y - 10,
                left: project(node.position).x + 120,
                transform: "translate(-50%, -50%)",
                zIndex: 10,
              }}
            >
              <button
                className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
                onClick={(event) => {
                  event.stopPropagation();
                  addChildNode(node);
                }}
              >
                +
              </button>
            </div>
          ) : null
        )}
    </div>
  );
}
