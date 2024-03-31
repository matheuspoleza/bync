export interface StepProgressProps {
  percentage: number;
}

export const StepProgress: React.FC<StepProgressProps> = ({ percentage }) => (
  <div
    style={{
      position: 'absolute',
      width: '100%',
      height: '5px',
      background: 'hsl(var(--muted-foreground))',
      borderRadius: '4px',
      top: '-1px',
      opacity: 0.5,
    }}
  >
    <div
      style={{
        background: 'green',
        width: `${percentage}%`,
        height: '100%',
      }}
    ></div>
  </div>
);
