import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Users,
  UserCheck,
  UserX,
  UserRound,
} from "lucide-react";

import MemberTable from "../components/members/MemberTable";
import MemberForm from "../components/members/MemberForm";
import MemberDetails from "../components/members/MemberDetails";
import EditMemberForm from "../components/members/EditMemberForm";

import { members as initialMembers } from "../data/members";
import type { Member } from "../types";

const Members = () => {
  // =========================================
  // MEMBER DATA
  // =========================================

  const [memberList, setMemberList] = useState<Member[]>(() => {
    const storedMembers = localStorage.getItem("gym_members");

    if (storedMembers) {
      try {
        return JSON.parse(storedMembers) as Member[];
      } catch {
        return initialMembers;
      }
    }

    return initialMembers;
  });

  // =========================================
  // SAVE MEMBERS TO LOCAL STORAGE
  // =========================================

  useEffect(() => {
    localStorage.setItem(
      "gym_members",
      JSON.stringify(memberList)
    );
  }, [memberList]);

  // =========================================
  // UI STATE
  // =========================================

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "All" | "Active" | "Expired"
  >("All");

  const [showForm, setShowForm] = useState(false);

  const [selectedMember, setSelectedMember] =
    useState<Member | null>(null);

  const [editingMember, setEditingMember] =
    useState<Member | null>(null);

  // =========================================
  // FILTER MEMBERS
  // =========================================

  const filteredMembers = useMemo(() => {
    return memberList.filter((member) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        member.name.toLowerCase().includes(searchValue) ||
        member.email.toLowerCase().includes(searchValue) ||
        member.phone.toLowerCase().includes(searchValue);

      const matchesFilter =
        filter === "All" ||
        member.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [memberList, search, filter]);

  // =========================================
  // STATISTICS
  // =========================================

  const activeMembers = memberList.filter(
    (member) => member.status === "Active"
  ).length;

  const expiredMembers = memberList.filter(
    (member) => member.status === "Expired"
  ).length;

  // =========================================
  // ADD MEMBER
  // =========================================

  const handleAddMember = (newMember: Member) => {
    setMemberList((current) => [
      newMember,
      ...current,
    ]);

    setShowForm(false);
  };

  // =========================================
  // EDIT MEMBER
  // =========================================

  const handleEditMember = (updatedMember: Member) => {
    setMemberList((current) =>
      current.map((member) =>
        member.id === updatedMember.id
          ? updatedMember
          : member
      )
    );

    setEditingMember(null);
  };

  // =========================================
  // DELETE MEMBER
  // =========================================

  const handleDelete = (id: number) => {
    const member = memberList.find(
      (member) => member.id === id
    );

    if (!member) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${member.name}?`
    );

    if (!confirmed) return;

    setMemberList((current) =>
      current.filter((member) => member.id !== id)
    );

    if (selectedMember?.id === id) {
      setSelectedMember(null);
    }

    if (editingMember?.id === id) {
      setEditingMember(null);
    }
  };

  // =========================================
  // PAGE
  // =========================================

  return (
    <div className="space-y-8">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

        <div>
          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
              <UserRound
                size={21}
                className="text-blue-400"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Members
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage your gym members and their memberships.
              </p>
            </div>

          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-500"
        >
          <Plus size={18} />
          Add Member
        </button>

      </div>

      {/* =========================================
          STATISTICS
      ========================================= */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

        {/* TOTAL */}

        <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0D131D] p-5 transition hover:-translate-y-1 hover:border-blue-500/20">

          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-500/5 blur-3xl" />

          <div className="relative flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
              <Users
                size={22}
                className="text-blue-400"
              />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Total Members
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                {memberList.length}
              </p>
            </div>

          </div>

          <div className="mt-5 h-px bg-white/5" />

          <p className="mt-3 text-xs text-slate-600">
            All registered members
          </p>

        </div>

        {/* ACTIVE */}

        <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0D131D] p-5 transition hover:-translate-y-1 hover:border-emerald-500/20">

          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-500/5 blur-3xl" />

          <div className="relative flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
              <UserCheck
                size={22}
                className="text-emerald-400"
              />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Active Members
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                {activeMembers}
              </p>
            </div>

          </div>

          <div className="mt-5 h-px bg-white/5" />

          <p className="mt-3 text-xs text-slate-600">
            Currently active memberships
          </p>

        </div>

        {/* EXPIRED */}

        <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0D131D] p-5 transition hover:-translate-y-1 hover:border-red-500/20">

          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-red-500/5 blur-3xl" />

          <div className="relative flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
              <UserX
                size={22}
                className="text-red-400"
              />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Expired Members
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                {expiredMembers}
              </p>
            </div>

          </div>

          <div className="mt-5 h-px bg-white/5" />

          <p className="mt-3 text-xs text-slate-600">
            Memberships requiring renewal
          </p>

        </div>

      </div>

      {/* =========================================
          SEARCH + FILTER
      ========================================= */}

      <div className="rounded-2xl border border-white/5 bg-[#0D131D] p-4">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* SEARCH */}

          <div className="flex w-full items-center gap-3 rounded-xl border border-white/5 bg-[#111925] px-4 py-3 lg:max-w-md">

            <Search
              size={18}
              className="shrink-0 text-slate-500"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search members..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
            />

          </div>

          {/* FILTER */}

          <div className="flex items-center gap-2">

            {(
              ["All", "Active", "Expired"] as const
            ).map((item) => (

              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  filter === item
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/10"
                    : "bg-white/5 text-slate-500 hover:bg-white/10 hover:text-slate-300"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

        </div>

        {/* RESULTS */}

        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">

          <p className="text-xs text-slate-600">
            Showing{" "}
            <span className="font-medium text-slate-400">
              {filteredMembers.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-400">
              {memberList.length}
            </span>{" "}
            members
          </p>

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-xs text-blue-400 hover:text-blue-300"
            >
              Clear search
            </button>
          )}

        </div>

      </div>

      {/* =========================================
          MEMBER TABLE
      ========================================= */}

      <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#0D131D]">

        <MemberTable
          members={filteredMembers}
          onDelete={handleDelete}
          onView={(member) => {
            setSelectedMember(member);
          }}
          onEdit={(member) => {
            setEditingMember(member);
          }}
        />

      </div>

      {/* =========================================
          ADD MEMBER MODAL
      ========================================= */}

      {showForm && (
        <MemberForm
          onClose={() => setShowForm(false)}
          onSave={handleAddMember}
        />
      )}

      {/* =========================================
          VIEW MEMBER
      ========================================= */}

      {selectedMember && (
        <MemberDetails
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}

      {/* =========================================
          EDIT MEMBER
      ========================================= */}

      {editingMember && (
        <EditMemberForm
          member={editingMember}
          onClose={() => setEditingMember(null)}
          onSave={handleEditMember}
        />
      )}

    </div>
  );
};

export default Members;