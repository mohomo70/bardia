#!/bin/bash

# Docker run script for Phaser.js Game
# Usage: ./docker-run.sh [dev|prod|prod-custom]

set -e

case "${1:-dev}" in
    "dev")
        echo "🚀 Starting development environment..."
        docker-compose --profile dev up --build
        ;;
    "prod")
        echo "🚀 Starting production environment on port 80..."
        docker-compose --profile prod up prod --build
        ;;
    "prod-custom")
        echo "🚀 Starting production environment on port 8080..."
        docker-compose --profile prod up prod-custom --build
        ;;
    *)
        echo "Usage: $0 [dev|prod|prod-custom]"
        echo ""
        echo "  dev          - Start development environment (port 3000)"
        echo "  prod         - Start production environment (port 80)"
        echo "  prod-custom  - Start production environment (port 8080)"
        exit 1
        ;;
esac