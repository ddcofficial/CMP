.PHONY: help dev test lint

help: ## Show this help message
	@echo "CMP - Call My Pods Development Commands"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $1, $2}'

dev: ## Start all services in development mode
	@echo "🚀 Starting development environment..."
	docker-compose -f infrastructure/docker-compose/docker-compose.dev.yml up --build

test: ## Run all tests
	@echo "🧪 Running tests..."
	(cd services/auth-service && npm test)
	(cd services/pod-service && npm test)

lint: ## Run linters
	@echo "🔍 Running linters..."
	(cd services/auth-service && npm run lint)
	(cd services/pod-service && npm run lint)