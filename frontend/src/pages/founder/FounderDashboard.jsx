import { useAuth } from '../../context/AuthContext';

const FounderDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-slate-950">
              Founder Dashboard
            </h1>
            <p className="text-sm text-slate-500">
              Welcome, {user?.name}
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Startup Status</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              Pending Setup
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Pitch Completion</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">0%</h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Admin Approval</p>
            <h2 className="mt-2 text-2xl font-bold text-amber-600">Pending</h2>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">
            Next step
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Create your startup profile and upload your pitch deck.
          </p>
        </div>
      </main>
    </div>
  );
};

export default FounderDashboard;