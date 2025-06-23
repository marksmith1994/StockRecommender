# Multi-stage build for Angular
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build for production
RUN npm run build

# Development stage
FROM node:18-alpine AS development

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose port for development server
EXPOSE 4200

# Start development server with host binding for Docker
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "2000"]

# Production stage
FROM nginx:alpine AS production

# Copy built app from build stage
COPY --from=build /app/dist/stock-recommender-ui/browser /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 
