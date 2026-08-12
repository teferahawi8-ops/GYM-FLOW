import {
  Eye,
  Pencil,
  Trash2,
  Mail,
  Phone,
} from "lucide-react";

import type { Member } from "../../types";

interface MemberTableProps {
  members: Member[];
  onView: (member: Member) => void;
  onEdit: (member: Member) => void;
  onDelete: (id: number) => void;
}

const MemberTable = ({
  members,
  onView,
  onEdit,
  onDelete,
}: MemberTableProps) => {
  return (
    <div className="w-full">

      {/* =========================================
          TABLE HEADER
      ========================================= */}

      <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">

        <div>
          <h2 className="text-lg font-semibold text-white">
            Members
          </h2>

          <p className="mt-1 text-xs text-slate-600">
            Manage registered gym members
          </p>
        </div>

        <div className="rounded-lg bg-white/5 px-3 py-1.5">
          <span className="text-xs font-medium text-slate-400">
            {members.length} Members
          </span>
        </div>

      </div>

      {/* =========================================
          EMPTY STATE
      ========================================= */}

      {members.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">
            <Eye
              size={24}
              className="text-slate-600"
            />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-slate-300">
            No members found
          </h3>

          <p className="mt-1 max-w-sm text-xs text-slate-600">
            Try changing your search or filter to find
            the member you are looking for.
          </p>

        </div>
      ) : (

        /* =========================================
            DESKTOP TABLE
        ========================================= */

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">

                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                  Member
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                  Contact
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                  Membership
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                  Join Date
                </th>

                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-slate-600">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {members.map((member) => (

                <tr
                  key={member.id}
                  className="group border-b border-white/5 transition hover:bg-white/[0.025]"
                >

                  {/* =====================================
                      MEMBER
                  ====================================== */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      {/* Avatar */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-sm font-bold text-blue-400 ring-1 ring-white/5">
                        {member.avatar}
                      </div>

                      <div className="min-w-0">

                        <p className="truncate text-sm font-semibold text-white">
                          {member.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-600">
                          ID #{member.id.toString().padStart(4, "0")}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* =====================================
                      CONTACT
                  ====================================== */}

                  <td className="px-6 py-5">

                    <div className="space-y-1.5">

                      <div className="flex items-center gap-2">

                        <Mail
                          size={13}
                          className="text-slate-600"
                        />

                        <span className="text-xs text-slate-400">
                          {member.email}
                        </span>

                      </div>

                      <div className="flex items-center gap-2">

                        <Phone
                          size={13}
                          className="text-slate-600"
                        />

                        <span className="text-xs text-slate-500">
                          {member.phone}
                        </span>

                      </div>

                    </div>

                  </td>

                  {/* =====================================
                      MEMBERSHIP
                  ====================================== */}

                  <td className="px-6 py-5">

                    <span
                      className={`inline-flex rounded-lg px-3 py-1.5 text-xs font-medium ${
                        member.membership === "Premium"
                          ? "bg-violet-500/10 text-violet-400"
                          : member.membership === "Standard"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-slate-500/10 text-slate-400"
                      }`}
                    >
                      {member.membership}
                    </span>

                  </td>

                  {/* =====================================
                      STATUS
                  ====================================== */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-2">

                      <span
                        className={`h-2 w-2 rounded-full ${
                          member.status === "Active"
                            ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                            : "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.4)]"
                        }`}
                      />

                      <span
                        className={`text-xs font-medium ${
                          member.status === "Active"
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {member.status}
                      </span>

                    </div>

                  </td>

                  {/* =====================================
                      JOIN DATE
                  ====================================== */}

                  <td className="px-6 py-5">

                    <div>

                      <p className="text-sm text-slate-300">
                        {member.joinDate}
                      </p>

                      <p className="mt-1 text-xs text-slate-600">
                        Expires {member.expiryDate}
                      </p>

                    </div>

                  </td>

                  {/* =====================================
                      ACTIONS
                  ====================================== */}

                  <td className="px-6 py-5">

                    <div className="flex items-center justify-end gap-1">

                      {/* View */}
                      <button
                        type="button"
                        onClick={() => onView(member)}
                        title="View member"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-blue-500/10 hover:text-blue-400"
                      >
                        <Eye size={17} />
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => onEdit(member)}
                        title="Edit member"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-violet-500/10 hover:text-violet-400"
                      >
                        <Pencil size={17} />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => onDelete(member.id)}
                        title="Delete member"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
};

export default MemberTable;