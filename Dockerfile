FROM node:latest

COPY . /app
WORKDIR /app

EXPOSE 9090

RUN npm install
CMD [ "npm", "start" ]