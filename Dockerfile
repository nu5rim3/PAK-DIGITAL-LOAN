FROM node:14-alpine as build-step

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN yarn
RUN yarn build

# SERVICE : rootportal
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/build /usr/share/nginx/html