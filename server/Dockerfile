# Use a more recent Node.js runtime as a parent image
FROM node:16

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

CMD ["npm", "run dev"]