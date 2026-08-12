import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 18500 },
  { month: "Feb", revenue: 21200 },
  { month: "Mar", revenue: 19800 },
  { month: "Apr", revenue: 23100 },
  { month: "May", revenue: 24850 },
  { month: "Jun", revenue: 26500 },
  { month: "Jul", revenue: 25200 },
  { month: "Aug", revenue: 28900 },
  { month: "Sep", revenue: 27400 },
  { month: "Oct", revenue: 31200 },
  { month: "Nov", revenue: 29800 },
  { month: "Dec", revenue: 33500 },
];

const RevenueOverviewChart = () => {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#0D131D] p-6">

      {/* Header */}
      <div className="flex items-start justify-between">

        <div>
          <h2 className="text-base font-semibold text-white">
            Revenue Overview
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Monthly revenue performance
          </p>
        </div>

        <select
          defaultValue="2026"
          className="rounded-lg border border-white/5 bg-[#111925] px-3 py-2 text-xs text-slate-400 outline-none"
        >
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>

      </div>

      {/* Summary */}
      <div className="mt-5 flex items-end gap-3">

        <h3 className="text-2xl font-bold text-white">
          $24,850
        </h3>

        <span className="mb-1 rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
          +15.4%
        </span>

      </div>

      <p className="mt-1 text-xs text-slate-600">
        Current monthly revenue
      </p>

      {/* Chart */}
      <div className="mt-7 h-[270px] w-full">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={revenueData}
            margin={{
              top: 10,
              right: 5,
              left: -10,
              bottom: 0,
            }}
          >

            <CartesianGrid
              stroke="rgba(148,163,184,0.08)"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 11,
              }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 11,
              }}
              tickFormatter={(value) =>
                `$${value / 1000}k`
              }
            />

            <Tooltip
              cursor={{
                fill: "rgba(59,130,246,0.05)",
              }}
              contentStyle={{
                backgroundColor: "#111925",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px",
                color: "#fff",
              }}
              labelStyle={{
                color: "#94a3b8",
                marginBottom: "4px",
              }}
              formatter={(value) => [
                `$${Number(value).toLocaleString()}`,
                "Revenue",
              ]}
            />

            <Bar
              dataKey="revenue"
              fill="#6366f1"
              radius={[6, 6, 0, 0]}
              maxBarSize={32}
              animationDuration={900}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default RevenueOverviewChart;