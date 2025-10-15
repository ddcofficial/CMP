#!/bin/bash

# This script sets up the Developer Experience (DX) toolkit for the CMP project.
# It installs and configures ESLint, Prettier, Husky, lint-staged, Nodemon, and Winston.

# --- Exit on error ---
set -e

echo "🚀 Starting Developer Experience (DX) Toolkit Setup..."

# --- 1. Install root-level dev dependencies ---
echo "📦 Installing root-level dev dependencies (husky, lint-staged)..."
npm install -D husky lint-staged

# --- 2. Configure Husky and lint-staged ---
echo "Husky and lint-staged configuration..."
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"

# Add lint-staged configuration to package.json
node -e " \
const fs = require('fs'); \
const pkg = JSON.parse(fs.readFileSync('package.json')); \
pkg['lint-staged'] = { \
  'services/**/*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'], \
  'frontend/**/*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'] \
}; \
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2)); \
"

# --- 3. Create Prettier configuration ---
echo "🎨 Creating Prettier configuration..."
cat <<EOL > .prettierrc
{
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100
}
EOL

# --- 4. Create ESLint configuration ---
echo "🔍 Creating ESLint configuration..."
cat <<EOL > .eslintrc.json
{
  "extends": ["eslint:recommended", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  },
  "parserOptions": {
    "ecmaVersion": 2021
  },
  "env": {
    "node": true,
    "es6": true
  }
}
EOL

# --- 5. Install dependencies and configure each service ---
SERVICES_DIR="services"
for service in "$SERVICES_DIR"/*/; do
  if [ -f "$service/package.json" ]; then
    SERVICE_NAME=$(basename "$service")
    echo "---"
    echo "🔧 Configuring service: $SERVICE_NAME"

    # Install service-specific dev dependencies
    echo "📦 Installing dev dependencies for $SERVICE_NAME (eslint, prettier, nodemon, winston)..."
    (cd "$service" && npm install -D eslint prettier nodemon winston)

    # Add scripts to package.json
    echo "📜 Adding scripts to $SERVICE_NAME/package.json..."
    node -e " \
    const fs = require('fs'); \
    const pkgPath = '$service/package.json'; \
    const pkg = JSON.parse(fs.readFileSync(pkgPath)); \
    pkg.scripts.dev = 'nodemon src/index.js'; \
    pkg.scripts.lint = 'eslint src --fix'; \
    pkg.scripts.format = 'prettier --write src'; \
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2)); \
    "
  fi
done

echo "✅ DX Toolkit setup complete!"
echo "Run 'source setup-dev-toolkit.sh' to apply the changes."