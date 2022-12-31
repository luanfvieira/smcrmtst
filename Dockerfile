#Build React app
FROM node:16 AS builder

WORKDIR /app
COPY . .
# Only Railway - change port nginx to 80
RUN yarn install && yarn build:railway:prod
# Only Railway

# Only fly.io - change port nginx to 8080
#RUN yarn install && yarn build:fly:prod
# Only fly.io

#Host the app from the build folder (/app)
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=builder /app/build .
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
#ENTRYPOINT ["nginx", "-g", "daemon off;"]