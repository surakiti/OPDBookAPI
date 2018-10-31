FROM node:10.12.0-alpine

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3015

CMD [ "node", "./Server.js" ]
