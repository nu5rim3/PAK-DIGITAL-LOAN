# build environment
FROM fra.ocir.io/lolctech/fxapiuser/node:14-alpine as build-step
WORKDIR /app

ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install --production

COPY . ./

RUN npm run build

# production environment
FROM nginx:1.19.10-alpine
COPY --from=build /app/build /usr/share/nginx/html

COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]