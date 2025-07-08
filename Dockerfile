# syntax=docker/dockerfile:1

FROM node:18-alpine

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy all files
COPY . .

# Build all apps
RUN pnpm run build