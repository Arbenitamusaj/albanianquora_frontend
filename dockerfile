# Use a slim Node.js image for reduced size
FROM node:alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies (use --no-prod to avoid installing dev deps)
RUN npm install --production

# Switch to a non-root user for security
USER node:node

# Create a new image based on builder for runtime
FROM node:alpine

# Copy only the production-ready app files
COPY --from=builder /app ./

# Expose the port your app runs on (replace 8080 with your actual port)
EXPOSE 8080

# Start the app using the command defined in package.json
CMD [ "npm", "run" ]
