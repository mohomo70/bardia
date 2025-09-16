# Docker Setup for Phaser.js Game

This project is now fully dockerized for both development and production environments.

## Files Created

- `Dockerfile.dev` - Development environment with hot reload
- `Dockerfile` - Production environment with nginx
- `docker-compose.yml` - Easy orchestration for both environments
- `nginx.conf` - Optimized nginx configuration for production
- `.dockerignore` - Optimized build context

## Quick Start

### Development

Run the development environment with hot reload:

```bash
# Using docker-compose (recommended)
docker-compose --profile dev up --build

# Or using Docker directly
docker build -f Dockerfile.dev -t phaser-game-dev .
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules phaser-game-dev
```

The development server will be available at `http://localhost:3000` with hot reload enabled.

### Production

Run the production environment:

```bash
# Using docker-compose (recommended)
docker-compose --profile prod up --build

# Or using Docker directly
docker build -t phaser-game-prod .
docker run -p 80:80 phaser-game-prod
```

The production server will be available at `http://localhost` (port 80).

### Custom Port for Production

If you want to run production on a different port:

```bash
# Using docker-compose
docker-compose --profile prod up prod-custom --build

# Or using Docker directly
docker run -p 8080:80 phaser-game-prod
```

## Docker Compose Profiles

The project uses Docker Compose profiles to manage different environments:

- `dev` - Development environment with hot reload
- `prod` - Production environment on port 80
- `prod-custom` - Production environment on port 8080

## Development Features

- **Hot Reload**: Changes to source code are automatically reflected
- **Volume Mounting**: Source code is mounted for live editing
- **Node Modules**: Cached in a separate volume for faster rebuilds
- **Port 3000**: Standard development port

## Production Features

- **Multi-stage Build**: Optimized build process
- **Nginx**: High-performance web server
- **Gzip Compression**: Reduced bandwidth usage
- **Static Asset Caching**: Optimized caching headers
- **Security Headers**: Basic security improvements
- **Client-side Routing**: Proper handling of SPA routing

## Building and Running

### Build Images

```bash
# Development image
docker build -f Dockerfile.dev -t phaser-game-dev .

# Production image
docker build -t phaser-game-prod .
```

### Run Containers

```bash
# Development
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules phaser-game-dev

# Production
docker run -p 80:80 phaser-game-prod
```

## Environment Variables

### Development
- `NODE_ENV=development`

### Production
- `NODE_ENV=production`

## Troubleshooting

### Port Already in Use

If you get a "port already in use" error:

```bash
# Check what's using the port
lsof -i :3000  # for development
lsof -i :80    # for production

# Kill the process or use a different port
docker run -p 3001:3000 phaser-game-dev  # different host port
```

### Permission Issues (Linux/macOS)

If you encounter permission issues with volume mounting:

```bash
# Fix ownership
sudo chown -R $USER:$USER .

# Or run with user mapping
docker run -u $(id -u):$(id -g) -p 3000:3000 -v $(pwd):/app phaser-game-dev
```

### Clean Up

```bash
# Remove containers
docker-compose down

# Remove images
docker rmi phaser-game-dev phaser-game-prod

# Remove all unused Docker resources
docker system prune -a
```

## File Structure

```
.
├── Dockerfile.dev          # Development Dockerfile
├── Dockerfile              # Production Dockerfile
├── docker-compose.yml      # Docker Compose configuration
├── nginx.conf              # Nginx configuration
├── .dockerignore           # Docker ignore file
├── DOCKER.md               # This documentation
└── ...                     # Your project files
```

## Notes

- The development environment uses volume mounting for live code changes
- The production environment uses a multi-stage build for optimization
- Nginx is configured with gzip compression and proper caching headers
- The `.dockerignore` file excludes unnecessary files from the build context
- Both environments are configured to work out of the box