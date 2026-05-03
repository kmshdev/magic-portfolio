#!/bin/zsh

# Conductor Setup Script for Magic Portfolio (Next.js + Once UI)

# Exit immediately if a command exits with a non-zero status.
set -e

echo "🚀 Starting Conductor setup for Magic Portfolio..."

# 1. Handle Environment Variables
# Symlink the root .env.local if it exists. If not, create it from the example.
if [ -f "$CONDUCTOR_ROOT_PATH/.env.local" ]; then
    echo "Found .env.local in root. Symlinking to workspace..."
    ln -s "$CONDUCTOR_ROOT_PATH/.env.local" .env.local
else
    echo "No .env.local found in root. Creating from .env.example..."
    cp .env.example .env.local
fi

# 2. Handle Vercel Configuration
# Copy the .vercel directory if it exists in the root for seamless deployment previews.
if [ -d "$CONDUCTOR_ROOT_PATH/.vercel" ]; then
    echo "Found .vercel directory in root. Copying to workspace..."
    cp -r "$CONDUCTOR_ROOT_PATH/.vercel" .
else
    echo "No .vercel directory found in root. Skipping."
fi

# 3. Install Dependencies
# Using npm as indicated by package-lock.json
echo "📦 Installing dependencies with npm..."
npm install

echo "✅ Conductor setup complete! Your workspace is ready."
