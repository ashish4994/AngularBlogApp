# Stage 1: Build the Angular application
FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build -- --output-path=./dist/out

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy a new configuration file from your project
COPY nginx.conf /etc/nginx/nginx.conf

# Set the working directory to Nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default Nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /app/dist/out/browser .

# Copy the generate-config.sh script to the container
COPY generate-config2.sh ./

# Make sure the generate-config.sh script is executable
RUN chmod +x ./generate-config2.sh

# Expose port 80 for the Nginx server
EXPOSE 80

# Then start Nginx in the foreground
CMD ["./generate-config2.sh"]
