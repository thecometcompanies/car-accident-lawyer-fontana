#!/bin/bash

# Deployment script for Fontana Car Accident Lawyer Website
# This script handles the complete A-Z deployment process

set -e  # Exit on any error

echo "🚀 Starting deployment process..."

# Check if required environment variables are set
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found. Please copy .env.example to .env and fill in your values."
    exit 1
fi

# Load environment variables
source .env

# Check for required tokens
if [ -z "$VERCEL_TOKEN" ] || [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Error: VERCEL_TOKEN and GITHUB_TOKEN are required in .env file"
    exit 1
fi

echo "✅ Environment variables loaded"

# Stage all files for git
echo "📝 Staging files for git..."
git add -A

# Commit changes
echo "💾 Committing changes..."
git commit -m "Initial commit: Fontana Car Accident Lawyer website

🎯 Features:
- Multi-step intake form with webhook integration
- Performance optimized for PageSpeed A+ scores
- Mobile-first responsive design
- Complete personal injury case qualification system

🚀 Generated with Claude Code
" || echo "No changes to commit"

# Check if GitHub repo exists, create if not
echo "🔗 Setting up GitHub repository..."
if [ ! -z "$GITHUB_USERNAME" ] && [ ! -z "$GITHUB_REPO_NAME" ]; then
    # Create GitHub repo using API
    curl -X POST \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        https://api.github.com/user/repos \
        -d "{\"name\":\"$GITHUB_REPO_NAME\",\"description\":\"Fontana Car Accident Lawyer - One-page attorney website with multi-step intake form\",\"private\":false}"
    
    # Add remote origin
    git remote add origin "https://github.com/$GITHUB_USERNAME/$GITHUB_REPO_NAME.git" 2>/dev/null || true
    
    # Push to GitHub
    echo "📤 Pushing to GitHub..."
    git branch -M main
    git push -u origin main
    
    echo "✅ GitHub repository created and code pushed"
else
    echo "⚠️  GitHub username/repo name not provided, skipping GitHub setup"
fi

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
export VERCEL_TOKEN=$VERCEL_TOKEN

# Install Vercel CLI if not present
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy using Vercel CLI
vercel --prod --confirm

echo "🎉 Deployment completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Check your Vercel dashboard for the live URL"
echo "2. Test the multi-step form functionality" 
echo "3. Verify webhook endpoints are working"
echo "4. Update webhook URLs in your CRM system"
echo ""
echo "🔗 Your site should be live at: https://your-deployment.vercel.app"