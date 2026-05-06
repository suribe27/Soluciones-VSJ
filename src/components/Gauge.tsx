interface GaugeProps {
  score: number;
  label?: string;
  size?: number;
}

export default function Gauge({ score, label = 'Riesgo Medio', size = 192 }: GaugeProps) {
  // SVG Path calculations for a semicircle
  const radius = 80;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size / 2 }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
          className="transform -rotate-180"
          style={{ originX: '50%', originY: '50%' }}
        >
          {/* Background Track */}
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="none"
            stroke="#dff4ff"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeLinecap="round"
          />
          {/* Progress Track */}
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="none"
            stroke={score < 30 ? '#4ade80' : score < 70 ? '#facc15' : '#fb5151'}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <span className="text-5xl font-extrabold text-on-surface tracking-tighter">{score}</span>
          <span className="text-[10px] text-on-surface/40 font-bold -mt-1 tracking-widest uppercase">DE 100</span>
        </div>
      </div>
      
      <div className={`mt-6 inline-flex items-center gap-2 px-6 py-2 rounded-full font-bold text-xs shadow-sm bg-yellow-50 text-yellow-700`}>
        <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
        {label}
      </div>
    </div>
  );
}
