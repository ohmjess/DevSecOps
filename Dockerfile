# Stage 1: Build
FROM node:22 AS build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Production Image
FROM node:22-slim

WORKDIR /usr/src/app
COPY --from=build /usr/src/app /usr/src/app

# Install production dependencies only
RUN npm install --production

EXPOSE 3000
CMD ["node", "app.js"]
