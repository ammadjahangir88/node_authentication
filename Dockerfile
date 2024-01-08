# Use an official Node runtime as a parent image
FROM node:19.3.0
# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside Docker image
COPY . .

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define the command to run the app
CMD ["npm", "start"]
