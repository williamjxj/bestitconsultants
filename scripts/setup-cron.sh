#!/bin/bash

# Setup cron job for daily AI news fetching
# This script sets up a cron job to run the AI news fetching script daily

echo "🔧 Setting up AI News cron job..."

# Get the current directory (project root)
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SCRIPT_PATH="$PROJECT_DIR/scripts/fetch-ai-news.js"

# Make the script executable
chmod +x "$SCRIPT_PATH"

# Create a log directory if it doesn't exist
mkdir -p "$PROJECT_DIR/logs"

# Add cron job to run daily at 6 AM
CRON_JOB="0 6 * * * cd $PROJECT_DIR && node $SCRIPT_PATH >> $PROJECT_DIR/logs/ai-news-fetch.log 2>&1"

# Check if cron job already exists
if crontab -l 2>/dev/null | grep -q "fetch-ai-news.js"; then
    echo "⚠️  Cron job already exists. Updating..."
    # Remove existing cron job
    crontab -l 2>/dev/null | grep -v "fetch-ai-news.js" | crontab -
fi

# Add the new cron job
(crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

echo "✅ Cron job added successfully!"
echo "📅 AI news will be fetched daily at 6:00 AM"
echo "📝 Logs will be saved to: $PROJECT_DIR/logs/ai-news-fetch.log"

# Test the script
echo "🧪 Testing the script..."
cd "$PROJECT_DIR"
if node "$SCRIPT_PATH"; then
    echo "✅ Script test successful!"
else
    echo "❌ Script test failed. Please check your environment variables."
    echo "Required environment variables:"
    echo "  - NEXT_PUBLIC_SUPABASE_URL"
    echo "  - SUPABASE_SERVICE_ROLE_KEY"
fi

echo ""
echo "📋 To view your cron jobs: crontab -l"
echo "📋 To remove the cron job: crontab -e (then delete the line)"
echo "📋 To view logs: tail -f $PROJECT_DIR/logs/ai-news-fetch.log"
