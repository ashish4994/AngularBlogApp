#!/bin/sh

# generate-config.sh
# This script generates a config.json file with environment-specific variables

# Define the path to the config file
echo "Inside config.json:"
CONFIG_PATH="$(dirname "$0")/assets/config.json"

# Read environment variables or use default values
AUTH_API_URL=${AUTH_API_URL:-"http://localhost:3002/"}
BLOG_SERVICE_API_URL=${BLOG_SERVICE_API_URL:-"http://localhost:8082/"}
COMMENTS_SERVICE_URL=${COMMENTS_SERVICE_URL:-"http://localhost:5002/"}

# Ensure the assets directory exists
mkdir -p "$(dirname "$CONFIG_PATH")"

# Create the config.json file with the environment-specific values
cat > "$CONFIG_PATH" <<EOF
{
  "authApiUrl": "$AUTH_API_URL",
  "blogServiceApiUrl": "$BLOG_SERVICE_API_URL",
  "commentsServiceUrl": "$COMMENTS_SERVICE_URL"
}
EOF

echo "Generated configuration:"
cat "$CONFIG_PATH"

nginx -g 'daemon off;'