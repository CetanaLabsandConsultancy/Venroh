import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  LogOut,
  Plus,
  TrendingUp
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import { getMyStartup } from '../../services/startupService';

const FounderDashboard = () => {
  const { user, logout } = useAuth();

  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStartup = async () => {
    try {
      setLoading(true);
      const data = await getMyStartup();
      setStartup(data.startup);
    } catch {
      setStartup(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStartup();
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
              <Building2 size={22} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-950">
                Founder Dashboard
              </h1>
              <p className="text-sm text-slate-500">
                Welcome, {user?.name}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Loading startup details...
            </p>
          </div>
        ) : !startup ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
            <div className="max-w-2xl">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <Plus size={28} />
              </div>

              <h2 className="text-3xl font-bold text-slate-950">
                Create your startup profile
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                You have not created a startup yet. Add your company details,
                CIN, valuation ask, and later complete your pitch for admin
                verification.
              </p>

              <Link
                to="/founder/create-startup"
                className="mt-6 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Create Startup
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 rounded-3xl bg-slate-950 p-8 text-white">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
                <div>
                  <p className="text-sm text-slate-300">Your startup</p>
                  <h2 className="mt-2 text-4xl font-bold">
                    {startup.companyName}
                  </h2>
                  <p className="mt-3 text-sm text-slate-300">
                    CIN: {startup.cin}
                  </p>
                </div>

                <div
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    startup.isLive
                      ? 'bg-emerald-500/15 text-emerald-200'
                      : 'bg-amber-500/15 text-amber-200'
                  }`}
                >
                  {startup.isLive ? 'Live for investors' : 'Pending approval'}
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <TrendingUp className="mb-4 text-slate-700" />
                <p className="text-sm text-slate-500">Valuation Ask</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-950">
                  {formatMoney(startup.valuationAsk)}
                </h3>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <Clock className="mb-4 text-amber-600" />
                <p className="text-sm text-slate-500">MCA Status</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-950">
                  {startup.mcaStatus}
                </h3>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <FileText className="mb-4 text-indigo-600" />
                <p className="text-sm text-slate-500">Pitch</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-950">
                  {startup.pitchCompleted ? 'Complete' : 'Incomplete'}
                </h3>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <CheckCircle2 className="mb-4 text-emerald-600" />
                <p className="text-sm text-slate-500">Live Status</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-950">
                  {startup.isLive ? 'Live' : 'Not Live'}
                </h3>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-950">
                Next action
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Complete your pitch details and upload pitch deck. Admin can
                verify your startup only after pitch completion.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to={`/founder/startups/${startup._id}/pitch`}
                  className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Update Pitch
                </Link>

                <Link
                  to="/founder/edit-startup"
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Edit Basic Details
                </Link>

                  <Link
                    to="/founder/availability"
                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                   Set Availability
                </Link>

                <Link
                   to="/meetings"
                   className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                   Meetings
                </Link> 

                 <Link
                  to="/chat"
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                   >
                  Messages
                </Link>     
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default FounderDashboard;