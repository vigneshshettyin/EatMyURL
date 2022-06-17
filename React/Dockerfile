#1. Base Image
FROM node:18-alpine3.15 as build 

#2. Working Dir
WORKDIR /react-app

#3. Bring package.json file
COPY package*.json .

#5. Install all dependencies
RUN yarn install

#6. Copy files from the current working directory of the local system WORKDIR
COPY . .

#7. Get the optimized build of react app
RUN yarn run build

#8. Base Image
FROM nginx:1.21.6-alpine

#9. Get the ngnix configurations
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

#10. Copy the build folder of the react-app to ngnix HTML directory
COPY --from=build /react-app/build /usr/share/nginx/html
