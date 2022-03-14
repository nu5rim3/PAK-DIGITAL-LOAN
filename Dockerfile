FROM fra.ocir.io/lolctech/fxapiuser/node:14-alpine
RUN mkdir /app
WORKDIR /app
COPY build/* /app/
COPY server.js /app

EXPOSE 3000
ENTRYPOINT ["node", "server.js"]