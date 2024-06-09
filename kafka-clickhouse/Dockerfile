FROM node:20-alpine3.19

WORKDIR /var/kafka

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Add a health check to verify the application is running
# HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
#   CMD curl --fail http://localhost:8080/health || exit 1

CMD [ "npm", "run", "start" ]
