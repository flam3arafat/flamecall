FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001

ENV MONGODB_USERNAME=onyedika
ENV MONGODB_PASSWORD=password1015

CMD ["npm", "start"]