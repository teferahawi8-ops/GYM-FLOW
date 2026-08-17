import {
  X,
  Mail,
  Phone,
  CalendarDays,
  CreditCard,
  User,
} from "lucide-react";

import type { Member } from "../../types";

interface MemberDetailsProps {
  member: Member;
  onClose: () => void;
}

const MemberDetails = ({
  member,
  onClose,
}: MemberDetailsProps) => {
  return (
    <div
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
  style={{
    backgroundImage:
      "linear-gradient(rgba(5,10,18,0.55), rgba(5,10,18,0.7)), url('/gym-background.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
      {/* Modal */}
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0D131D] shadow-2xl shadow-black/40">

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">

          <div>
            <h2 className="text-lg font-semibold text-white">
              Member Details
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              View member information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-white"
          >
            <X size={19} />
          </button>

        </div>

        {/* =========================================
            PROFILE
        ========================================= */}

        <div className="px-6 pt-6">

          <div className="flex items-center gap-4">

            {/* Avatar */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-xl font-bold text-blue-400 ring-1 ring-white/10">
              {member.avatar}
            </div>

            <div>

              <h3 className="text-xl font-semibold text-white">
                {member.name}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Member ID #{member.id.toString().padStart(4, "0")}
              </p>

            </div>

          </div>

        </div>

        {/* =========================================
            STATUS
        ========================================= */}

        <div className="px-6 pt-5">

          <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4">

            <div>
              <p className="text-xs text-slate-600">
                Membership Status
              </p>

              <div className="mt-2 flex items-center gap-2">

                <span
                  className={`h-2 w-2 rounded-full ${
                    member.status === "Active"
                      ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                      : "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.4)]"
                  }`}
                />

                <span
                  className={`text-sm font-medium ${
                    member.status === "Active"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {member.status}
                </span>

              </div>
            </div>

            <div
              className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                member.membership === "Premium"
                  ? "bg-violet-500/10 text-violet-400"
                  : member.membership === "Standard"
                  ? "bg-blue-500/10 text-blue-400"
                  : "bg-slate-500/10 text-slate-400"
              }`}
            >
              {member.membership}
            </div>

          </div>

        </div>

        {/* =========================================
            INFORMATION
        ========================================= */}

        <div className="grid grid-cols-1 gap-3 px-6 py-5 sm:grid-cols-2">

          {/* Email */}
          <div className="rounded-xl border border-white/5 bg-[#111925] p-4">

            <div className="flex items-center gap-2">

              <Mail
                size={16}
                className="text-blue-400"
              />

              <span className="text-xs text-slate-600">
                Email
              </span>

            </div>

            <p className="mt-2 break-all text-sm text-slate-300">
              {member.email}
            </p>

          </div>

          {/* Phone */}
          <div className="rounded-xl border border-white/5 bg-[#111925] p-4">

            <div className="flex items-center gap-2">

              <Phone
                size={16}
                className="text-blue-400"
              />

              <span className="text-xs text-slate-600">
                Phone
              </span>

            </div>

            <p className="mt-2 text-sm text-slate-300">
              {member.phone}
            </p>

          </div>

          {/* Join Date */}
          <div className="rounded-xl border border-white/5 bg-[#111925] p-4">

            <div className="flex items-center gap-2">

              <CalendarDays
                size={16}
                className="text-blue-400"
              />

              <span className="text-xs text-slate-600">
                Join Date
              </span>

            </div>

            <p className="mt-2 text-sm text-slate-300">
              {member.joinDate}
            </p>

          </div>

          {/* Expiry Date */}
          <div className="rounded-xl border border-white/5 bg-[#111925] p-4">

            <div className="flex items-center gap-2">

              <CalendarDays
                size={16}
                className="text-blue-400"
              />

              <span className="text-xs text-slate-600">
                Expiry Date
              </span>

            </div>

            <p className="mt-2 text-sm text-slate-300">
              {member.expiryDate}
            </p>

          </div>

        </div>

        {/* =========================================
            FOOTER
        ========================================= */}

        <div className="border-t border-white/5 px-6 py-4">

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
};

export default MemberDetails;