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

# Copy only package.json first for layer caching
COPY app/package*.json ./

# Install dependencies (this will build better-sqlite3 if needed)
RUN npm install

# Copy the rest of your application
COPY app/ .

# Set environment variables and port
ENV PORT=2323
EXPOSE 2323

# Start the app
CMD ["node", "app.js"]