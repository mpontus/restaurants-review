FROM node:11 AS builder
RUN npm install -g serve
COPY build build
CMD serve -l $PORT -s build 
