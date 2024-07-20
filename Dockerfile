FROM node:22.4.1-bookworm-slim

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

CMD [ "npm","run","start" ]