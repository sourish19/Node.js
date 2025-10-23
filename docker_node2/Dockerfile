FROM node:25-alpine3.21

WORKDIR /home/app

COPY package*.json ./

RUN npm install

COPY src ./src

EXPOSE 3000

CMD ["npm","run","dev"]