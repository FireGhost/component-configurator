ARG NODE_VERSION=24

FROM node:${NODE_VERSION} AS build

WORKDIR /app

COPY --exclude=node_modules . /app
RUN npm ci --verbose
RUN npm run build --verbose

FROM node:${NODE_VERSION}-alpine AS prod

WORKDIR /app

ENV NODE_ENV=production
EXPOSE 3000

COPY --from=build /app/.output/ /app

CMD [ "node", "/app/server/index.mjs" ]
