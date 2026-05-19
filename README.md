# VenRoh - Real-Time Startup Investment & Pitching Platform

VenRoh is a highly scalable, enterprise-grade fintech platform designed to bridge the gap between Investors and Founders. The platform features an automated government valuation verification pipeline, secure escrow-like transaction processing, automated scheduling syncing, and an integrated real-time video conferencing engine.

## 🚀 Role-Based Core Workflows

The platform architecture is strictly decoupled around three explicit actors, managed via custom role-based middleware.

### 1. 💼 The Investor Panel
* **Discovery Engine:** High-performance, low-latency deal feed optimized via Redis memory caching to browse trending startups. Startups prominently display structural health indicators like the "Government Verified" badge, real-time funding progress, and dynamically calculated current valuations.
* **Transaction Engine:** Native integration with the Razorpay Checkout modal. Investors can execute allocations seamlessly via UPI, Netbanking, or Wallets, backed by asynchronous state verification through secure backend webhooks.
* **Real-Time Feeds:** Active WebSocket subscriptions keep dashboard data ticking in real time without manual page refreshes.
* **Due Diligence Rooms:** Post-investment dashboards unlock unified access to real-time chat, cloud-backed secure file-sharing (via AWS S3 pre-signed URLs), and one-click video pitch scheduling.

### 2. 🏗️ The Founder Portal
* **Pitch Builder:** Form interface allowing Founders to construct their digital investment profile, upload pitch decks directly to cloud buckets, and define critical constraints like `targetFunding` and `equityOffered`.
* **Corporate Identity Binding:** Onboarding forces the input of a valid 21-digit Corporate Identification Number (CIN). This systematically locks the baseline configuration to actual corporate records, eliminating manual data tampering.
* **Google Calendar Orchestration:** Native Google OAuth2 flow integration. Founders sync their availability slots, and the platform programmatically schedules stakeholder calls, injecting calendar blocks and generating automated invite alerts.
* **Live Pitch Room:** Fully integrated WebRTC workspace featuring instant mic/camera controls, high-fidelity native screen sharing, and participant tracking states like an absolute "Raise Hand" queue.

### 3. 🛡️ The Platform Admin Dashboard
* **Oversight Ledger:** Comprehensive analytical system tracking all active platform applications, aggregate funding volumes, and platform-wide transaction pipelines.
* **Compliance Pipeline:** Verification terminal where incoming startup data is evaluated against the corporate data layer API payloads. Admins review data conflicts and apply digital manual overrides for approved Registered Valuer Certificates if edge-case government sync drops occur.
* **Transaction Reconciliation:** Audit portal mapped directly to the `Investments` ledger collection to monitor the lifecycle state of webhooks, handle processing anomalies, and execute system-level risk mitigation or account suspensions.

---

## 🛠️ Technology Stack

### Frontend
* **Core:** React.js
* **State Management:** Zustand (High-performance, atomic real-time state mutations)
* **Styling:** Tailwind CSS + shadcn/ui components
* **Real-Time Audio/Video:** LiveKit / 100ms React SDK

### Backend
* **Runtime:** Node.js (Express.js framework)
* **Database:** MongoDB via Mongoose (Highly indexed, optimized read paths)
* **Caching & Pub/Sub:** Redis
* **WebSockets:** Socket.io with Redis Adapter
* **Payments:** Razorpay API
* **Scheduling:** Google Calendar API (OAuth2)
