# Docker Setup Guide

This document explains how to build and run the Weather App using Docker, and how the automated CI/CD pipeline works.

## Prerequisites

- Docker installed on your machine
- Docker Hub account (for pushing images)
- GitHub repository secrets configured (for CI/CD)

## Building the Docker Image Locally

To build the Docker image locally:

```bash
docker build -t weather-app .
```

## Running the Container

To run the container locally:

```bash
docker run -p 8080:80 weather-app
```

Then open your browser and navigate to `http://localhost:8080`

## Docker Image Details

The Dockerfile uses a multi-stage build:

1. **Build Stage**: Uses Node.js 16 Alpine to install dependencies and build the Vue.js application
2. **Production Stage**: Uses Nginx Alpine to serve the built static files

This approach results in a much smaller final image (~25MB) compared to including the full Node.js environment.

## GitHub Actions CI/CD

The workflow in `.github/workflows/deploy.yml` runs on every push to `main` (or manually from the Actions tab) and:

1. Builds the Docker image, passing `VUE_APP_API_KEY` as a build argument
2. Pushes it to the GitHub Container Registry as `ghcr.io/ivanoiupetrut/weather-app`, tagged `latest` and with the commit SHA
3. Copies `deploy/compose.yml` to `~/apps/weather` on the VPS over SSH and restarts the container with the new image

On the VPS, Traefik routes `weather.petrut.dev` to the container and handles HTTPS with Let's Encrypt.

### GitHub Secrets

- `VUE_APP_API_KEY` (in the `docker-hub` environment): the WeatherAPI key baked into the build
- `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`, `VPS_KNOWN_HOSTS` (repository secrets): SSH access to the VPS

The registry login uses the workflow's built-in `GITHUB_TOKEN`, so no registry secret is needed.

## Nginx Configuration

The application uses a custom Nginx configuration (`nginx.conf`) that:

- Enables gzip compression for better performance
- Adds security headers
- Handles Vue Router's SPA routing (redirects all routes to index.html)
- Caches static assets for 1 year
- Disables caching for index.html to ensure updates are served immediately

## Docker Compose (Optional)

If you want to use Docker Compose, create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  weather-app:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

Then run:

```bash
docker-compose up -d
```

## Troubleshooting

### Build fails with "ENOENT: no such file or directory"

Make sure all files are committed and the `.dockerignore` file is not excluding necessary files.

### Container starts but app doesn't load

Check the Nginx logs:

```bash
docker logs <container-id>
```

### Port already in use

Change the host port in the `docker run` command:

```bash
docker run -p 3000:80 weather-app
```

