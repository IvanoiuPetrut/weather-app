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

The project includes an automated workflow that:

1. Triggers on push to `master` or `main` branches
2. Builds the Docker image
3. Pushes the image to Docker Hub with multiple tags:
   - `latest` (for the default branch)
   - Branch name (e.g., `main`, `master`)
   - Git SHA (e.g., `main-abc1234`)

### Setting Up GitHub Secrets

To enable the GitHub Actions workflow, you need to add the following secrets to your GitHub repository:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add the following secrets:

   - `DOCKERHUB_USERNAME`: Your Docker Hub username
   - `DOCKERHUB_TOKEN`: Your Docker Hub access token (create one at https://hub.docker.com/settings/security)

### Workflow File Location

The workflow is defined in `.github/workflows/docker-build-push.yml`

## Pulling and Running from Docker Hub

Once the image is pushed to Docker Hub, you can pull and run it:

```bash
# Pull the latest image
docker pull <your-dockerhub-username>/weather-app:latest

# Run the container
docker run -p 8080:80 <your-dockerhub-username>/weather-app:latest
```

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

