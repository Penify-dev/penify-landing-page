import { Handle, Position } from "@xyflow/react";
import { memo } from "react";
import ChatbotIcon from "public/icons/flowchart-chatbot.svg";

function AgentNode({ data }: { data: { label: string } }) {
  return (
    <div className="agent-node group transition-all duration-300 hover:scale-105">
      <Handle
        type="target"
        position={Position.Left}
        id="target-left"
        className="w-3 h-3 bg-orange-400"
      />
      <Handle
        type="target"
        position={Position.Top}
        id="target-top"
        className="w-3 h-3 bg-orange-400"
      />

      <div className="flex flex-col items-center">
        <div className="w-[240px] p-5 rounded-lg border-2 border-orange-400/30 bg-slate-800/50 backdrop-blur-sm shadow-xl flex flex-col items-center gap-4 transition-all group-hover:border-orange-400/50">
          <div className="badge mb-1 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium rounded-full shadow-lg shadow-orange-500/20 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            AI Powered
          </div>
          
          <div className="relative">
            <ChatbotIcon className="w-20 h-20 text-orange-400" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center ring-2 ring-slate-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="agent-label px-4 py-2 bg-orange-500/20 rounded-lg text-center">
            <span className="text-sm font-medium text-orange-400">{data.label}</span>
          </div>
          
          <div className="text-xs text-slate-400 text-center max-w-[200px]">
            Answers queries about your codebase and documentation in natural language
          </div>
          
          <div className="w-full bg-slate-700/50 rounded-md p-2.5 mt-1">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <div className="text-xs text-slate-300 font-medium">Natural Language Query</div>
            </div>
            <div className="bg-slate-900/50 rounded p-2 mt-2 text-xs text-slate-400">
              How does the authentication flow work?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(AgentNode);
