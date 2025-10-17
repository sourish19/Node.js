FROM ubuntu

RUN apt-get update
RUN apt install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x -o /tmp/nodesource_setup.sh
RUN  bash /tmp/nodesource_setup.sh
RUN apt install -y nodejs
# At this point nodejs is installed in our image

COPY index.js /home/app/index.js
COPY package.json /home/app/package.json
COPY package-lock.json /home/app/package-lock.json
# Copy the source code  

# change the working directory
WORKDIR /home/app

# install dependencies -- node_modules
RUN npm install

# now build this image using docker build -t my-app .
# it will throw error since curl command is not available inside the image