# Stage 1: Build the application
FROM node:18.17.0 AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Prepare the runtime image
FROM node:18.17.0

WORKDIR /app

# Copy the build output from the builder stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy necessary files for runtime
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Install production dependencies
RUN npm install --production

# Set the command to run the Next.js application
CMD ["node", "server.js"]
