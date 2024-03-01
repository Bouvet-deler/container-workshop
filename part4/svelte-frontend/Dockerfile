FROM node:18

WORKDIR /app

COPY . /app

RUN npm install

# In a production scenario, the app should be built and run in production mode
CMD [ "npm", "run", "dev" ]