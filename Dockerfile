# build environment
FROM fra.ocir.io/lolctech/fxapiuser/node:14-alpine as build-step
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

# production environment
EXPOSE 3000
ENTRYPOINT [ "node", "server.js" ]