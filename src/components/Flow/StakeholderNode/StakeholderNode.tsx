import { Handle, Position } from "@xyflow/react";
import { memo } from "react";
import DecisionIcon from "public/icons/flowchart-decision.svg";

function StakeholderNode({ data }: { data: { label: string } }) {
  return (
    <div className="stakeholder-node group transition-all duration-300 hover:scale-105">
      <Handle
        type="source"
        position={Position.Bottom}
        id="source-bot"
        className="w-3 h-3 bg-pink-400"
      />

      <div className="flex flex-col items-center">
        <div className="w-[220px] p-5 rounded-lg border-2 border-pink-400/30 bg-slate-800/50 backdrop-blur-sm shadow-lg flex flex-col items-center gap-4 transition-all group-hover:border-pink-400/50">
          <div className="badge px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-md">Decision Makers</div>
          
          <DecisionIcon className="w-16 h-16 text-pink-400" />
          
          <div className="stakeholder-label px-4 py-2 bg-pink-500/20 rounded-lg text-center">
            <span className="text-sm font-medium text-pink-400">{data.label}</span>
          </div>
          
          <div className="text-xs text-slate-400 text-center">
            Team members who need accurate documentation
          </div>

          <div className="flex -space-x-2 overflow-hidden p-1">
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-800"
              src="https://randomuser.me/api/portraits/women/60.jpg"
              alt="User"
            />
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-800"
              src="https://randomuser.me/api/portraits/men/12.jpg"
              alt="User"
            />
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-800"
              src="https://randomuser.me/api/portraits/women/82.jpg"
              alt="User"
            />
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 ring-2 ring-slate-800 text-xs font-medium text-white">
              +5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(StakeholderNode);
