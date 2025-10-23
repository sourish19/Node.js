# Base Image
FROM node:22.20.0-alpine3.21 

# Copy the source code
COPY src /home/app/src
COPY package.json /home/app/package.json
COPY package-lock.json /home/app/package-lock.json
COPY tsconfig.json /home/app/tsconfig.json

# Change the working directory
WORKDIR /home/app

# Install dependencies -- node_modules
RUN npm install