FROM node:11 AS builder
COPY . .
ARG PUBLIC_URL
ARG API_URL
ENV REACT_APP_PUBLIC_URL=$PUBLIC_URL
ENV REACT_APP_API_URL=$API_URL
RUN yarn build
RUN npm install -g serve
CMD serve -l $PORT -s build 
