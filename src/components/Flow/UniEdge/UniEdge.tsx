import { BaseEdge, EdgeLabelRenderer, EdgeProps, getStraightPath } from "@xyflow/react";

interface EdgeData {
  label?: string;
  uniType?: string;
}

export function UniEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
  id,
  labelStyle,
}: EdgeProps & { data?: EdgeData }) {
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          strokeWidth: 2,
          stroke: "#4ade80",
          ...style,
        }}
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
            className="px-2 py-1 rounded-md bg-slate-800/90 backdrop-blur-sm border border-slate-700 shadow-lg text-sm text-green-400 font-medium hover:bg-slate-700 transition-colors"
          >
            {data.label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
