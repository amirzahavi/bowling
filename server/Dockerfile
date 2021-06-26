FROM node:14-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:14-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --production

COPY --from=builder --chown=node:node /usr/src/app/dist ./dist

USER node

ENTRYPOINT [ "npm", "run", "start:prod" ]