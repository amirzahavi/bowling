FROM node:14-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.21

EXPOSE 80

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
