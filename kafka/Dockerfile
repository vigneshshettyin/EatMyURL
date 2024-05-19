FROM node:20-alpine3.19

WORKDIR /var/kafka

COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "pubsub-kafka" ]