# build-stage
FROM node:14.18.3-alpine as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production-stage
FROM alpine:latest as production-stage
COPY --from=build-stage /app/dist /app
VOLUME [ "/app" ]
