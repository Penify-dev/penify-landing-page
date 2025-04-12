import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  Panel,
} from "@xyflow/react";
import { useEffect, useState } from "react";
import { initialEdges, initialNodes } from "@/utils/flowItems";
import DocumentNode from "./DocumentNode/DocumentNode";
import IONode from "./IONode/IONode";
import DatabaseNode from "./DatabaseNode/DatabaseNode";
import AgentNode from "./AgentNode/AgentNode";
import StakeholderNode from "./StakeholderNode/StakeholderNode";
import { BiEdge } from "./BiEdge/BiEdge";
import { UniEdge } from "./UniEdge/UniEdge";
import { motion } from "framer-motion";

function FlowContent() {
  const { fitView } = useReactFlow();
  const [highlightedPath, setHighlightedPath] = useState<string | null>(null);
  const [isInitialFitDone, setIsInitialFitDone] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      fitView({ duration: 200, padding: 0.2 });
    };

    window.addEventListener("resize", handleResize);
    
    // Perform initial fit with a slight delay for better rendering
    const timer = setTimeout(() => {
      fitView({ duration: 600, padding: 0.1 });
      setIsInitialFitDone(true);
    }, 300);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [fitView]);

  // Path highlighting sequences - these ensure visual clarity when showing flow paths
  const flowPaths = {
    "code-to-docs": ["e2-core", "e5-core"],
    "pr-workflow": ["e1-core", "e3-core"],
    "knowledge-access": ["e4-core", "e6-core"]
  };
  
  // Modify edges to highlight specific paths
  const getEdges = () => {
    if (!highlightedPath) return initialEdges;
    
    return initialEdges.map(edge => {
      if (flowPaths[highlightedPath as keyof typeof flowPaths]?.includes(edge.id)) {
        return {
          ...edge,
          style: { stroke: '#4ade80', strokeWidth: 3 },
          animated: true,
          labelStyle: { fill: '#4ade80', fontWeight: 'bold' }
        };
      }
      return {
        ...edge,
        style: { opacity: 0.3 },
        animated: false
      };
    });
  };

  // Custom node types for diagram elements
  const NodeTypes = {
    document: DocumentNode,
    ioParent: IONode,
    database: DatabaseNode,
    agent: AgentNode,
    stakeholder: StakeholderNode,
  };

  const EdgeTypes = {
    uniEdge: UniEdge,
    biEdge: BiEdge,
  };

  return (
    <div className="flow-container relative">
      <ReactFlow
        nodes={initialNodes}
        edges={getEdges()}
        nodeTypes={NodeTypes}
        edgeTypes={EdgeTypes}
        nodeOrigin={[0, 0]}
        fitView={true}
        preventScrolling={false}
        className="min-h-[500px] md:min-h-[600px] rounded-xl shadow-lg bg-gradient-to-br from-slate-900 to-slate-800"
        nodesDraggable={false}
        panOnDrag={true}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        minZoom={0.4}
        maxZoom={1.2}
        defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={16} 
          size={1} 
          color="rgba(255, 255, 255, 0.05)" 
        />
        <Controls 
          showZoom={false} 
          showFitView={true} 
          showInteractive={false}
          className="bg-slate-700 text-white border-slate-600 shadow-lg" 
        />
        
        {/* Interactive panel for selecting flow paths */}
        <Panel position="top-left" className="flow-legend p-3 bg-slate-800/90 backdrop-blur-sm rounded-lg border border-slate-700 shadow-xl text-sm text-white m-3">
          <h4 className="font-semibold mb-2 text-green-400">Documentation Flows</h4>
          <motion.ul 
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInitialFitDone ? 1 : 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <li>
              <button 
                onClick={() => setHighlightedPath(highlightedPath === "code-to-docs" ? null : "code-to-docs")}
                className={`flex items-center space-x-2 px-3 py-1 rounded-md transition-all ${highlightedPath === "code-to-docs" ? 'bg-green-500/20 text-green-400' : 'hover:bg-slate-700'}`}
              >
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
                <span>Code to Documentation</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setHighlightedPath(highlightedPath === "pr-workflow" ? null : "pr-workflow")}
                className={`flex items-center space-x-2 px-3 py-1 rounded-md transition-all ${highlightedPath === "pr-workflow" ? 'bg-green-500/20 text-green-400' : 'hover:bg-slate-700'}`}
              >
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
                <span>PR Workflow</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setHighlightedPath(highlightedPath === "knowledge-access" ? null : "knowledge-access")}
                className={`flex items-center space-x-2 px-3 py-1 rounded-md transition-all ${highlightedPath === "knowledge-access" ? 'bg-green-500/20 text-green-400' : 'hover:bg-slate-700'}`}
              >
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
                <span>Knowledge Access</span>
              </button>
            </li>
          </motion.ul>
        </Panel>
        
        {/* Diagram description at the bottom */}
        <Panel position="bottom-center" className="p-3 bg-slate-800/80 backdrop-blur-sm rounded-t-lg border border-slate-700 shadow-xl text-xs text-slate-300 mx-auto max-w-lg mb-3">
          <p className="text-center">
            <span className="text-green-400 font-medium">Interactive Flow Diagram:</span> Click on different paths above to see how Penify automatically documents your codebase
          </p>
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default function Flow() {
  return (
    <ReactFlowProvider>
      <FlowContent />
    </ReactFlowProvider>
  );
}
