.PHONY: help dev up build down logs test lint

help: ## Show this help message
	@echo "CMP - Call My Pods Development Commands"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $1, $2}'

dev: ## Start all services in development mode with hot-reloading
	@echo "🚀 Starting development environment..."
	docker-compose up --build

up: ## Start all services in detached mode
	docker-compose up -d

build: ## Build all services
	docker-compose build

down: ## Stop all services
	docker-compose down

logs: ## Follow logs from all services
	docker-compose logs -f

test: ## Run all tests
	@echo "🧪 Running tests..."
	docker-compose exec auth-service npm test
	docker-compose exec pod-service npm test

lint: ## Run linters
	@echo "🔍 Running linters..."
	docker-compose exec auth-service npm run lint
	docker-compose exec pod-service npm run lint