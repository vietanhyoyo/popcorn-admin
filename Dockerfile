FROM node:18.10.0
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build
EXPOSE 4000
CMD ["npm","run","build-serve"]