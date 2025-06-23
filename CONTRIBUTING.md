# 🤝 Contributing to Stock Recommender

Thank you for your interest in contributing to Stock Recommender! This document provides guidelines and information for contributors.

## 🚀 Quick Start

### Prerequisites
- **Backend**: .NET 8 SDK
- **Frontend**: Node.js 20+ and npm
- **Docker**: Docker Desktop (for local development)

### Setup Development Environment
```bash
# Clone the repository
git clone https://github.com/yourusername/stock-recommender.git
cd stock-recommender

# Copy environment variables
cp env.example .env
# Edit .env with your API keys

# Start development environment
./setup-dev.ps1
```

## 📋 Development Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes
- Follow the existing code style
- Add tests for new functionality
- Update documentation as needed

### 3. Code Quality Checks
```bash
# Frontend
cd ui
npm run lint
npm run test
npm run build

# Backend
cd src/StockRecommender.API
dotnet build
dotnet test
```

### 4. Commit Your Changes
```bash
git add .
git commit -m "feat: add new feature description"
```

### 5. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```

## 🏗️ Project Structure

### Backend Architecture
```
src/
├── StockRecommender.API/          # Web API layer
├── StockRecommender.Core/         # Business logic & models
└── StockRecommender.Infrastructure/ # External services
```

### Frontend Architecture
```
ui/src/app/
├── core/                          # Core services & guards
├── shared/                        # Reusable components
└── features/                      # Feature modules
```

## 📝 Code Standards

### TypeScript/Angular
- Use TypeScript strict mode
- Follow Angular style guide
- Use standalone components
- Implement proper error handling

### C#/.NET
- Follow C# coding conventions
- Use async/await patterns
- Implement proper exception handling
- Add XML documentation

### General
- Write meaningful commit messages
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful variable names

## 🧪 Testing

### Frontend Testing
```bash
cd ui
npm run test                    # Run all tests
npm run test -- --watch        # Run tests in watch mode
npm run test -- --coverage     # Run tests with coverage
```

### Backend Testing
```bash
cd src/StockRecommender.API
dotnet test                    # Run all tests
dotnet test --verbosity normal # Run with detailed output
```

## 🐛 Bug Reports

When reporting bugs, please include:
- **Description**: Clear description of the issue
- **Steps to Reproduce**: Step-by-step instructions
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: OS, browser, versions
- **Screenshots**: If applicable

## 💡 Feature Requests

When requesting features, please include:
- **Description**: Clear description of the feature
- **Use Case**: Why this feature is needed
- **Mockups**: Visual examples if applicable
- **Priority**: High/Medium/Low

## 📚 Documentation

- Update README.md for major changes
- Add inline code documentation
- Update API documentation if needed
- Include setup instructions for new features

## 🔒 Security

- Never commit API keys or secrets
- Use environment variables for sensitive data
- Report security issues privately
- Follow secure coding practices

## 🎯 Pull Request Guidelines

### Before Submitting
- [ ] Code follows project standards
- [ ] Tests pass locally
- [ ] Documentation is updated
- [ ] No console.log statements
- [ ] No hardcoded secrets

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
```

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

## 📞 Getting Help

- **Issues**: Create GitHub issues for bugs/features
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check README.md and DEVELOPMENT.md

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to Stock Recommender! 🚀 