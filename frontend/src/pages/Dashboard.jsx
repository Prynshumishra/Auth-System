import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const INITIAL_USERS = [
  { id: 1, name: 'Michael Holz', avatar: 'MH', role: 'Admin', status: 'Active', dateCreated: '04/10/2013', color: 'from-blue-500 to-blue-600' },
  { id: 2, name: 'Paula Wilson', avatar: 'PW', role: 'Publisher', status: 'Active', dateCreated: '05/08/2014', color: 'from-pink-500 to-rose-500' },
  { id: 3, name: 'Antonio Moreno', avatar: 'AM', role: 'Publisher', status: 'Suspended', dateCreated: '11/05/2015', color: 'from-orange-500 to-amber-500' },
  { id: 4, name: 'Mary Saveley', avatar: 'MS', role: 'Reviewer', status: 'Active', dateCreated: '06/09/2016', color: 'from-purple-500 to-violet-500' },
  { id: 5, name: 'Martin Sommer', avatar: 'MS', role: 'Moderator', status: 'Inactive', dateCreated: '12/08/2017', color: 'from-teal-500 to-cyan-500' },
  { id: 6, name: 'Laurence Lebihan', avatar: 'LL', role: 'Member', status: 'Active', dateCreated: '07/14/2018', color: 'from-green-500 to-emerald-500' },
  { id: 7, name: 'Elizabeth Lincoln', avatar: 'EL', role: 'Reviewer', status: 'Active', dateCreated: '03/22/2019', color: 'from-indigo-500 to-blue-500' },
  { id: 8, name: 'Victoria Ashworth', avatar: 'VA', role: 'Publisher', status: 'Inactive', dateCreated: '09/10/2020', color: 'from-red-500 to-pink-500' },
];

const ITEMS_PER_PAGE = 5;
const ROLES = ['Admin', 'Publisher', 'Reviewer', 'Moderator', 'Member'];
const STATUSES = ['Active', 'Inactive', 'Suspended'];

const statusConfig = {
  Active: { color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30', dot: 'bg-emerald-400' },
  Suspended: { color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30', dot: 'bg-red-400' },
  Inactive: { color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30', dot: 'bg-amber-400' },
};

const Dashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState(INITIAL_USERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [editTarget, setEditTarget] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', role: '', status: '' });

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const openEdit = (u) => {
    setEditTarget(u);
    setEditForm({ name: u.name, role: u.role, status: u.status });
  };

  const closeEdit = () => {
    setEditTarget(null);
    setEditForm({ name: '', role: '', status: '' });
  };

  const saveEdit = () => {
    if (!editForm.name.trim()) {
      toast.error('Name cannot be empty');
      return;
    }
    const initials = editForm.name.trim().split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editTarget.id
          ? { ...u, name: editForm.name.trim(), avatar: initials, role: editForm.role, status: editForm.status }
          : u
      )
    );
    toast.success(`${editForm.name.trim()} updated`);
    closeEdit();
  };

  const removeUser = (u) => {
    setUsers((prev) => prev.filter((x) => x.id !== u.id));
    if (paginated.length === 1 && currentPage > 1) setCurrentPage((p) => p - 1);
    toast.success(`${u.name} removed`);
  };

  const activeCount = users.filter((u) => u.status === 'Active').length;
  const suspendedCount = users.filter((u) => u.status === 'Suspended').length;

  const stats = [
    { label: 'Total Users', value: users.length, icon: '👥', change: '+12%', up: true },
    { label: 'Active Users', value: activeCount, icon: '✅', change: '+8%', up: true },
    { label: 'New This Month', value: 143, icon: '🆕', change: '+24%', up: true },
    { label: 'Suspended', value: suspendedCount, icon: '🚫', change: '-3%', up: false },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #060b14 0%, #0a0f1e 50%, #060d18 100%)' }}>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-1">
            <div className="h-px flex-1 bg-gradient-to-r from-teal-500/50 to-transparent max-w-[60px]" />
            <span className="text-teal-400 text-xs font-orbitron tracking-widest uppercase">Dashboard</span>
          </div>
          <h1 className="font-orbitron font-bold text-2xl md:text-3xl text-white">
            Welcome back,{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #14b8a6, #22d3ee)' }}>
              {user?.name?.split(' ')[0]}
            </span>
          </h1>
          <p className="text-slate-400 text-sm font-exo mt-1">
            Here's what's happening with your platform today.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-5 animate-slide-up opacity-0"
              style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{stat.icon}</span>
                <span className={`text-xs font-exo font-semibold px-2 py-0.5 rounded-full ${stat.up ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="font-orbitron font-bold text-2xl text-white mb-1">{stat.value}</div>
              <div className="text-xs text-slate-400 font-exo">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl overflow-hidden animate-slide-up opacity-0"
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>

          <div className="px-6 py-5 border-b border-teal-500/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="font-orbitron font-bold text-white text-lg">User Management</h2>
              <p className="text-slate-400 text-xs font-exo mt-0.5">{filtered.length} of {users.length} users</p>
            </div>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={handleSearch}
                className="glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-300 placeholder-slate-500 font-exo w-full sm:w-56"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {['#', 'Name', 'Date Created', 'Role', 'Status', 'Action'].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-4 text-left text-xs font-orbitron font-semibold text-teal-400/80 uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-exo">
                      No users found matching your search.
                    </td>
                  </tr>
                ) : (
                  paginated.map((u, idx) => {
                    const st = statusConfig[u.status];
                    return (
                      <tr
                        key={u.id}
                        className="hover:bg-white/3 transition-colors duration-200 group"
                        style={{ animation: `fadeIn 0.3s ease ${idx * 0.05}s both` }}
                      >
                        <td className="px-6 py-4 text-slate-500 text-sm font-exo">{u.id}</td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${u.color} flex items-center justify-center text-white text-xs font-bold font-orbitron shadow-sm flex-shrink-0`}>
                              {u.avatar}
                            </div>
                            <span className="text-slate-200 text-sm font-exo font-medium whitespace-nowrap">{u.name}</span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-slate-400 text-sm font-exo whitespace-nowrap">{u.dateCreated}</td>

                        <td className="px-6 py-4 text-slate-300 text-sm font-exo">{u.role}</td>

                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-exo border ${st.bg} ${st.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${st.dot} ${u.status === 'Active' ? 'animate-pulse' : ''}`} />
                            {u.status}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEdit(u)}
                              className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 hover:bg-blue-500/20 hover:border-blue-400/40 transition-all duration-200"
                              title="Edit user"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => removeUser(u)}
                              className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 hover:border-red-400/40 transition-all duration-200"
                              title="Remove user"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-exo">
                Page {currentPage} of {totalPages} — {filtered.length} entries
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-xs font-exo rounded-lg border border-white/10 text-slate-400 hover:border-teal-500/40 hover:text-teal-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-8 h-8 text-xs font-orbitron rounded-lg transition-all ${
                      p === currentPage
                        ? 'btn-teal text-white'
                        : 'border border-white/10 text-slate-400 hover:border-teal-500/40 hover:text-teal-400'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 text-xs font-exo rounded-lg border border-white/10 text-slate-400 hover:border-teal-500/40 hover:text-teal-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-slate-600 text-xs font-exo mt-8">
          AuthSystem Dashboard · {new Date().getFullYear()} · Secure Access Portal
        </p>
      </main>

      {editTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
          onClick={closeEdit}
        >
          <div
            className="glass-card rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            style={{ border: '1px solid rgba(20,184,166,0.25)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-orbitron font-bold text-white text-base">Edit User</h3>
              <button
                onClick={closeEdit}
                className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-teal-400 uppercase tracking-widest mb-1.5 font-exo">
                  Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full glass-input rounded-xl px-4 py-3 text-slate-200 font-exo text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-teal-400 uppercase tracking-widest mb-1.5 font-exo">
                  Role
                </label>
                <select
                  value={editForm.role}
                  onChange={(e) => setEditForm((f) => ({ ...f, role: e.target.value }))}
                  className="w-full glass-input rounded-xl px-4 py-3 text-slate-200 font-exo text-sm"
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r} style={{ background: '#0a0f1e' }}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-teal-400 uppercase tracking-widest mb-1.5 font-exo">
                  Status
                </label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm((f) => ({ ...f, status: e.target.value }))}
                  className="w-full glass-input rounded-xl px-4 py-3 text-slate-200 font-exo text-sm"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s} style={{ background: '#0a0f1e' }}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={closeEdit}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-white/20 text-sm font-exo transition-all"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="flex-1 py-2.5 rounded-xl btn-teal text-white text-sm font-orbitron tracking-wider uppercase transition-all"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
