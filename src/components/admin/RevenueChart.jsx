import { formatPrice } from '../../utils/helpers';

const CHART_H = 100;
const BAR_W = 28;
const GAP = 10;
const LABEL_H = 32;

export default function RevenueChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-sm text-gray-400">
        No revenue data
      </div>
    );
  }

  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);
  const totalW = data.length * (BAR_W + GAP) - GAP;

  return (
    <div className="overflow-x-auto">
      <svg
        width={totalW}
        height={CHART_H + LABEL_H}
        viewBox={`0 0 ${totalW} ${CHART_H + LABEL_H}`}
        className="min-w-full"
      >
        {data.map((d, i) => {
          const x = i * (BAR_W + GAP);
          const barH = Math.max((d.revenue / maxRevenue) * CHART_H, d.revenue > 0 ? 4 : 2);
          const y = CHART_H - barH;
          const hasValue = d.revenue > 0;

          return (
            <g key={`${d.label}-${i}`}>
              {/* bar */}
              <rect
                x={x}
                y={y}
                width={BAR_W}
                height={barH}
                rx={4}
                fill={hasValue ? '#FDD835' : '#E5E7EB'}
              />
              {/* value above bar */}
              {hasValue && (
                <text
                  x={x + BAR_W / 2}
                  y={y - 4}
                  textAnchor="middle"
                  fontSize={8}
                  fill="#6B7280"
                >
                  {formatPrice(d.revenue)}
                </text>
              )}
              {/* week label */}
              <text
                x={x + BAR_W / 2}
                y={CHART_H + 16}
                textAnchor="middle"
                fontSize={9}
                fill="#9CA3AF"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
