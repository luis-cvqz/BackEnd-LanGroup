FROM node:latest

COPY . /app
WORKDIR /app

EXPOSE 3000
EXPOSE 3300

RUN npm install
CMD [ "npm", "start" ]