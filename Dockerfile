# Use the official Node.js image as a parent image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of the app to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
