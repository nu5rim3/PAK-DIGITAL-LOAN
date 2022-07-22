# build environment
FROM fra.ocir.io/lolctech/fxapiuser/node:14.17-alpine as build-step
WORKDIR /app

ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

# RUN npm cache clean --force
# RUN npm install --no-package-lock --production

COPY . ./

# RUN npm run build

# production environment
ARG CUSTOM_BUILD_VERSION
ARG CUSTOM_BUILD_DATE
ARG CUSTOM_BUILD_UID

ARG NGINX_VERSION 1.21.6

FROM fra.ocir.io/lolctech/fxapiuser/nginx:${NGINX_VERSION}-alpine AS builder

ARG CUSTOM_BUILD_VERSION
ARG CUSTOM_BUILD_DATE
ARG CUSTOM_BUILD_UID

ARG NGINX_VERSION 1.21.6
ARG NGINX_HEADERS_MORE_VERSION 0.33

RUN wget "http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz" -O nginx.tar.gz && \
    wget "https://github.com/openresty/headers-more-nginx-module/archive/v${NGINX_HEADERS_MORE_VERSION}.tar.gz" -O headers-more.tar.gz

RUN apk add --no-cache --virtual .build-deps \
  git \
  gcc \
  libc-dev \
  make \
  openssl-dev \
  pcre-dev \
  zlib-dev \
  linux-headers \
  curl \
  gnupg \
  libxslt-dev \
  gd-dev \
  geoip-dev

RUN mkdir -p /app/src

# Reuse same cli arguments as the nginx:alpine image used to build
RUN CONFARGS=$(nginx -V 2>&1 | sed -n -e 's/^.*arguments: //p') \
	tar -zxC /app/src -f "nginx.tar.gz"

RUN tar -zxvC /app/src -f "headers-more.tar.gz"

RUN HEADERSMOREDIR="/app/src/headers-more-nginx-module-0.33" && \
  cd /app/src/nginx-$NGINX_VERSION && \
  ./configure --without-http_autoindex_module --with-compat $CONFARGS --add-dynamic-module=$HEADERSMOREDIR && \
  make && make install

FROM fra.ocir.io/lolctech/fxapiuser/nginx:${NGINX_VERSION}-alpine as mobix-cams-digital-loan-web

COPY --from=builder /usr/local/nginx/modules/ngx_http_headers_more_filter_module.so /usr/local/nginx/modules/ngx_http_headers_more_filter_module.so

COPY --from=build-step /app/build /usr/share/nginx/html/pakoman-digital-loan
COPY --from=build-step /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]