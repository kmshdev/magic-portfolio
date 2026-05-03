#!/bin/zsh

# Conductor Archive Script for Magic Portfolio
#
# This script runs before Conductor archives and deletes a workspace.
#
# NOTE: Conductor automatically deletes the entire workspace directory when
# archiving. Therefore, local build artifacts like the `.next` directory
# or `node_modules` DO NOT need to be manually removed here.
#
# Use this script ONLY to clean up resources OUTSIDE the workspace directory,
# such as:
# - Global configuration or cache files uniquely created for this workspace
# - Background processes/daemons started specifically by this workspace
# - External database schemas provisioned for this workspace

set -e

echo "📦 Running Conductor archive script for workspace: ${CONDUCTOR_WORKSPACE_NAME:-local}..."

# 1. Stop Biome Background Daemon
# Biome spawns daemons that persist globally and leak memory when workspaces are deleted.
echo "🧹 Stopping Biome background daemon..."
npx @biomejs/biome daemon stop || true

# 2. Release Locked Ports
# Ensure no orphaned Next.js child processes are still holding the Conductor port.
if [ -n "$CONDUCTOR_PORT" ]; then
    echo "🔌 Releasing port $CONDUCTOR_PORT..."
    lsof -ti:"$CONDUCTOR_PORT" | xargs kill -9 2>/dev/null || true
fi

# 3. Clean up Workspace-Specific OS Temp Files
# Node.js and Next.js occasionally leave tmp files.
echo "🗑️ Cleaning up any lingering OS temp files..."
rm -rf "/tmp/*${CONDUCTOR_WORKSPACE_NAME}*" 2>/dev/null || true

echo "✅ Archive cleanup complete. Workspace is ready for deletion."