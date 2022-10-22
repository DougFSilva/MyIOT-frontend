FROM nginx:alpine
VOLUME /var/cache/nginx
COPY ./dist/myiot /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
