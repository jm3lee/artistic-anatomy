# syntax=docker/dockerfile:1.6

FROM node:22-slim AS build
WORKDIR /workspace

# Copy Flashoffer React source so local file dependencies resolve.
COPY press/app/flashoffer-react ./press/app/flashoffer-react
RUN --mount=type=cache,target=/root/.npm \
  cd press/app/flashoffer-react \
  && npm ci \
  && npm run build

# Install anatomy app dependencies.
COPY app/anatomy/package.json app/anatomy/package-lock.json ./app/anatomy/
RUN --mount=type=cache,target=/root/.npm \
  cd app/anatomy \
  && npm ci

# Copy the anatomy app source code and build the production bundle.
COPY app/anatomy ./app/anatomy
RUN cd app/anatomy \
  && npm run build

FROM node:22-slim AS runner
ENV NODE_ENV=production
WORKDIR /workspace/app/anatomy
COPY --from=build /workspace/app/anatomy /workspace/app/anatomy
EXPOSE 4173
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]
