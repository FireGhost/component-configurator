FROM node:24 AS build

WORKDIR /app

COPY . /app
RUN npm ci --verbose
RUN npm run build --verbose

FROM node:24-alpine AS prod

WORKDIR /app

COPY --from=build /app/.output/ /app

CMD [ "node", "/app/server/index.mjs" ]
