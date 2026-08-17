import { useState } from "react";
import {
  X,
  UserPlus,
  Mail,
  Phone,
  CreditCard,
  CalendarDays,
} from "lucide-react";

import type { Member } from "../../types";

interface MemberFormProps {
  onClose: () => void;
  onSave: (member: Member) => void;
}

const MemberForm = ({
  onClose,
  onSave,
}: MemberFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    membership: "Basic" as Member["membership"],
    joinDate: "",
    expiryDate: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    // Remove error when user starts correcting the form
    if (error) {
      setError("");
    }
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // -----------------------------
    // Validation
    // -----------------------------
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.joinDate ||
      !formData.expiryDate
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (
      new Date(formData.expiryDate) <
      new Date(formData.joinDate)
    ) {
      setError(
        "Expiry date cannot be before the join date."
      );
      return;
    }

    // -----------------------------
    // Create avatar initials
    // -----------------------------
    const avatar = formData.name
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    // -----------------------------
    // Create new member
    // -----------------------------
    const newMember: Member = {
      id: Date.now(),

      name: formData.name.trim(),

      email: formData.email.trim(),

      phone: formData.phone.trim(),

      membership: formData.membership,

      status: "Active",

      joinDate: formData.joinDate,

      expiryDate: formData.expiryDate,

      avatar,
    };

    // Send member to Members.tsx
    onSave(newMember);
  };

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
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto overflow-hidden rounded-2xl border border-white/10 bg-[#0D131D] shadow-2xl shadow-black/40">

        {/* =========================
            HEADER
        ========================== */}
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
              <UserPlus
                size={21}
                className="text-blue-400"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Add New Member
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Add a new member to your gym.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-white"
          >
            <X size={19} />
          </button>

        </div>

        {/* =========================
            FORM
        ========================== */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-400">
              Full Name
            </label>

            <div className="relative">

              <UserPlus
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
              />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full rounded-xl border border-white/5 bg-[#111925] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
              />

            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Email */}
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-400">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full rounded-xl border border-white/5 bg-[#111925] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                />

              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-400">
                Phone
              </label>

              <div className="relative">

                <Phone
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+251 9XX XXX XXX"
                  className="w-full rounded-xl border border-white/5 bg-[#111925] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                />

              </div>
            </div>

          </div>

          {/* Membership */}
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-400">
              Membership Plan
            </label>

            <div className="relative">

              <CreditCard
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
              />

              <select
                name="membership"
                value={formData.membership}
                onChange={handleChange}
                className="w-full appearance-none rounded-xl border border-white/5 bg-[#111925] py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
              >
                <option value="Basic">Basic</option>

                <option value="Standard">
                  Standard
                </option>

                <option value="Premium">
                  Premium
                </option>
              </select>

            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Join Date */}
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-400">
                Join Date
              </label>

              <div className="relative">

                <CalendarDays
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                />

                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/5 bg-[#111925] py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                />

              </div>
            </div>

            {/* Expiry Date */}
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-400">
                Expiry Date
              </label>

              <div className="relative">

                <CalendarDays
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                />

                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/5 bg-[#111925] py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                />

              </div>
            </div>

          </div>

          {/* =========================
              BUTTONS
          ========================== */}
          <div className="flex justify-end gap-3 border-t border-white/5 pt-5">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/5 bg-white/[0.02] px-5 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-500"
            >
              Add Member
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default MemberForm;