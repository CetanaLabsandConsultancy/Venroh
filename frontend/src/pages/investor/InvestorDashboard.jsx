import { useAuth } from '../../context/AuthContext';

const InvestorDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-slate-950">
              Investor Dashboard
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
        <div className="rounded-3xl bg-slate-950 p-8 text-white">
          <p className="text-sm text-slate-300">Investor network</p>
          <h2 className="mt-3 max-w-2xl text-4xl font-bold">
            Discover verified startups ready for investment conversations.
          </h2>
          <p className="mt-4 max-w-2xl text-slate-300">
            Browse live startups, review pitch details, and start secure founder chats.
          </p>
        </div>
      </main>
    </div>
  );
};

export default InvestorDashboard;