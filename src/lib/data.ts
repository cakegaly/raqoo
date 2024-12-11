import { Edge, Node, Position } from "reactflow";

export const initialNodes: Node[] = [
  {
    id: "1",
    data: { label: "Parent Node" },
    position: { x: 100, y: 100 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
];

export const initialEdges: Edge[] = [];
