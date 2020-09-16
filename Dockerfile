FROM node:latest as build
RUN apt-get update && apt-get upgrade -y

RUN mkdir /app
WORKDIR /app
COPY package.json package-lock.json ./
RUN export NODE_OPTIONS=--max_old_space_size=4096
RUN npm install

COPY . .

RUN npm install -g @angular/cli@9.1.12
RUN ng build --prod --output-path=dist

FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
