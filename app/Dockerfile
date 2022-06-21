# syntax=docker/dockerfile:1
FROM node:alpine
WORKDIR /code
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /code
COPY package-lock.json /code
RUN npm install
COPY . /code/
