FROM node:11 AS builder
COPY . .
RUN rm -rf node_modules
RUN yarn install
CMD yarn start