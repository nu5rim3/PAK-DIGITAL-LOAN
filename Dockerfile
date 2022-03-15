# build environment
FROM fra.ocir.io/lolctech/fxapiuser/node:14.17-alpine as build-step
WORKDIR /app

ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH
ENV PUBLIC_URL https://pofuslbuat01/pakoman-digital-loan

COPY package.json ./

RUN npm install --production

COPY . ./

RUN npm run build

# production environment
FROM nginx:1.17.1-alpine

COPY --from=build-step /app/build /usr/share/nginx/html/pakoman-digital-loan
COPY --from=build-step /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

