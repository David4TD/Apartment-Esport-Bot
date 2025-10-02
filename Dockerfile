FROM node:18-alpine

WORKDIR /app

# Install deps first for caching
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy source
COPY src ./src
COPY .env.example ./
COPY README.md ./

# Create data dir for state
VOLUME ["/data"]

# Healthcheck to ensure bot stays alive
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s CMD node -e "process.exit(0)"

CMD ["npm", "start"]
