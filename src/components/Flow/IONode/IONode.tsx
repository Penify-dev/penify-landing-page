import { Handle, Position } from "@xyflow/react";
import { memo } from "react";
import IOIcon01 from "public/icons/flowchart-io-01.svg";
import IOIcon02 from "public/icons/flowchart-io-02.svg";
import IOIcon03 from "public/icons/flowchart-io-03.svg";
import IOIcon04 from "public/icons/flowchart-io-04.svg";
import IOIcon05 from "public/icons/flowchart-io-05.svg";

function IONode({ data }: { data: { label: string } }) {
  return (
    <>
      {data.label === "Jira Tickets Pointer" && (
        <div className="scale-110 transition-all duration-300 hover:scale-115">
          <Handle 
            type="target" 
            position={Position.Left} 
            id="target-left"
            className="w-3 h-3 bg-blue-400" 
          />
          <Handle 
            type="target" 
            position={Position.Bottom} 
            id="target-bot"
            className="w-3 h-3 bg-blue-400" 
          />

          <div className="flex flex-col items-center">
            <div className="status-badge mb-3 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-medium rounded-full shadow-lg shadow-green-500/20 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              Functional and Deployed
            </div>
            
            <div className="w-[380px] h-[140px] rounded-lg border-2 border-blue-400/30 bg-slate-800/50 backdrop-blur-sm shadow-xl flex items-center justify-evenly p-4 transition-all hover:border-blue-400/50">
              <div className="transform hover:scale-110 transition-transform duration-200">
                <IOIcon01 />
              </div>
              <div className="transform hover:scale-110 transition-transform duration-200">
                <IOIcon02 />
              </div>
            </div>
          </div>
        </div>
      )}

      {data.label === "KB Pointer" && (
        <div className="scale-110 transition-all duration-300 hover:scale-115">
          <Handle 
            type="target" 
            position={Position.Top} 
            id="target-top"
            className="w-3 h-3 bg-blue-400"
          />

          <div className="flex flex-col items-center">
            <div className="w-[550px] h-[140px] rounded-lg border-2 border-blue-400/30 bg-slate-800/50 backdrop-blur-sm shadow-xl flex items-center justify-evenly p-4 transition-all hover:border-blue-400/50">
              <div className="transform hover:scale-110 transition-transform duration-200">
                <IOIcon03 />
              </div>
              <div className="transform hover:scale-110 transition-transform duration-200">
                <IOIcon04 />
              </div>
              <div className="transform hover:scale-110 transition-transform duration-200">
                <IOIcon05 />
              </div>
            </div>
            
            <div className="status-badge mt-3 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-medium rounded-full shadow-lg shadow-green-500/20 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              Functional and Deployed
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(IONode);
