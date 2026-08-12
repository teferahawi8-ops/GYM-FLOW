
import {
  Eye,
  Pencil,
  Trash2,
  Mail,
  Phone,
} from "lucide-react";

import type { Trainer } from "../../types";

interface TrainerTableProps {
  trainers: Trainer[];
  onView: (trainer: Trainer) => void;
  onEdit: (trainer: Trainer) => void;
  onDelete: (id: number) => void;
}

const TrainerTable = ({
  trainers,
  onView,
  onEdit,
  onDelete,
}: TrainerTableProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* =========================================
          Table Header
      ========================================= */}
      <div className="flex flex-col justify-between gap-2 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center">

        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Trainers
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage your gym trainers.
          </p>
        </div>

        <div className="rounded-lg bg-violet-50 px-3 py-1.5 text-sm font-medium text-violet-600">
          {trainers.length}{" "}
          {trainers.length === 1
            ? "Trainer"
            : "Trainers"}
        </div>

      </div>

      {/* =========================================
          Empty State
      ========================================= */}
      {trainers.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <Eye size={28} />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-slate-800">
            No trainers found
          </h3>

          <p className="mt-1 max-w-sm text-sm text-slate-500">
            Try changing your search or filter to find
            trainers.
          </p>

        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            {/* =========================================
                Table Head
            ========================================= */}
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Trainer
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Contact
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Specialization
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Experience
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>

              </tr>
            </thead>

            {/* =========================================
                Table Body
            ========================================= */}
            <tbody className="divide-y divide-slate-100">

              {trainers.map((trainer) => (
                <tr
                  key={trainer.id}
                  className="group transition hover:bg-violet-50/40"
                >

                  {/* Trainer */}
                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      {/* Avatar */}
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 text-sm font-bold text-white shadow-sm">

                        {trainer.avatar}

                      </div>

                      <div className="min-w-0">

                        <p className="truncate text-sm font-semibold text-slate-900">
                          {trainer.name}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          Trainer ID #{trainer.id}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Contact */}
                  <td className="px-6 py-5">

                    <div className="space-y-1.5">

                      <div className="flex items-center gap-2 text-xs text-slate-600">

                        <Mail
                          size={14}
                          className="text-slate-400"
                        />

                        <span className="max-w-[190px] truncate">
                          {trainer.email}
                        </span>

                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-600">

                        <Phone
                          size={14}
                          className="text-slate-400"
                        />

                        <span>
                          {trainer.phone}
                        </span>

                      </div>

                    </div>

                  </td>

                  {/* Specialization */}
                  <td className="px-6 py-5">

                    <span className="inline-flex rounded-lg bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
                      {trainer.specialization}
                    </span>

                  </td>

                  {/* Experience */}
                  <td className="px-6 py-5">

                    <p className="text-sm font-semibold text-slate-800">
                      {trainer.experience}{" "}
                      {trainer.experience === 1
                        ? "Year"
                        : "Years"}
                    </p>

                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">

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

                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">

                    <div className="flex justify-end gap-2">

                      {/* View */}
                      <button
                        type="button"
                        onClick={() =>
                          onView(trainer)
                        }
                        title="View trainer"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100 hover:text-blue-700"
                      >
                        <Eye size={17} />
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() =>
                          onEdit(trainer)
                        }
                        title="Edit trainer"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600 transition hover:bg-violet-100 hover:text-violet-700"
                      >
                        <Pencil size={17} />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() =>
                          onDelete(trainer.id)
                        }
                        title="Delete trainer"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100 hover:text-red-600"
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

export default TrainerTable;

