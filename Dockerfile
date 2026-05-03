# Stage 1: Build the React application
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built application from the previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server, injecting the Cloud Run $PORT (or 8080 locally) into the config
CMD sed -i -e "s/listen 80;/listen ${PORT:-8080};/g" /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
