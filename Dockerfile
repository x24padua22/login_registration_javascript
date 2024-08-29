FROM node

RUN mkdir -p /var/www/your-wall

WORKDIR /var/www/your-wall

COPY package.json ./

RUN npm install

RUN npm install -g nodemon 

COPY . .

EXPOSE 3000