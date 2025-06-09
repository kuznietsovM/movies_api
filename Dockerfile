FROM node:22-alpine as build

WORKDIR /app
COPY package.json tsconfig.json yarn.lock ./
RUN yarn

COPY src src

ENTRYPOINT yarn watch