# syntax=docker/dockerfile:1.6

# Multi-stage build used for both local development and production deployments.
# 1. base: shared Node.js runtime for dependency installs.
# 2. flashoffer-react-deps/build: compile shared Flashoffer components consumed by the landing app.
# 3. dev: install landing dependencies, build the static output, and serve Vite for local development.
# 4. production: ship the built static assets behind nginx.

FROM node:22-slim AS base
WORKDIR /workspace

FROM base AS flashoffer-react-deps
WORKDIR /workspace/press/app/flashoffer-react
COPY press/app/flashoffer-react/package.json press/app/flashoffer-react/package-lock.json ./
RUN npm ci

FROM flashoffer-react-deps AS flashoffer-react-build
COPY press/app/flashoffer-react /workspace/press/app/flashoffer-react
RUN npm run build

FROM flashoffer-react-build AS dev
ENV NODE_ENV=dev
WORKDIR /workspace/app/anatomy
# Install only the landing app dependencies here to keep cache reuse tight when
# Flashoffer shared packages change independently. Copy the shared landing React
# package first so the file dependency resolves during installation.
COPY app/anatomy/package.json app/anatomy/package-lock.json ./
RUN npm ci
# Rely on the globally installed Vite CLI to serve the already-built assets in
# development, keeping the container entrypoint simple.
RUN npm install vite
COPY app/anatomy /workspace/app/anatomy
# Build the static output once so both the dev server and production image share
# identical assets.
# RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

FROM nginx:1.27-alpine AS production
WORKDIR /usr/share/nginx/html
# nginx expects its config in `/etc/nginx/conf.d/default.conf`; this file sets up
# the SPA routing required by the landing app.
COPY app/anatomy/nginx.conf /etc/nginx/conf.d/default.conf
# Pull the prebuilt assets from the dev stage so we only maintain one build
# pipeline for both development and production images.
COPY --from=dev /workspace/app/anatomy/build/landing ./
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
