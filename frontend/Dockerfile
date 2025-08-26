FROM node:18-alpine AS builder

WORKDIR /ng-app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build --

FROM nginx:1.25.4-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /ng-app/dist/in-church-challenge/browser /usr/share/nginx/html