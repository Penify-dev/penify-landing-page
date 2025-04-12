import { Handle, Position } from "@xyflow/react";
import { memo } from "react";
import DatabaseIcon from "public/icons/flowchard-database.svg";

function DatabaseNode({ data }: { data: { label: string } }) {
  return (
    <div className="database-node group transition-all duration-300 hover:scale-105">
      <Handle
        type="target"
        position={Position.Left}
        id="target-left"
        className="w-3 h-3 bg-teal-400"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="source-right"
        className="w-3 h-3 bg-teal-400"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="source-bot"
        className="w-3 h-3 bg-teal-400"
      />
      <Handle
        type="source"
        position={Position.Top}
        id="source-top"
        className="w-3 h-3 bg-teal-400"
      />

      <div className="flex flex-col items-center">
        <div className="w-[220px] p-5 rounded-lg border-2 border-teal-400/30 bg-slate-800/50 backdrop-blur-sm shadow-lg flex flex-col items-center gap-4 transition-all group-hover:border-teal-400/50 group-hover:shadow-teal-400/10">
          <div className="badge mb-1 px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-md">Central Repository</div>
          
          <DatabaseIcon className="w-16 h-16 text-teal-400 group-hover:animate-pulse" />
          
          <div className="database-label px-4 py-2 bg-teal-500/20 rounded-lg text-center">
            <span className="text-sm font-medium text-teal-400">{data.label}</span>
          </div>
          
          <div className="text-xs text-slate-400 text-center max-w-[180px]">
            Stores and organizes all documentation extracted from your codebase
          </div>
          
          <div className="w-full flex justify-center">
            <div className="stats flex gap-3 mt-1">
              <div className="stat flex flex-col items-center">
                <span className="value text-sm font-bold text-teal-400">100%</span>
                <span className="label text-[10px] text-slate-400">Uptime</span>
              </div>
              <div className="divider w-px h-8 bg-slate-600"></div>
              <div className="stat flex flex-col items-center">
                <span className="value text-sm font-bold text-teal-400">3ms</span>
                <span className="label text-[10px] text-slate-400">Response</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(DatabaseNode);
