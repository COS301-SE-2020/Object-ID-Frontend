FROM node:latest as build
RUN apt-get update && apt-get upgrade -y

RUN mkdir /app
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm install -g @angular/cli@9.1.12
RUN ng build --output-path=dist

FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
