
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies (incorporating cache)
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build frontend and backend
RUN npm run build

# Stage 2: Run
FROM node:20-alpine

WORKDIR /app

# Copy built artifacts and production deps
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server ./server
COPY --from=builder /app/shared ./shared
COPY --from=builder /app/drizzle.config.ts ./
COPY --from=builder /app/tsconfig.json ./

# Expose port
EXPOSE 5000

# Start command
ENV NODE_ENV=production
CMD ["npm", "start"]
