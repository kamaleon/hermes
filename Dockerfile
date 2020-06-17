FROM node:12-alpine

RUN mkdir -p /home/node/app/node_modules && mkdir -p /home/node/app/dist && chown -R node:node /home/node/app

WORKDIR /home/node/app

RUN apk --no-cache add python make g++

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .
