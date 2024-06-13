FROM node:latest

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000
EXPOSE 3300

CMD [ "npm", "start" ]