
import {
  CalendarDays,
  Mail,
  Phone,
  X,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Member Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View member information and membership details.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={21} />
          </button>
        </div>

        {/* Profile */}
        <div className="p-6">

          <div className="flex flex-col items-center gap-4 rounded-2xl bg-slate-50 p-6 sm:flex-row">

            {/* Avatar */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-violet-100 text-2xl font-bold text-violet-600">
              {member.avatar}
            </div>

            {/* Name */}
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold text-slate-900">
                {member.name}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Gym Member
              </p>

              <span
                className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                  member.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    member.status === "Active"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                />

                {member.status}
              </span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Contact Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <Mail size={19} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Email
                  </p>

                  <p className="text-sm font-medium text-slate-700">
                    {member.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <Phone size={19} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Phone
                  </p>

                  <p className="text-sm font-medium text-slate-700">
                    {member.phone}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Membership */}
          <div className="mt-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Membership Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs text-slate-400">
                  Plan
                </p>

                <p className="mt-1 text-lg font-bold text-violet-600">
                  {member.membership}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-2">
                  <CalendarDays
                    size={15}
                    className="text-slate-400"
                  />

                  <p className="text-xs text-slate-400">
                    Join Date
                  </p>
                </div>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {member.joinDate}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-2">
                  <CalendarDays
                    size={15}
                    className="text-slate-400"
                  />

                  <p className="text-xs text-slate-400">
                    Expiry Date
                  </p>
                </div>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {member.expiryDate}
                </p>
              </div>

            </div>
          </div>

          {/* Close */}
          <div className="mt-6 flex justify-end border-t border-slate-200 pt-5">
            <button
              onClick={onClose}
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MemberDetails;

