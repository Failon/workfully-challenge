ARG NODE_VERSION=18.0.0

FROM node:${NODE_VERSION}-slim as base
WORKDIR /usr/src/app
EXPOSE 3000

FROM base as builder
COPY package*.json ./
RUN npm ci
COPY . .
COPY src/app/dependency-injection ./tmp/dependency-injection
RUN rm -rf ./tmp/dependency-injection/index.ts
RUN npm run clean
RUN npm run build

FROM base as prod
ENV NODE_ENV production
COPY package*.json ./
RUN npm ci --production
USER node
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/tmp/dependency-injection ./dist/app/dependency-injection
CMD ["npm", "start"]

FROM base as test
ENV NODE_ENV test
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
USER node
COPY . .
RUN npm test