import {
  Users,
  UserCheck,
  DollarSign,
  Dumbbell,
  ArrowUpRight,
} from "lucide-react";

const DashboardStats = () => {
  const stats = [
    {
      title: "Total Members",
      value: "1,248",
      change: "+8.5%",
      description: "vs last month",
      icon: Users,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      title: "Active Members",
      value: "1,086",
      change: "+5.2%",
      description: "vs last month",
      icon: UserCheck,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      title: "Monthly Revenue",
      value: "$24,680",
      change: "+12.4%",
      description: "vs last month",
      icon: DollarSign,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-400",
    },
    {
      title: "Total Trainers",
      value: "32",
      change: "+4.3%",
      description: "vs last month",
      icon: Dumbbell,
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0D131D] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-500/5"
          >

            {/* Background Glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/5 blur-3xl transition-all duration-300 group-hover:bg-blue-500/10" />

            {/* Top */}
            <div className="relative flex items-start justify-between">

              {/* Icon */}
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg}`}
              >
                <Icon
                  size={21}
                  strokeWidth={1.8}
                  className={stat.iconColor}
                />
              </div>

              {/* Growth */}
              <div className="flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2 py-1">
                <ArrowUpRight
                  size={13}
                  className="text-emerald-400"
                />

                <span className="text-xs font-semibold text-emerald-400">
                  {stat.change}
                </span>
              </div>

            </div>

            {/* Content */}
            <div className="relative mt-5">

              <p className="text-sm font-medium text-slate-500">
                {stat.title}
              </p>

              <h3 className="mt-1 text-3xl font-bold tracking-tight text-white">
                {stat.value}
              </h3>

              <p className="mt-2 text-xs text-slate-600">
                {stat.description}
              </p>

            </div>

            {/* Bottom */}
            <div className="mt-5 h-px w-full bg-white/5" />

            <div className="mt-3 flex items-center justify-between">

              <span className="text-[11px] text-slate-600">
                Updated today
              </span>

              <span className="text-[11px] font-medium text-blue-400 opacity-0 transition group-hover:opacity-100">
                View details →
              </span>

            </div>

          </div>
        );
      })}

    </div>
  );
};

export default DashboardStats;