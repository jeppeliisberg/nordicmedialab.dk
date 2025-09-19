import React from 'react';

export interface CurvedDividerProps {
  /** Fill color of the divider */
  backgroundColor?: string;
  /** Height of the rectangular section in pixels (excludes curve depth) */
  height?: number;
  /** Depth of the concave curve in pixels */
  amplitude?: number;
  /** If true, flips the curve (concave curve becomes convex) */
  flip?: boolean;
}

/**
 * A full-width, curved SVG divider for React SPAs.
 * Renders a concave (or flipped convex) arc atop a rectangle.
 */
const CurvedDivider: React.FC<CurvedDividerProps> = ({
  backgroundColor = '#38a169',
  height = 100,
  amplitude = 50,
  flip = false,
}) => {
  // Total SVG height = rectangle height + curve depth
  const totalHeight = height + amplitude;
  // Starting and ending Y coordinate of the curve line
  const startY = flip ? amplitude : 0;
  const controlY = flip ? 0 : amplitude;
  const bottomY = totalHeight;

  return (
    <svg
      viewBox={`0 0 1000 ${totalHeight}`}
      preserveAspectRatio="none"
      className='-mt-24 -mb-10'
      style={{
        display: 'block',
        width: '100%',
        height: `${totalHeight}px`,  // ensures correct rendered height
        transform: flip ? 'rotate(180deg)' : undefined,
      }}
    >
      <path
        d={
          `M0,${startY} 
           C250,${controlY} 750,${controlY} 1000,${startY} 
           L1000,${bottomY} L0,${bottomY} Z`
        }
        fill={backgroundColor}
      />
    </svg>
  );
};

export default CurvedDivider;
