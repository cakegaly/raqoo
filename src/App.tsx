import { FlowCanvas } from "@/components/flow-canvas";
import { IdProvider } from "@/context/id-context";
import { ReactFlowProvider } from "reactflow";

export default function App() {
  return (
    <ReactFlowProvider>
      <IdProvider>
        <FlowCanvas />
      </IdProvider>
    </ReactFlowProvider>
  );
}
