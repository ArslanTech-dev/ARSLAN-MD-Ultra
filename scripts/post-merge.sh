#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

npm ci --no-audit --no-fund

node --check config.js
node --check index.js
node --check server.js
node --check pair.js