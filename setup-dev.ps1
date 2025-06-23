# Stock Recommender - Development Setup Script
# This script helps set up the local development environment

Write-Host "🚀 Stock Recommender - Development Setup" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creating .env file from template..." -ForegroundColor Yellow
    if (Test-Path "env.example") {
        Copy-Item "env.example" ".env"
        Write-Host "✅ .env file created. Please edit it with your API keys!" -ForegroundColor Green
        Write-Host "⚠️  IMPORTANT: Never commit .env to version control!" -ForegroundColor Red
    } else {
        Write-Host "❌ env.example not found. Please create .env manually." -ForegroundColor Red
    }
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
}

# Check Docker
Write-Host "🐳 Checking Docker..." -ForegroundColor Yellow
try {
    docker --version | Out-Null
    Write-Host "✅ Docker is available" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker not found. Please install Docker Desktop." -ForegroundColor Red
    exit 1
}

# Check if Docker is running
try {
    docker info | Out-Null
    Write-Host "✅ Docker is running" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not running. Please start Docker Desktop." -ForegroundColor Red
    exit 1
}

# Check Node.js (for local development)
Write-Host "📦 Checking Node.js..." -ForegroundColor Yellow
try {
    node --version | Out-Null
    Write-Host "✅ Node.js is available" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Node.js not found. You can still use Docker for development." -ForegroundColor Yellow
}

# Check .NET SDK (for local development)
Write-Host "🔧 Checking .NET SDK..." -ForegroundColor Yellow
try {
    dotnet --version | Out-Null
    Write-Host "✅ .NET SDK is available" -ForegroundColor Green
} catch {
    Write-Host "⚠️  .NET SDK not found. You can still use Docker for development." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Edit .env file with your API keys" -ForegroundColor White
Write-Host "2. Run: cd docker && docker-compose up --build" -ForegroundColor White
Write-Host "3. Open http://localhost:4200 in your browser" -ForegroundColor White
Write-Host ""
Write-Host "For more information, see README.md" -ForegroundColor Cyan 