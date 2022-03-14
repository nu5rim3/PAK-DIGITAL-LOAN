FROM fra.ocir.io/lolctech/fxapiuser/node:14-alpine
RUN mkdir /app
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . /app/
RUN npm run build --production

EXPOSE 3000
ENTRYPOINT ["node", "server.js"]