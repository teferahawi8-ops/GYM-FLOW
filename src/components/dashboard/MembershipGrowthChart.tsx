import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    month: "Dec '25",
    members: 780,
  },
  {
    month: "Jan '26",
    members: 950,
  },
  {
    month: "Feb '26",
    members: 940,
  },
  {
    month: "Mar '26",
    members: 1080,
  },
  {
    month: "Apr '26",
    members: 1200,
  },
  {
    month: "May '26",
    members: 1280,
  },
];

const MembershipGrowthChart = () => {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#0D131D] p-5">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-base font-semibold text-white">
            Membership Growth
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Total members over the last 6 months
          </p>
        </div>

        <select
          className="rounded-lg border border-white/5 bg-[#111925] px-3 py-2 text-xs text-slate-400 outline-none"
          defaultValue="6"
        >
          <option value="6">Last 6 Months</option>
          <option value="12">Last 12 Months</option>
        </select>

      </div>

      {/* Chart */}
      <div className="h-[300px] w-full">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >

            {/* Grid */}
            <CartesianGrid
              stroke="rgba(148,163,184,0.08)"
              vertical={false}
            />

            {/* X Axis */}
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

            {/* Y Axis */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 11,
              }}
              domain={[400, 1400]}
              ticks={[
                400,
                600,
                800,
                1000,
                1200,
                1400,
              ]}
            />

            {/* Tooltip */}
            <Tooltip
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
              itemStyle={{
                color: "#60a5fa",
              }}
              formatter={(value) => [
                `${value} Members`,
                "Total",
              ]}
            />

            {/* Gradient */}
            <defs>
              <linearGradient
                id="membershipGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#3b82f6"
                  stopOpacity={0.35}
                />

                <stop
                  offset="100%"
                  stopColor="#3b82f6"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            {/* Area */}
            <Area
              type="monotone"
              dataKey="members"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#membershipGradient)"
              dot={{
                r: 4,
                fill: "#0D131D",
                stroke: "#60a5fa",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 7,
                fill: "#3b82f6",
                stroke: "#bfdbfe",
                strokeWidth: 3,
              }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default MembershipGrowthChart;