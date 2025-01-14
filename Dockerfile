# Build Stage
FROM node:22-alpine AS builder

RUN mkdir /usr/local/app
WORKDIR /usr/local/app

COPY ./ /usr/local/app
RUN npm install
RUN npm run build --prod --build-optimizer --verbose

# Runtime Stage
FROM nginx:latest
COPY --from=builder usr/local/app/dist/fotui/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
