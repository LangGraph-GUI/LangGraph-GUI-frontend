# LangGraph-GUI/Dockerfile
FROM node:20

# Create and set the working directory
WORKDIR /app

# Copy all files to the container
COPY . .

# Install dependencies
RUN npm install

# Expose the port the app runs on
# EXPOSE 3000

# Start the application
CMD ["npm", "start"]
