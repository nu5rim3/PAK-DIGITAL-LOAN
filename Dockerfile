FROM fra.ocir.io/lolctech/fxapiuser/node:14-alpine
RUN mkdir /app
WORKDIR /app
COPY . /app

EXPOSE 3000
ENTRYPOINT ["node", "server.js"]