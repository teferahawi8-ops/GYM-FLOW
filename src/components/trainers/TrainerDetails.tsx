
import {
  X,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  UserCheck,
} from "lucide-react";

import type { Trainer } from "../../types";

interface TrainerDetailsProps {
  trainer: Trainer;
  onClose: () => void;
}

const TrainerDetails = ({
  trainer,
  onClose,
}: TrainerDetailsProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">

      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* =========================================
            Header
        ========================================= */}
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-800 px-6 pb-16 pt-6">

          {/* Decorative circles */}
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />

          <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-white/5" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <X size={20} />
          </button>

          {/* Header content */}
          <div className="relative">

            <p className="text-sm font-medium text-violet-200">
              Trainer Profile
            </p>

            <h2 className="mt-1 text-2xl font-bold text-white">
              Trainer Details
            </h2>

            <p className="mt-1 text-sm text-violet-200">
              Complete trainer information
            </p>

          </div>

        </div>

        {/* =========================================
            Profile
        ========================================= */}
        <div className="relative px-6">

          <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end">

            {/* Avatar */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-violet-500 to-purple-700 text-2xl font-bold text-white shadow-xl">
              {trainer.avatar}
            </div>

            {/* Name */}
            <div className="pb-1">

              <h3 className="text-xl font-bold text-slate-900">
                {trainer.name}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {trainer.specialization}
              </p>

            </div>

            {/* Status */}
            <div className="sm:ml-auto sm:pb-2">

              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                  trainer.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >

                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    trainer.status === "Active"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                />

                {trainer.status}

              </span>

            </div>

          </div>

        </div>

        {/* =========================================
            Information
        ========================================= */}
        <div className="space-y-6 p-6">

          {/* Contact Information */}
          <div>

            <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-400">
              Contact Information
            </h4>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

              {/* Email */}
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                  <Mail size={18} />
                </div>

                <div className="min-w-0">

                  <p className="text-xs text-slate-400">
                    Email
                  </p>

                  <p className="truncate text-sm font-semibold text-slate-700">
                    {trainer.email}
                  </p>

                </div>

              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <Phone size={18} />
                </div>

                <div>

                  <p className="text-xs text-slate-400">
                    Phone
                  </p>

                  <p className="text-sm font-semibold text-slate-700">
                    {trainer.phone}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Trainer Information */}
          <div>

            <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-400">
              Trainer Information
            </h4>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

              {/* Specialization */}
              <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                  <Briefcase size={17} />
                </div>

                <p className="mt-3 text-xs text-slate-400">
                  Specialization
                </p>

                <p className="mt-1 text-sm font-bold text-slate-800">
                  {trainer.specialization}
                </p>

              </div>

              {/* Experience */}
              <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <UserCheck size={17} />
                </div>

                <p className="mt-3 text-xs text-slate-400">
                  Experience
                </p>

                <p className="mt-1 text-sm font-bold text-slate-800">
                  {trainer.experience}{" "}
                  {trainer.experience === 1
                    ? "Year"
                    : "Years"}
                </p>

              </div>

              {/* Join Date */}
              <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                  <Calendar size={17} />
                </div>

                <p className="mt-3 text-xs text-slate-400">
                  Join Date
                </p>

                <p className="mt-1 text-sm font-bold text-slate-800">
                  {trainer.joinDate}
                </p>

              </div>

            </div>

          </div>

          {/* =========================================
              Footer
          ========================================= */}
          <div className="flex justify-end border-t border-slate-200 pt-5">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              Close
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default TrainerDetails;

