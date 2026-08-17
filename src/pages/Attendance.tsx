import { useMemo, useState } from "react";
import {
  Search,
  UserCheck,
  UserX,
  Clock,
  Users,
  CalendarDays,
  LogIn,
  LogOut,
  X,
} from "lucide-react";

interface Member {
  id: number | string;
  name?: string;
  fullName?: string;
  email?: string;
  phone?: string;
}

interface AttendanceRecord {
  id: number;
  memberId: number | string;
  memberName: string;
  date: string;
  checkIn: string;
  checkOut: string | null;
  status: "Present" | "Checked Out";
}

const getToday = () => {
  return new Date().toISOString().split("T")[0];
};

const getCurrentTime = () => {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Attendance = () => {
  const [members] = useState<Member[]>(() => {
    try {
      const savedMembers = localStorage.getItem("gym_members");

      if (!savedMembers) {
        return [];
      }

      return JSON.parse(savedMembers);
    } catch {
      return [];
    }
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    try {
      const savedAttendance =
        localStorage.getItem("gym_attendance");

      if (!savedAttendance) {
        return [];
      }

      return JSON.parse(savedAttendance);
    } catch {
      return [];
    }
  });

  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [memberSearch, setMemberSearch] = useState("");

  const saveAttendance = (records: AttendanceRecord[]) => {
    setAttendance(records);

    localStorage.setItem(
      "gym_attendance",
      JSON.stringify(records)
    );
  };

  const getMemberName = (member: Member) => {
    return member.name || member.fullName || "Unknown Member";
  };

  const todayAttendance = useMemo(() => {
    return attendance.filter(
      (record) => record.date === selectedDate
    );
  }, [attendance, selectedDate]);

  const filteredAttendance = todayAttendance.filter((record) =>
    record.memberName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredMembers = members.filter((member) =>
    getMemberName(member)
      .toLowerCase()
      .includes(memberSearch.toLowerCase())
  );

  const checkedInCount = todayAttendance.filter(
    (record) => record.status === "Present"
  ).length;

  const checkedOutCount = todayAttendance.filter(
    (record) => record.status === "Checked Out"
  ).length;

  const checkInMember = (member: Member) => {
    const memberId = member.id;

    const alreadyCheckedIn = todayAttendance.some(
      (record) =>
        record.memberId === memberId &&
        record.status === "Present"
    );

    if (alreadyCheckedIn) {
      alert(`${getMemberName(member)} is already checked in.`);
      return;
    }

    const newRecord: AttendanceRecord = {
      id: Date.now(),
      memberId,
      memberName: getMemberName(member),
      date: getToday(),
      checkIn: getCurrentTime(),
      checkOut: null,
      status: "Present",
    };

    saveAttendance([...attendance, newRecord]);

    setShowCheckInModal(false);
    setMemberSearch("");
    setSelectedDate(getToday());
  };

  const checkOutMember = (recordId: number) => {
    const updatedAttendance = attendance.map((record) => {
      if (record.id === recordId) {
        return {
          ...record,
          checkOut: getCurrentTime(),
          status: "Checked Out" as const,
        };
      }

      return record;
    });

    saveAttendance(updatedAttendance);
  };

  const deleteAttendance = (recordId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this attendance record?"
    );

    if (!confirmed) return;

    const updatedAttendance = attendance.filter(
      (record) => record.id !== recordId
    );

    saveAttendance(updatedAttendance);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <p className="text-sm font-medium text-violet-600">
            Gym Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Attendance
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Track member check-ins and check-outs.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCheckInModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
        >
          <LogIn size={19} />
          Check In Member
        </button>

      </div>

      {/* Statistics */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">

        {/* Total */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Today's Attendance
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {todayAttendance.length}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Users size={21} />
            </div>

          </div>
        </div>

        {/* Present */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Currently Inside
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {checkedInCount}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <UserCheck size={21} />
            </div>

          </div>
        </div>

        {/* Checked out */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Checked Out
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {checkedOutCount}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <UserX size={21} />
            </div>

          </div>
        </div>

      </div>

      {/* Filters */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="flex flex-col gap-4 md:flex-row">

          {/* Search */}
          <div className="relative flex-1">

            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search member..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />

          </div>

          {/* Date */}
          <div className="relative">

            <CalendarDays
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="date"
              value={selectedDate}
              onChange={(e) =>
                setSelectedDate(e.target.value)
              }
              className="rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />

          </div>

        </div>

      </div>

      {/* Attendance Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 px-6 py-5">

          <h2 className="font-semibold text-slate-900">
            Attendance Records
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {selectedDate === getToday()
              ? "Today's member activity"
              : `Attendance for ${selectedDate}`}
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Member
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Check In
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Check Out
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredAttendance.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >

                  {/* Member */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-600">
                        {record.memberName
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {record.memberName}
                        </p>

                        <p className="text-xs text-slate-400">
                          Member ID: {record.memberId}
                        </p>
                      </div>

                    </div>

                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {record.date}
                  </td>

                  {/* Check In */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Clock size={16} className="text-green-500" />
                      {record.checkIn}
                    </div>

                  </td>

                  {/* Check Out */}
                  <td className="px-6 py-4">

                    {record.checkOut ? (
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <LogOut
                          size={16}
                          className="text-slate-400"
                        />
                        {record.checkOut}
                      </div>
                    ) : (
                      <span className="text-sm text-slate-400">
                        —
                      </span>
                    )}

                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                        record.status === "Present"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {record.status === "Present" ? (
                        <UserCheck size={13} />
                      ) : (
                        <UserX size={13} />
                      )}

                      {record.status}
                    </span>

                  </td>

                  {/* Action */}
                  <td className="px-6 py-4 text-right">

                    {record.status === "Present" ? (
                      <button
                        type="button"
                        onClick={() =>
                          checkOutMember(record.id)
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                      >
                        <LogOut size={14} />
                        Check Out
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          deleteAttendance(record.id)
                        }
                        className="rounded-lg px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50"
                      >
                        Remove
                      </button>
                    )}

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {/* Empty State */}
        {filteredAttendance.length === 0 && (
          <div className="px-6 py-16 text-center">

            <UserCheck
              size={42}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No attendance records
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              No members have checked in on this date.
            </p>

            <button
              type="button"
              onClick={() => setShowCheckInModal(true)}
              className="mt-5 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
            >
              Check In Member
            </button>

          </div>
        )}

      </div>

      {/* Check In Modal */}
      {showCheckInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Check In Member
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Select a member to record their attendance.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowCheckInModal(false);
                  setMemberSearch("");
                }}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>

            </div>

            <div className="p-6">

              {/* Member Search */}
              <div className="relative">

                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search member..."
                  value={memberSearch}
                  onChange={(e) =>
                    setMemberSearch(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />

              </div>

              {/* Members */}
              <div className="mt-4 max-h-80 space-y-2 overflow-y-auto">

                {filteredMembers.map((member) => {

                  const alreadyInside = todayAttendance.some(
                    (record) =>
                      record.memberId === member.id &&
                      record.status === "Present"
                  );

                  return (
                    <button
                      key={member.id}
                      type="button"
                      disabled={alreadyInside}
                      onClick={() =>
                        checkInMember(member)
                      }
                      className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                        alreadyInside
                          ? "cursor-not-allowed border-slate-100 bg-slate-50 opacity-50"
                          : "border-slate-200 hover:border-violet-300 hover:bg-violet-50"
                      }`}
                    >

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-600">
                          {getMemberName(member)
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {getMemberName(member)}
                          </p>

                          <p className="text-xs text-slate-400">
                            {member.email ||
                              member.phone ||
                              "Gym Member"}
                          </p>
                        </div>

                      </div>

                      {alreadyInside ? (
                        <span className="text-xs font-semibold text-green-600">
                          Checked In
                        </span>
                      ) : (
                        <span className="rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold text-white">
                          Check In
                        </span>
                      )}

                    </button>
                  );
                })}

                {filteredMembers.length === 0 && (
                  <div className="py-10 text-center">

                    <Users
                      size={36}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-3 text-sm font-medium text-slate-700">
                      No members found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Add members from the Members page first.
                    </p>

                  </div>
                )}

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Attendance;