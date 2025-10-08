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
  && npm ci --include=dev

FROM node:22-slim AS runner
WORKDIR /workspace

# Copy the anatomy app source code and build the production bundle.
COPY --from=build /workspace/press/app/flashoffer-react /workspace/press/app/flashoffer-react
COPY app/anatomy ./app/anatomy
RUN cd app/anatomy \
  && npm run build

ENV NODE_ENV=dev
WORKDIR /workspace/app/anatomy
COPY --from=build /workspace/app/anatomy /workspace/app/anatomy
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
