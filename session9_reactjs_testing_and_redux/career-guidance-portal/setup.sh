#!/usr/bin/env bash
set -e
echo ""
echo "🚀 Setting up Career Guidance Portal (Redux Masterclass Edition)"
echo "==============================================================="

ROOT_DIR=$(pwd)
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"

echo "🔍 Checking Node.js & npm..."
node -v || { echo "❌ Node.js missing"; exit 1; }
npm -v  || { echo "❌ npm missing"; exit 1; }

echo ""
echo "⚙️ Installing backend dependencies..."
cd "$BACKEND_DIR"
npm install

echo ""
echo "🎨 Installing frontend dependencies..."
cd "$FRONTEND_DIR"
npm install

echo ""
echo "🧑‍💼 Seeding initial admin user..."
cd "$BACKEND_DIR"
PORT=5001 node server.js & SERVER_PID=$!
sleep 5
curl -s -X POST http://localhost:5001/api/mentors/seed || true
kill $SERVER_PID >/dev/null 2>&1 || true
echo "✅ Admin seeded: lakshmikant@portal.com / mentor123"

echo ""
echo "✨ Setup complete!"
echo ""
echo "➡️ Start backend:   cd backend && npm run dev"
echo "➡️ Start frontend:  cd frontend && npm run dev"
echo ""
echo "Frontend → http://localhost:5173"
echo "Backend  → http://localhost:5001"
