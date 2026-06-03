import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  ExternalLink,
  FileText,
  MessageCircle,
  Target,
  TrendingUp,
  WalletCards
} from 'lucide-react';

import { getStartupPitch } from '../../services/startupService';
import { createConversationFromStartup } from '../../services/chatService';
import { bookMeetingSlot } from '../../services/meetingService';

const StartupDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pitchData, setPitchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [error, setError] = useState('');

  const fetchPitch = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getStartupPitch(id);
      setPitchData(data.pitchData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch startup pitch');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPitch();
  }, [id]);

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const handleStartChat = async () => {
    try {
      setChatLoading(true);
      setError('');

      const data = await createConversationFromStartup(id);

      navigate(`/chat/${data.conversation._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to start chat');
    } finally {
      setChatLoading(false);
    }
  };

  const handleBookSlot = async (slotId) => {
    try {
      setBookingLoading(slotId);
      setError('');
      setBookingMessage('');

      const response = await bookMeetingSlot({
        startupId: id,
        slotId
      });

      setBookingMessage(response.message || 'Meeting booked successfully');

      await fetchPitch();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book meeting slot');
    } finally {
      setBookingLoading('');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Loading startup pitch...
          </p>
        </div>
      </div>
    );
  }

  if (!pitchData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-6 shadow-sm">
          <p className="text-sm font-medium text-rose-600">
            Startup pitch not found
          </p>
        </div>
      </div>
    );
  }

  const pitch = pitchData.pitch || {};
  const investment = pitchData.investmentDetails || {};
  const availableSlots =
    pitchData.availabilitySlots?.filter((slot) => slot.status === 'available') ||
    [];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button
            onClick={() => navigate('/investor')}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <button
            onClick={handleStartChat}
            disabled={chatLoading}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
          >
            <MessageCircle size={18} />
            {chatLoading ? 'Starting chat...' : 'Start Chat'}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {error && (
          <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <section className="mb-8 rounded-3xl bg-slate-950 p-8 text-white">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div>
              <p className="text-sm text-slate-300">Startup pitch</p>

              <h1 className="mt-2 text-4xl font-bold">
                {pitchData.companyName}
              </h1>

              <p className="mt-3 text-sm text-slate-300">
                CIN: {pitchData.cin}
              </p>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
                {pitch.oneLinePitch || 'No one-line pitch provided.'}
              </p>
            </div>

            <span className="rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-200">
              Verified Live Startup
            </span>
          </div>
        </section>

        <section className="mb-8 grid gap-6 md:grid-cols-3">
          <StatCard
            icon={<TrendingUp />}
            title="Valuation Ask"
            value={formatMoney(pitchData.valuationAsk)}
          />

          <StatCard
            icon={<WalletCards />}
            title="Amount Required"
            value={formatMoney(investment.amountRequired)}
          />

          <StatCard
            icon={<Target />}
            title="Equity Offered"
            value={`${investment.equityOffered || 0}%`}
          />
        </section>

        <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <InfoBlock title="Problem" value={pitch.problem} />
            <InfoBlock title="Solution" value={pitch.solution} />
            <InfoBlock title="Target Market" value={pitch.targetMarket} />
            <InfoBlock title="Business Model" value={pitch.businessModel} />
            <InfoBlock title="Traction" value={pitch.traction} />
            <InfoBlock title="Competitors" value={pitch.competitors} />
            <InfoBlock title="Unique Value" value={pitch.uniqueValue} />
            <InfoBlock title="Team Overview" value={pitch.teamOverview} />
            <InfoBlock title="Future Plan" value={pitch.futurePlan} />
            <InfoBlock title="Risks" value={pitch.risks} />
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <FileText className="text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-950">
                  Pitch Deck
                </h3>
              </div>

              {pitchData.pitchDeckUrl ? (
                <a
                  href={pitchData.pitchDeckUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  View Deck
                  <ExternalLink size={16} />
                </a>
              ) : (
                <p className="text-sm text-slate-500">
                  No pitch deck uploaded.
                </p>
              )}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <Building2 className="text-slate-700" />
                <h3 className="text-lg font-bold text-slate-950">
                  Investment Terms
                </h3>
              </div>

              <div className="space-y-4 text-sm">
                <SideInfo title="Stage" value={investment.fundingStage} />
                <SideInfo
                  title="Minimum Investment"
                  value={formatMoney(investment.minimumInvestment)}
                />
                <SideInfo title="Expected ROI" value={investment.expectedROI} />
                <SideInfo title="Use of Funds" value={investment.useOfFunds} />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <CalendarDays className="text-slate-700" />
                <h3 className="text-lg font-bold text-slate-950">
                  Available Meeting Slots
                </h3>
              </div>

              {bookingMessage && (
                <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                  {bookingMessage}
                </div>
              )}

              {availableSlots.length > 0 ? (
                <div className="space-y-3">
                  {availableSlots.map((slot) => (
                    <div
                      key={slot._id}
                      className="rounded-2xl border border-slate-200 p-4"
                    >
                      <p className="text-sm font-semibold text-slate-900">
                        {new Date(slot.startTime).toLocaleString()}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        to {new Date(slot.endTime).toLocaleString()}
                      </p>

                      <button
                        onClick={() => handleBookSlot(slot._id)}
                        disabled={bookingLoading === slot._id}
                        className="mt-3 w-full rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
                      >
                        {bookingLoading === slot._id
                          ? 'Booking...'
                          : 'Book Slot'}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  Founder has not added available slots yet.
                </p>
              )}
            </div>

            <button
              onClick={handleStartChat}
              disabled={chatLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
            >
              <MessageCircle size={18} />
              {chatLoading ? 'Starting chat...' : 'Chat with Founder'}
            </button>
          </aside>
        </section>
      </main>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 text-slate-700">{icon}</div>
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="mt-2 text-2xl font-bold text-slate-950">{value}</h3>
    </div>
  );
};

const InfoBlock = ({ title, value }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-950">{title}</h3>
      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
        {value || 'Not provided'}
      </p>
    </div>
  );
};

const SideInfo = ({ title, value }) => {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {title}
      </p>
      <p className="mt-1 font-medium text-slate-800">
        {value || 'Not provided'}
      </p>
    </div>
  );
};

export default StartupDetailsPage;