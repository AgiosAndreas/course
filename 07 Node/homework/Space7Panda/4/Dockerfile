FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY / /usr/src/app/

RUN npm i

EXPOSE 8080

CMD ["node", "main.js"]