#!/usr/bin/env bash
set -e
ROOT_DIR=$(pwd)
BACKEND_DIR="$ROOT_DIR/backend"
DATA_DIR="$BACKEND_DIR/data"

echo ""
echo "🧹 Resetting Career Guidance Portal data..."

cd "$DATA_DIR"
for FILE in students.json sessions.json mentors.json logs.json; do
  echo "[]" > "$FILE"
  echo "Cleared $FILE"
done

cd "$BACKEND_DIR"
npm run dev & SERVER_PID=$!
sleep 5
curl -s -X POST http://localhost:5001/api/mentors/seed || true
kill $SERVER_PID >/dev/null 2>&1 || true

echo ""
echo "✅ Environment reset complete."
echo "Admin credentials: lakshmikant@portal.com / mentor123"
echo ""
