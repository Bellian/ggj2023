FROM node:lts-alpine AS dependency-base

WORKDIR /app
COPY ./frontend/package.json .
RUN npm install

FROM dependency-base AS production-base

COPY ./frontend/ .
RUN npx next build

FROM production-base AS production

CMD npx next dev