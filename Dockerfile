### STAGE 1: Build ###
FROM node:14 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/angular-starter-template /usr/share/nginx/html