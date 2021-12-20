FROM nginx:stable-alpine

COPY ./public/ /usr/share/nginx/html/ec/

EXPOSE 80

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/ec/environment/env.template.js > /usr/share/nginx/html/ec/environment/env.js && exec nginx -g 'daemon off;'"]
