import { Handle, Position } from "@xyflow/react";
import { memo } from "react";
import DocumentIcon01 from "public/icons/flowchard-document-01.svg";
import DocumentIcon02 from "public/icons/flowchard-document-02.svg";

function DocumentNode({ data }: { data: { label: string } }) {
  return (
    <>
      <div className="document-node group transition-all duration-300 hover:scale-105">
        <Handle
          type="source"
          position={Position.Right}
          id="source-right"
          className="w-3 h-3 bg-purple-400"
        />

        <div className="flex flex-col items-center">
          <div className="w-[180px] p-4 rounded-lg border-2 border-purple-400/30 bg-slate-800/50 backdrop-blur-sm shadow-lg flex flex-col items-center gap-4 transition-all group-hover:border-purple-400/50">
            {data.label === "Jira Tickets" ? (
              <>
                <DocumentIcon01 className="w-16 h-16" />
                <div className="document-label px-4 py-2 bg-purple-500/20 rounded-lg text-center">
                  <span className="text-sm font-medium text-purple-400">{data.label}</span>
                </div>
                <div className="text-xs text-slate-400 text-center">Task management and project tracking</div>
              </>
            ) : (
              <>
                <DocumentIcon02 className="w-16 h-16" />
                <div className="document-label px-4 py-2 bg-purple-500/20 rounded-lg text-center">
                  <span className="text-sm font-medium text-purple-400">{data.label}</span>
                </div>
                <div className="text-xs text-slate-400 text-center">Source code repository</div>
                <div className="w-full flex justify-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gradient-to-r from-blue-500 to-teal-400 text-white">
                    <svg className="mr-1.5 h-2 w-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3" />
                    </svg>
                    Active Repository
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(DocumentNode);
