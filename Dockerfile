FROM node:24

# Create and set the working directory
WORKDIR /app

# Copy all files to the container
COPY . .

# Install dependencies
RUN npm install

RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]