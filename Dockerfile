FROM node:18


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 2119

CMD ["npm", "start"]
