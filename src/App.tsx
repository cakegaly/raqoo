import { FlowCanvas } from "@/components/flow-canvas";
import { ReactFlowProvider } from "reactflow";

export default function App() {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
}
