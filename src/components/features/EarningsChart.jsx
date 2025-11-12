import { useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatPrice } from '../../utils/helpers';

/**
 * Simple earnings chart component with bar visualization
 * Shows monthly earnings trend
 */
export default function EarningsChart({ experiences = [] }) {
  // Calculate monthly earnings
  const monthlyData = useMemo(() => {
    const months = [];
    const currentDate = new Date();

    // Get last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthName = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();

      // Calculate earnings for this month
      const monthEarnings = experiences
        .filter((exp) => {
          const expDate = new Date(exp.date);
          return (
            expDate.getMonth() === date.getMonth() &&
            expDate.getFullYear() === date.getFullYear()
          );
        })
        .reduce((sum, exp) => sum + (exp.price || 0) * (exp.bookedSpots || 0), 0);

      months.push({
        label: monthName,
        value: monthEarnings,
        fullDate: `${monthName} ${year}`,
      });
    }

    return months;
  }, [experiences]);

  const maxValue = Math.max(...monthlyData.map((m) => m.value), 1);
  const totalEarnings = monthlyData.reduce((sum, m) => sum + m.value, 0);
  const avgEarnings = totalEarnings / monthlyData.length;

  // Calculate trend (comparing last month to previous month)
  const lastMonth = monthlyData[monthlyData.length - 1]?.value || 0;
  const previousMonth = monthlyData[monthlyData.length - 2]?.value || 0;
  const trendPercentage =
    previousMonth === 0
      ? lastMonth > 0
        ? 100
        : 0
      : ((lastMonth - previousMonth) / previousMonth) * 100;
  const isPositiveTrend = trendPercentage >= 0;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">Total Earnings (6 months)</p>
          <p className="text-2xl font-bold text-gray-900">{formatPrice(totalEarnings)}</p>
          <p className="text-xs text-gray-500 mt-1">
            Average: {formatPrice(avgEarnings)} / month
          </p>
        </div>
        <div
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
            isPositiveTrend
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {isPositiveTrend ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          {Math.abs(trendPercentage).toFixed(1)}%
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-48">
        <div className="absolute inset-0 flex items-end justify-between gap-2">
          {monthlyData.map((month, index) => {
            const height = maxValue === 0 ? 0 : (month.value / maxValue) * 100;

            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                {/* Bar */}
                <div className="w-full flex flex-col justify-end h-40 group relative">
                  <div
                    className="w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-lg transition-all hover:from-primary-600 hover:to-primary-500 cursor-pointer"
                    style={{ height: `${height}%`, minHeight: height > 0 ? '4px' : '0' }}
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                        <p className="font-semibold">{month.fullDate}</p>
                        <p className="text-gray-300">{formatPrice(month.value)}</p>
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 -mt-1"></div>
                    </div>
                  </div>
                </div>

                {/* Label */}
                <span className="text-xs text-gray-600 font-medium">{month.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary-500 rounded"></div>
          <span>Monthly Revenue</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Example usage:
 *
 * <EarningsChart experiences={allExperiences} />
 */
