FROM node:24 AS build

WORKDIR /app

COPY . /app
RUN npm ci --verbose
RUN npm run build --verbose

RUN ls -la /app

FROM node:24-alpine AS prod

WORKDIR /app

RUN ls -la /app
COPY --from=build /app/.output/ /app
RUN ls -la /app

CMD [ "node", "/app/server/index.mjs" ]
