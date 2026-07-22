#!/bin/bash
# Double-click this file to launch Times of the Wild locally.
# No terminal typing needed — it starts a local server and opens your browser.
cd "$(dirname "$0")"

PORT=8843

echo "Starting Times of the Wild on http://localhost:$PORT ..."
python3 -m http.server "$PORT" &
SERVER_PID=$!

sleep 1
open "http://localhost:$PORT"

echo "Running. Close this window (or press Ctrl+C) to stop the server."
wait $SERVER_PID
