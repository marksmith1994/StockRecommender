# Stock Recommender Setup Script
# This script helps set up the project with the new structure

param(
    [Parameter(Mandatory=$false)]
    [string]$ApiKey = ""
)

function Write-Header {
    param([string]$Message)
    Write-Host "`n=== $Message ===" -ForegroundColor Green
}

function Write-Step {
    param([string]$Message)
    Write-Host "→ $Message" -ForegroundColor Cyan
}

function Test-Docker {
    try {
        docker --version | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

function Setup-Environment {
    Write-Header "Setting up environment configuration"
    
    if (Test-Path ".env") {
        Write-Step "Environment file already exists"
        $overwrite = Read-Host "Do you want to overwrite it? (y/N)"
        if ($overwrite -ne "y" -and $overwrite -ne "Y") {
            return
        }
    }
    
    $apiKey = $ApiKey
    if ([string]::IsNullOrEmpty($apiKey)) {
        $apiKey = Read-Host "Enter your Finnhub API key (get one from https://finnhub.io/)"
    }
    
    if ([string]::IsNullOrEmpty($apiKey)) {
        Write-Host "No API key provided. Please set it manually in the .env file." -ForegroundColor Yellow
        return
    }
    
    $envContent = @"
# Stock Recommender Environment Configuration
FINNHUB_API_KEY=$apiKey
"@
    
    $envContent | Out-File -FilePath ".env" -Encoding UTF8
    Write-Step "Environment file created with API key"
    
    # Copy .env to docker directory for docker-compose
    Copy-Item ".env" "docker/.env" -Force
    Write-Step "Environment file copied to docker directory"
}

function Test-ProjectStructure {
    Write-Header "Testing project structure"
    
    $requiredFiles = @(
        "src/StockRecommender.API/StockRecommender.API.csproj",
        "src/StockRecommender.Core/StockRecommender.Core.csproj",
        "src/StockRecommender.Infrastructure/StockRecommender.Infrastructure.csproj",
        "ui/package.json",
        "docker/docker-compose.yml",
        "docker/Dockerfile"
    )
    
    $missingFiles = @()
    foreach ($file in $requiredFiles) {
        if (-not (Test-Path $file)) {
            $missingFiles += $file
        }
    }
    
    if ($missingFiles.Count -gt 0) {
        Write-Host "Missing required files:" -ForegroundColor Red
        foreach ($file in $missingFiles) {
            Write-Host "  - $file" -ForegroundColor Red
        }
        return $false
    }
    
    Write-Step "Project structure looks good"
    return $true
}

function Clean-Docker {
    Write-Header "Cleaning up existing Docker resources"
    
    try {
        Write-Step "Stopping and removing existing containers..."
        Set-Location "docker"
        docker-compose down --remove-orphans
        Set-Location ".."
        
        Write-Step "Removing old images..."
        docker rmi stock-recommender-api stock-recommender-ui 2>$null
        
        Write-Step "Cleaning up unused Docker resources..."
        docker system prune -f
        
        Write-Step "Docker cleanup completed"
        return $true
    }
    catch {
        Write-Host "Cleanup failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

function Build-Project {
    Write-Header "Building the project"
    
    if (-not (Test-Docker)) {
        Write-Host "Docker is not installed or not running. Please install Docker Desktop." -ForegroundColor Red
        return $false
    }
    
    try {
        Write-Step "Building Docker images..."
        Set-Location "docker"
        docker-compose build --no-cache
        Set-Location ".."
        Write-Step "Build completed successfully"
        return $true
    }
    catch {
        Write-Host "Build failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

function Start-Services {
    Write-Header "Starting services"
    
    try {
        Write-Step "Starting Docker services..."
        Set-Location "docker"
        docker-compose up -d
        Set-Location ".."
        Write-Step "Services started successfully"
        
        Write-Host "`n🎉 Setup complete! Your application is running:" -ForegroundColor Green
        Write-Host "  Frontend: http://localhost:4200" -ForegroundColor Cyan
        Write-Host "  Backend API: http://localhost:5000" -ForegroundColor Cyan
        Write-Host "  Swagger: http://localhost:5000/swagger" -ForegroundColor Cyan
        
        return $true
    }
    catch {
        Write-Host "Failed to start services: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

function Show-Help {
    Write-Host "Stock Recommender Setup Script" -ForegroundColor Green
    Write-Host "Usage: .\setup.ps1 [-ApiKey <your_api_key>]" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "This script will:" -ForegroundColor Cyan
    Write-Host "  1. Set up environment configuration" -ForegroundColor White
    Write-Host "  2. Test project structure" -ForegroundColor White
    Write-Host "  3. Clean up existing Docker resources" -ForegroundColor White
    Write-Host "  4. Build Docker images from scratch" -ForegroundColor White
    Write-Host "  5. Start the application" -ForegroundColor White
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Yellow
    Write-Host "  .\setup.ps1" -ForegroundColor White
    Write-Host "  .\setup.ps1 -ApiKey your_api_key_here" -ForegroundColor White
}

# Main execution
Write-Host "Stock Recommender Setup" -ForegroundColor Green
Write-Host "=======================" -ForegroundColor Green

if ($args[0] -eq "help" -or $args[0] -eq "-help" -or $args[0] -eq "--help") {
    Show-Help
    exit
}

# Step 1: Setup environment
Setup-Environment

# Step 2: Test project structure
if (-not (Test-ProjectStructure)) {
    Write-Host "`n❌ Project structure test failed. Please check the missing files." -ForegroundColor Red
    exit 1
}

# Step 3: Clean up existing Docker resources
if (-not (Clean-Docker)) {
    Write-Host "`n❌ Docker cleanup failed. Please check the error messages above." -ForegroundColor Red
    exit 1
}

# Step 4: Build project from scratch
if (-not (Build-Project)) {
    Write-Host "`n❌ Build failed. Please check the error messages above." -ForegroundColor Red
    exit 1
}

# Step 5: Start services
if (-not (Start-Services)) {
    Write-Host "`n❌ Failed to start services. Please check the error messages above." -ForegroundColor Red
    exit 1
}

Write-Host "`n✅ Setup completed successfully!" -ForegroundColor Green 