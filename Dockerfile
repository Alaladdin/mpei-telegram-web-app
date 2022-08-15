FROM node:16 as builder

WORKDIR /usr/src/app

COPY package*.json .
RUN npm ci --foreground-scripts=true

COPY . .
RUN npm run build-only

FROM node:16-alpine

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./

EXPOSE 3020

