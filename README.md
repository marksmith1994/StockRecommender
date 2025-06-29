# 🤖 Stock Recommender

An AI-powered stock recommendation platform built with .NET 8 backend and Angular frontend. Features real-time stock data, sentiment analysis, and AI-powered portfolio optimization.

## 🚀 Features

- **Real-time Stock Data**: Live stock prices and market information
- **AI Sentiment Analysis**: News and social media sentiment scoring
- **Portfolio Optimization**: AI-powered investment recommendations
- **Currency Conversion**: Real-time USD to GBP conversion
- **Responsive Design**: Modern, mobile-friendly UI
- **Risk Assessment**: Conservative, Moderate, and Aggressive strategies

## 🛠 Tech Stack

### Backend (.NET 8)
- **API**: ASP.NET Core Web API
- **Core**: Business logic and models
- **Infrastructure**: External service integrations
- **Services**: Finnhub API, Sentiment Analysis, Portfolio Optimization

### Frontend (Angular 16+)
- **Framework**: Angular with TypeScript
- **UI**: Angular Material components
- **State Management**: RxJS observables
- **Styling**: SCSS with modern CSS features

### Development Tools
- **Docker**: Local development environment
- **Testing**: Jasmine/Karma for unit tests
- **Linting**: ESLint with Angular rules
- **Formatting**: Prettier for consistent code style

## 📋 Prerequisites

- Docker Desktop
- .NET 8 SDK (for local development without Docker)
- Node.js 18+ (for local development without Docker)

## 🏃‍♂️ Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd StockRecommender
```

### 2. Set Up Environment Variables
```bash
# Copy the example environment file
cp env.example .env

# Edit .env and add your API keys
# NEVER commit .env to version control!
```

### 3. Start with Docker (Recommended)
```bash
cd docker
docker-compose up --build
```

### 4. Access the Application
- **Frontend**: [http://localhost:4200](http://localhost:4200)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

## 🔧 Local Development (Without Docker)

### Backend
```bash
cd src/StockRecommender.API
dotnet restore
dotnet run
```

### Frontend
```bash
cd ui
npm install
npm start
```

## 🧪 Testing

### Unit Tests
```bash
# Frontend tests
cd ui
npm test

# Backend tests
cd src/StockRecommender.API
dotnet test
```

### E2E Tests (Optional)
```bash
cd ui
npm run e2e
```

## 📏 Code Quality

### Linting
```bash
cd ui
npm run lint
npm run lint:fix
```

### Formatting
```bash
cd ui
npm run format
npm run format:check
```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Finnhub API Configuration
FINNHUB_API_KEY=your-finnhub-api-key-here

# Application Settings
ASPNETCORE_ENVIRONMENT=Development
ASPNETCORE_URLS=http://+:80

# Frontend Configuration
NODE_ENV=development
```

**⚠️ Security Note**: Never commit `.env` files or real API keys to version control!

## 🏗 Project Structure

```
StockRecommender/
├── docker/                 # Docker configuration
├── src/                    # .NET Backend
│   ├── StockRecommender.API/
│   ├── StockRecommender.Core/
│   └── StockRecommender.Infrastructure/
├── ui/                     # Angular Frontend
│   ├── src/app/
│   │   ├── core/          # Singleton services
│   │   ├── features/      # Feature modules
│   │   ├── shared/        # Reusable components
│   │   └── models/        # TypeScript interfaces
│   └── ...
├── .env                    # Environment variables (not in git)
├── env.example            # Example environment file
└── README.md
```

## 🚀 Production Deployment

### Docker (Not Recommended for Production)
This Docker setup is designed for local development only. For production:

1. **Use Cloud-Native Services**:
   - Azure App Service / AWS Elastic Beanstalk
   - Azure Container Instances / AWS ECS
   - Kubernetes clusters

2. **Environment Variables**:
   - Use cloud provider's secret management
   - Azure Key Vault / AWS Secrets Manager
   - Never use Docker secrets for production

3. **Build Process**:
   ```bash
   # Frontend production build
   cd ui
   npm run build --configuration=production

   # Backend production build
   cd src/StockRecommender.API
   dotnet publish -c Release
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the coding standards:
   - Run `npm run lint` and `npm run format`
   - Write unit tests for new features
   - Update documentation as needed
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Code Standards
- Follow Angular style guide
- Use TypeScript strict mode
- Write meaningful commit messages
- Include tests for new features
- No secrets in code or configs

## 🔒 Security

- **API Keys**: Never hardcode or commit API keys
- **Environment Variables**: Use `.env` for local dev, cloud secrets for production
- **Docker**: Local development only, not for production secrets
- **Dependencies**: Regularly update packages for security patches

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Port Already in Use**:
   ```bash
   # Check what's using the port
   netstat -ano | findstr :5000
   # Kill the process or change ports in docker-compose.yml
   ```

2. **API Key Issues**:
   - Ensure `.env` file exists and has correct API key
   - Check that `.env` is not being ignored by Docker

3. **Angular Build Issues**:
   ```bash
   cd ui
   npm cache clean --force
   rm -rf node_modules
   npm install
   ```

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Search existing issues
3. Create a new issue with detailed information

---

**Happy Coding! 🎉**
