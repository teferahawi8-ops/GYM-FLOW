import DashboardStats from "../components/dashboard/DashboardStats";
import MembershipGrowthChart from "../components/dashboard/MembershipGrowthChart";
import RevenueOverviewChart from "../components/dashboard/RevenueOverviewChart";

import {
  CalendarDays,
  Users,
  Clock,
  ArrowUpRight,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-8">

      {/* =========================================
          HEADER
      ========================================= */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back, Admin. Here's what's happening today.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-white/5 bg-[#0D131D] px-4 py-2.5 text-sm text-slate-400 transition hover:border-white/10 hover:text-white"
        >
          <CalendarDays size={17} />

          <span>May 19 – May 25, 2026</span>
        </button>

      </div>

      {/* =========================================
          STATISTICS
      ========================================= */}
      <DashboardStats />

      {/* =========================================
          MEMBERSHIP GROWTH + UPCOMING CLASSES
      ========================================= */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Membership Growth */}
        <div className="xl:col-span-2">
          <MembershipGrowthChart />
        </div>

        {/* Upcoming Classes */}
        <div className="rounded-2xl border border-white/5 bg-[#0D131D] p-6">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-lg font-semibold text-white">
                Upcoming Classes
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Today's schedule
              </p>
            </div>

            <button
              type="button"
              className="text-xs font-medium text-blue-400 hover:text-blue-300"
            >
              View all
            </button>

          </div>

          <div className="mt-6 space-y-3">

            {/* Class 1 */}
            <div className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-blue-500/20">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Clock
                  size={18}
                  className="text-blue-400"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">
                  Morning HIIT
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  08:00 AM · 18 Members
                </p>
              </div>

              <ArrowUpRight
                size={15}
                className="text-slate-600 group-hover:text-blue-400"
              />

            </div>

            {/* Class 2 */}
            <div className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-violet-500/20">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
                <Users
                  size={18}
                  className="text-violet-400"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">
                  Strength Training
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  10:30 AM · 12 Members
                </p>
              </div>

              <ArrowUpRight
                size={15}
                className="text-slate-600 group-hover:text-violet-400"
              />

            </div>

            {/* Class 3 */}
            <div className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-emerald-500/20">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <Clock
                  size={18}
                  className="text-emerald-400"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">
                  Yoga Flow
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  02:00 PM · 15 Members
                </p>
              </div>

              <ArrowUpRight
                size={15}
                className="text-slate-600 group-hover:text-emerald-400"
              />

            </div>

            {/* Class 4 */}
            <div className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-orange-500/20">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                <Users
                  size={18}
                  className="text-orange-400"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">
                  Personal Training
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  04:30 PM · 1 Member
                </p>
              </div>

              <ArrowUpRight
                size={15}
                className="text-slate-600 group-hover:text-orange-400"
              />

            </div>

          </div>

        </div>

      </div>

      {/* =========================================
          REVENUE + MEMBERSHIP
      ========================================= */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Revenue */}
        <div className="xl:col-span-2">
          <RevenueOverviewChart />
        </div>

        {/* Membership Overview */}
        <div className="rounded-2xl border border-white/5 bg-[#0D131D] p-6">

          <h2 className="text-lg font-semibold text-white">
            Membership Overview
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Current membership distribution
          </p>

          <div className="mt-8 space-y-6">

            {/* Premium */}
            <div>
              <div className="mb-2 flex items-center justify-between">

                <span className="text-sm font-medium text-slate-300">
                  Premium
                </span>

                <span className="text-xs text-slate-500">
                  45%
                </span>

              </div>

              <div className="h-2 rounded-full bg-white/5">
                <div className="h-2 w-[45%] rounded-full bg-violet-500" />
              </div>
            </div>

            {/* Standard */}
            <div>
              <div className="mb-2 flex items-center justify-between">

                <span className="text-sm font-medium text-slate-300">
                  Standard
                </span>

                <span className="text-xs text-slate-500">
                  35%
                </span>

              </div>

              <div className="h-2 rounded-full bg-white/5">
                <div className="h-2 w-[35%] rounded-full bg-blue-500" />
              </div>
            </div>

            {/* Basic */}
            <div>
              <div className="mb-2 flex items-center justify-between">

                <span className="text-sm font-medium text-slate-300">
                  Basic
                </span>

                <span className="text-xs text-slate-500">
                  20%
                </span>

              </div>

              <div className="h-2 rounded-full bg-white/5">
                <div className="h-2 w-[20%] rounded-full bg-emerald-500" />
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;