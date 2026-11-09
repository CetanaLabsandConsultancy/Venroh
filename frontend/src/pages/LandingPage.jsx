import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  FileCheck2,
  Layers3,
  LockKeyhole,
  Menu,
  MessageSquare,
  Search,
  Sparkles,
  Target,
  Users,
  Video,
  WalletCards,
  X
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const highlights = [
  {
    icon: Layers3,
    title: 'Pitch with clarity',
    description:
      'Put your business, traction, and vision in front of the right people without the noise.'
  },
  {
    icon: Users,
    title: 'Meet with intent',
    description:
      'Discover relevant founders or investors and move from interest to a focused conversation.'
  },
  {
    icon: LockKeyhole,
    title: 'Build with confidence',
    description:
      'Keep conversations, meetings, and important decisions in one professional workspace.'
  }
];

const platformFeatures = [
  {
    icon: Search,
    title: 'Startup discovery',
    description:
      'Explore relevant startup profiles, business details, traction, and funding context in one focused view.'
  },
  {
    icon: FileCheck2,
    title: 'Pitch-ready profiles',
    description:
      'Help founders present their company story, valuation ask, pitch deck, and vision with clarity.'
  },
  {
    icon: MessageSquare,
    title: 'Direct conversations',
    description:
      'Move from a profile view to a meaningful conversation without losing the context behind the connection.'
  },
  {
    icon: CalendarDays,
    title: 'Meetings that move',
    description:
      'Coordinate availability and take promising conversations into structured founder-investor meetings.'
  },
  {
    icon: BrainCircuit,
    title: 'Sharper decisions',
    description:
      'Use pitch updates and intelligent summaries to spend less time sorting information and more time acting on it.'
  },
  {
    icon: WalletCards,
    title: 'Ready for investment',
    description:
      'Keep wallet and transaction workflows close to the relationship, so the next step stays simple.'
  }
];

const roleBenefits = [
  {
    eyebrow: 'For founders',
    title: 'Turn your story into a signal.',
    description:
      'Show what you are building, why it matters, and where you are going next. Venroh gives your startup a professional home for discovery and investor conversations.',
    icon: RocketIcon,
    points: ['Create a complete startup profile', 'Share pitch updates and traction', 'Connect with relevant investors']
  },
  {
    eyebrow: 'For investors',
    title: 'Find potential worth your time.',
    description:
      'Discover startups with the context you need to make an informed first move, then take the best conversations into meetings and decisions.',
    icon: Target,
    points: ['Browse startup opportunities', 'Review pitch and company details', 'Chat, meet, and track next steps']
  }
];

function RocketIcon({ size = 22 }) {
  return <span className="text-indigo-300"><ArrowRight size={size} /></span>;
}

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="landing-page min-h-screen overflow-hidden bg-[#080b18] text-white">
      <header className="relative z-20 border-b border-white/10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#080b18] shadow-lg shadow-indigo-500/20">
              <Sparkles size={20} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight">venroh</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#why-venroh" className="transition hover:text-white">
              Why Venroh
            </a>
            <a href="#how-it-works" className="transition hover:text-white">
              How it works
            </a>
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className="rounded-full px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#080b18] transition hover:bg-indigo-100"
            >
              Join Venroh <ArrowRight size={16} />
            </Link>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="rounded-lg p-2 text-slate-200 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-white/10 px-6 py-5 md:hidden">
            <div className="flex flex-col gap-4 text-sm text-slate-300">
              <a href="#why-venroh" onClick={closeMenu}>
                Why Venroh
              </a>
              <a href="#how-it-works" onClick={closeMenu}>
                How it works
              </a>
              <a href="#features" onClick={closeMenu}>
                Features
              </a>
              <a href="#contact" onClick={closeMenu}>
                Contact
              </a>
              <div className="flex gap-3 border-t border-white/10 pt-4">
                <Link to="/login" onClick={closeMenu} className="font-semibold">
                  Log in
                </Link>
                <Link to="/register" onClick={closeMenu} className="font-semibold text-indigo-300">
                  Join Venroh
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-28">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />
          <div className="relative grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-3xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-300/20 bg-indigo-400/10 px-4 py-2 text-sm text-indigo-200">
                <span className="h-2 w-2 rounded-full bg-indigo-300 shadow-[0_0_14px_#a5b4fc]" />
                A better way to move ideas forward
              </div>

              <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                Where bold ideas meet
                <span className="gradient-text block">the right momentum.</span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
                Venroh brings ambitious founders and thoughtful investors into one focused space to
                discover, connect, and build what is next.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:bg-indigo-400"
                >
                  Start your journey <ArrowRight size={18} />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:bg-white/10"
                >
                  See how it works <ChevronRight size={18} />
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <Check size={16} className="text-indigo-300" /> Founder-first
                </span>
                <span className="inline-flex items-center gap-2">
                  <Check size={16} className="text-indigo-300" /> Investor-ready
                </span>
                <span className="inline-flex items-center gap-2">
                  <Check size={16} className="text-indigo-300" /> Built for trust
                </span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[500px]">
              <div className="dashboard-card rounded-[2rem] border border-white/15 bg-white/[0.07] p-4 shadow-2xl shadow-indigo-950/60 backdrop-blur-xl sm:p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Your workspace</p>
                    <p className="mt-1 text-base font-semibold">Discover what&apos;s next</p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-400/15 text-indigo-200">
                    <BarChart3 size={18} />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-[#11162a] p-4">
                    <p className="text-xs text-slate-500">Active connections</p>
                    <p className="mt-2 text-3xl font-semibold">24</p>
                    <p className="mt-2 text-xs text-emerald-300">+18% this month</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#11162a] p-4">
                    <p className="text-xs text-slate-500">Pitch views</p>
                    <p className="mt-2 text-3xl font-semibold">1.8k</p>
                    <p className="mt-2 text-xs text-indigo-300">Your story is moving</p>
                  </div>
                </div>

                <div className="mt-3 rounded-2xl border border-white/10 bg-[#11162a] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Connection momentum</p>
                    <span className="text-xs text-slate-500">Last 6 months</span>
                  </div>
                  <div className="mt-5 flex h-28 items-end gap-2">
                    {[36, 48, 42, 67, 59, 82, 73, 96, 88, 100].map((height, index) => (
                      <div
                        key={height}
                        className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-600 to-violet-300 opacity-80"
                        style={{ height: `${height}%`, opacity: 0.45 + index * 0.05 }}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between rounded-2xl border border-indigo-300/15 bg-indigo-400/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-300/15 text-indigo-200">
                      <MessageSquare size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New conversation</p>
                      <p className="mt-0.5 text-xs text-slate-400">Aarav from Northstar Labs</p>
                    </div>
                  </div>
                  <ChevronRight size={17} className="text-slate-400" />
                </div>
              </div>
              <div className="floating-stat absolute -bottom-7 -left-5 hidden rounded-2xl border border-white/15 bg-[#151a31]/90 px-4 py-3 shadow-xl backdrop-blur-md sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                    <CircleDollarSign size={17} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Opportunity unlocked</p>
                    <p className="text-sm font-semibold">Keep building</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0c1020]">
          <div className="mx-auto grid max-w-7xl gap-6 px-6 py-7 sm:grid-cols-3 lg:px-8">
            {[
              ['One workspace', 'Profiles, pitches, chat, and meetings'],
              ['Two perspectives', 'A clearer path for founders and investors'],
              ['One next step', 'From discovery to a real conversation']
            ].map(([label, detail], index) => (
              <div key={label} className={`flex items-start gap-4 ${index > 0 ? 'sm:border-l sm:border-white/10 sm:pl-6' : ''}`}>
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-400/10 text-xs font-semibold text-indigo-300">
                  0{index + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="mt-1 text-sm text-slate-500">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="why-venroh" className="border-y border-white/10 bg-white/[0.025]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">Why Venroh</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Less searching. More meaningful progress.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-400">
                The right opportunity is not just about being seen. It is about being understood,
                trusted, and able to take the next step.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {highlights.map(({ icon: Icon, title, description }) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-[#0d1222] p-6 transition hover:-translate-y-1 hover:border-indigo-300/30">
                  <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-400/10 text-indigo-300">
                    <Icon size={21} />
                  </div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">Built into the journey</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Everything you need to make the right introduction matter.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-slate-400">
              Venroh brings the parts of startup discovery that usually live in separate tools into one calm, connected experience.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {platformFeatures.map(({ icon: Icon, title, description }) => (
              <div key={title} className="group rounded-3xl border border-white/10 bg-[#0d1222] p-6 transition hover:-translate-y-1 hover:border-indigo-300/30 hover:bg-[#11172c]">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-400/10 text-indigo-300 transition group-hover:bg-indigo-400/20">
                    <Icon size={21} />
                  </div>
                  <ChevronRight size={17} className="text-slate-700 transition group-hover:translate-x-1 group-hover:text-indigo-300" />
                </div>
                <h3 className="mt-8 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.025]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">Designed around you</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                The same platform. A different kind of advantage.
              </h2>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {roleBenefits.map(({ eyebrow, title, description, icon: Icon, points }) => (
                <div key={eyebrow} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d1222] p-7 sm:p-9">
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-2xl" />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-300">{eyebrow}</p>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                        <Icon size={20} />
                      </div>
                    </div>
                    <h3 className="mt-7 max-w-sm text-2xl font-semibold tracking-tight">{title}</h3>
                    <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400">{description}</p>
                    <div className="mt-7 space-y-3">
                      {points.map((point) => (
                        <div key={point} className="flex items-center gap-3 text-sm text-slate-300">
                          <CheckCircle2 size={17} className="shrink-0 text-emerald-300" />
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">How it works</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                One clear path from idea to opportunity.
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-400">
                Whether you are shaping the next big thing or looking for it, Venroh keeps the
                journey simple and human.
              </p>
            </div>

            <div className="space-y-4">
              {[
                ['01', 'Create your profile', 'Share the story, ambition, and details that make your opportunity worth a closer look.'],
                ['02', 'Find your people', 'Browse relevant startups or investors and connect around shared potential.'],
                ['03', 'Make the next move', 'Take conversations into meetings, decisions, and momentum with the right context.']
              ].map(([number, title, description]) => (
                <div key={number} className="flex gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                  <span className="pt-1 text-sm font-semibold text-indigo-300">{number}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8 lg:pb-28">
          <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-[2rem] border border-white/10 bg-[#0d1222] p-7 sm:p-9">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                <LockKeyhole size={21} />
              </div>
              <h2 className="mt-7 text-2xl font-semibold tracking-tight">A more thoughtful way to build trust.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                Great startup relationships need more than a quick introduction. They need context,
                consistent communication, and a clear next step. Venroh is designed to make every
                part of that journey feel professional and intentional.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ['01', 'Context first', 'See the story before the pitch.'],
                  ['02', 'Conversations matter', 'Keep the right people connected.'],
                  ['03', 'Momentum wins', 'Make progress visible and actionable.']
                ].map(([number, title, detail]) => (
                  <div key={number} className="border-t border-white/10 pt-4">
                    <p className="text-xs font-semibold text-indigo-300">{number}</p>
                    <p className="mt-3 text-sm font-semibold">{title}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-indigo-300/15 bg-indigo-400/10 p-7 sm:p-9">
              <Video size={23} className="text-indigo-200" />
              <h3 className="mt-7 text-2xl font-semibold tracking-tight">Ready when the conversation is.</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Start with a profile. Continue with a chat. Meet when there is something worth exploring.
              </p>
              <Link to="/register" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-indigo-200">
                Join the network <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8 lg:pb-28">
          <div className="relative overflow-hidden rounded-[2rem] border border-indigo-300/20 bg-gradient-to-br from-indigo-500/20 via-[#171633] to-[#0d1222] px-6 py-12 sm:px-12 lg:py-16">
            <div className="cta-orb" />
            <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-200">Your next chapter starts here</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Bring your ambition into focus.
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-300">
                  Join a growing network built for people who are ready to do meaningful work.
                </p>
              </div>
              <Link
                to="/register"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#080b18] transition hover:bg-indigo-100"
              >
                Get started <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <p className="font-semibold text-white">venroh</p>
            <p className="mt-1">A focused network for the people building what&apos;s next.</p>
          </div>
          <a href="mailto:pr.team@venroh.in" className="transition hover:text-white">
            pr.team@venroh.in
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
