import React from "react";
import { IconCaretDownFilled, IconCaretUpFilled } from "@tabler/icons-react";
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath } from "@xyflow/react";

interface EdgeData {
  label?: string;
}

export function BiEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style = {},
  markerEnd,
  labelStyle,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: 0.4,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          strokeWidth: 2.5,
          stroke: "#8b5cf6",
          strokeDasharray: "5,5",
          ...style,
        }}
        markerEnd={markerEnd}
        interactionWidth={20}
      />
      
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              fontSize: 12,
              pointerEvents: "all",
              ...labelStyle,
            }}
            className="px-3 py-2 max-w-[220px] rounded-lg bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 shadow-lg text-xs text-indigo-300 font-medium text-center hover:bg-indigo-500/30 transition-colors"
          >
            {data.label}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-indigo-500/20 border border-indigo-400/30 rotate-45"></div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
