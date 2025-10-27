# You can use most Debian-based base images
FROM node:21-slim

# Install curl and git
RUN apt-get update && apt-get install -y curl git && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY compile_page.sh /usr/local/bin/compile_page.sh
RUN chmod +x /usr/local/bin/compile_page.sh

# Install dependencies and customize sandbox
WORKDIR /home/user/nextjs-app

RUN git clone https://github.com/grillsdev/nextjs-e2b-template .

# Install dependencies from package.json
RUN npm install

# Move the Nextjs app to the home directory and remove the nextjs-app directory
RUN mv /home/user/nextjs-app/* /home/user/ && rm -rf /home/user/nextjs-app