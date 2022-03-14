# build environment
FROM fra.ocir.io/lolctech/fxapiuser/node:14-alpine as build-step
WORKDIR /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

# production environment
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 