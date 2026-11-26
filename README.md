# Venroh

## Deploying the backend

The backend is an Express and Socket.IO Node.js server. Deploy it as a Render
Web Service, not as a Cloudflare Pages static site or a Cloudflare Worker.

1. In Render, create a **Blueprint** from this repository and use `render.yaml`.
   The service is configured to build and start from `backend/`.
2. Provide `MONGO_URI` for a reachable MongoDB database.
3. Set `CLIENT_URL` to the deployed frontend URL and `ALLOWED_ORIGINS` to the
   allowed frontend origin(s), comma-separated if there is more than one.
   Render generates `JWT_SECRET` for the service.
4. Configure any optional integration credentials listed in
   `backend/.env.example` in the Render dashboard.

Render supplies `PORT`; the server reads it automatically.
