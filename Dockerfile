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

# Stage 2: Serve the app using http-server
FROM node:18-alpine

# Install http-server globally
RUN npm install -g http-server

# Set the working directory
WORKDIR /app

# Copy the built application from the build stage
COPY --from=build /app/dist/out/browser/ ./

# Expose port 8080
EXPOSE 8080

# Start http-server
CMD ["http-server", "-p", "8080"]
