ARG NODE_ENV=production
ARG  NODE_VERSION
FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /build
COPY package.json .
COPY package-lock.json .

RUN npm ci --cache .npm --prefer-offline

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]