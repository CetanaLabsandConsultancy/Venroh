import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  CalendarDays,
  Eye,
  LogOut,
  MessageCircle,
  TrendingUp
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import { getStartups } from '../../services/startupService';

const InvestorDashboard = () => {
  const { user, logout } = useAuth();

  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStartups = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getStartups();
      setStartups(data.startups || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch startups');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStartups();
  }, []);

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <TrendingUp size={22} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-950">
                Investor Dashboard
              </h1>
              <p className="text-sm text-slate-500">
                Welcome, {user?.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/meetings"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <CalendarDays size={17} />
              Meetings
            </Link>

            <Link
              to="/chat"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
             >
               <MessageCircle size={17} />
                 Messages
            </Link>

            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <section className="mb-8 rounded-3xl bg-slate-950 p-8 text-white">
          <p className="text-sm text-slate-300">Verified opportunities</p>

          <h2 className="mt-2 max-w-3xl text-4xl font-bold">
            Discover live startups ready for investor conversations.
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
            Review verified startup profiles, study their pitch, book founder
            meetings, and start private conversations.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/meetings"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100"
            >
              <CalendarDays size={18} />
              View Meetings
            </Link>
          </div>
        </section>

        {error && (
          <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Loading live startups...
            </p>
          </div>
        ) : startups.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <Building2 className="mx-auto mb-4 text-slate-400" size={34} />

            <h3 className="text-xl font-bold text-slate-950">
              No live startups yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Startups will appear here after admin verification.
            </p>
          </div>
        ) : (
          <section>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-950">
                  Live Startups
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {startups.length} verified startup
                  {startups.length > 1 ? 's' : ''} available.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {startups.map((startup) => (
                <article
                  key={startup._id}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                      <Building2 size={22} />
                    </div>

                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Live
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-950">
                    {startup.companyName}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    CIN: {startup.cin}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Founder:{' '}
                    {startup.founderId?.name ||
                      startup.founderId?.email ||
                      'Founder'}
                  </p>

                  <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Valuation Ask
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-950">
                      {formatMoney(startup.valuationAsk)}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      to={`/investor/startups/${startup._id}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      <Eye size={16} />
                      View Pitch
                    </Link>

                    <Link
                      to={`/investor/startups/${startup._id}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <MessageCircle size={16} />
                      Contact
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default InvestorDashboard;