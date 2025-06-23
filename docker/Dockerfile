# Use the official .NET 8.0 runtime as the base image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Use the official .NET 8.0 SDK as the build image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the solution file and restore dependencies
COPY ["StockRecommender.sln", "./"]
COPY ["src/StockRecommender.API/StockRecommender.API.csproj", "src/StockRecommender.API/"]
COPY ["src/StockRecommender.Core/StockRecommender.Core.csproj", "src/StockRecommender.Core/"]
COPY ["src/StockRecommender.Infrastructure/StockRecommender.Infrastructure.csproj", "src/StockRecommender.Infrastructure/"]

RUN dotnet restore "src/StockRecommender.API/StockRecommender.API.csproj"

# Copy the rest of the source code
COPY . .
WORKDIR "/src/src/StockRecommender.API"

# Build the application
RUN dotnet build "StockRecommender.API.csproj" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "StockRecommender.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Final stage/image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Create a non-root user
RUN adduser --disabled-password --gecos '' appuser && chown -R appuser /app
USER appuser

ENTRYPOINT ["dotnet", "StockRecommender.API.dll"] 