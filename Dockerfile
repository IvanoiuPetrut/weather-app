# Multi-stage build for Vue.js Weather App

# Stage 1: Build the application
FROM node:16-alpine as build-stage

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy project files
COPY . .

# Set build-time environment variable
ARG VUE_APP_API_KEY
ENV VUE_APP_API_KEY=$VUE_APP_API_KEY

# Build the application
RUN yarn build

# Stage 2: Production stage with nginx
FROM nginx:stable-alpine as production-stage

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application from build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

