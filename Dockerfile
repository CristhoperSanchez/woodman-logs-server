FROM node:24-slim  

# Install build dependencies for native modules like better-sqlite3
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    libsqlite3-dev \
 && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files first to optimize caching
COPY app/package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application source code
COPY app/ ./

# Set environment variables and expose port
ENV PORT=2323
EXPOSE 2323

# Start the app
CMD ["node", "app.js"]
