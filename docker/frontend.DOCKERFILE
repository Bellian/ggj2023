FROM node:lts-alpine AS dependency-base

WORKDIR /app
COPY ./frontend/package.json .
RUN npm install --omit=dev
RUN npm install sharp

FROM dependency-base AS production-base

COPY ./frontend/ .
CMD npx next build

FROM production-base AS production

CMD npx next start