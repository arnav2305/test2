# Use the official Node.js image
FROM node:21-alpine

# Set working directory
WORKDIR /applogiin

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Start the application
CMD ["node", "server.js"]
