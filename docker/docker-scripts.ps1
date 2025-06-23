# Stock Recommender Docker Management Script
# Run this script from the docker directory

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("build", "start", "stop", "restart", "logs", "clean", "help")]
    [string]$Action = "help"
)

function Show-Help {
    Write-Host "Stock Recommender Docker Management Script" -ForegroundColor Green
    Write-Host "Usage: .\docker-scripts.ps1 -Action <action>" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Available actions:" -ForegroundColor Cyan
    Write-Host "  build   - Build all Docker images" -ForegroundColor White
    Write-Host "  start   - Start all services" -ForegroundColor White
    Write-Host "  stop    - Stop all services" -ForegroundColor White
    Write-Host "  restart - Restart all services" -ForegroundColor White
    Write-Host "  logs    - Show logs for all services" -ForegroundColor White
    Write-Host "  clean   - Clean up Docker resources" -ForegroundColor White
    Write-Host "  help    - Show this help message" -ForegroundColor White
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Yellow
    Write-Host "  .\docker-scripts.ps1 -Action build" -ForegroundColor White
    Write-Host "  .\docker-scripts.ps1 -Action start" -ForegroundColor White
}

function Build-Images {
    Write-Host "Building Docker images..." -ForegroundColor Green
    docker-compose build
}

function Start-Services {
    Write-Host "Starting services..." -ForegroundColor Green
    docker-compose up -d
    Write-Host "Services started!" -ForegroundColor Green
    Write-Host "Frontend: http://localhost:4200" -ForegroundColor Cyan
    Write-Host "Backend API: http://localhost:5000" -ForegroundColor Cyan
    Write-Host "Swagger: http://localhost:5000/swagger" -ForegroundColor Cyan
}

function Stop-Services {
    Write-Host "Stopping services..." -ForegroundColor Yellow
    docker-compose down
    Write-Host "Services stopped!" -ForegroundColor Green
}

function Restart-Services {
    Write-Host "Restarting services..." -ForegroundColor Yellow
    docker-compose down
    docker-compose up -d
    Write-Host "Services restarted!" -ForegroundColor Green
}

function Show-Logs {
    Write-Host "Showing logs..." -ForegroundColor Green
    docker-compose logs -f
}

function Clean-Docker {
    Write-Host "Cleaning Docker resources..." -ForegroundColor Yellow
    docker-compose down
    docker system prune -f
    docker volume prune -f
    Write-Host "Docker cleanup completed!" -ForegroundColor Green
}

# Main execution
switch ($Action) {
    "build" { Build-Images }
    "start" { Start-Services }
    "stop" { Stop-Services }
    "restart" { Restart-Services }
    "logs" { Show-Logs }
    "clean" { Clean-Docker }
    "help" { Show-Help }
    default { Show-Help }
} 