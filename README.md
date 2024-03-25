# Blogs app

## Description

Blogs App is a simple web application for exploring blogs. It allows users to authenticate using Google OAuth via Passport, and then browse through a collection of blogs. The application is built with Node.js and uses MongoDB with Mongoose for data storage. Redis is used for session management.

This project consists of two folders: `client` and `backend`. The `client` folder contains the front-end React application, while the `backend` folder contains the Node.js backend.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) - JavaScript runtime

### Installation

You can run the application either locally or with Docker. Follow the appropriate instructions below:

#### Running Locally

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/your-repository.git
    ```

2. Navigate to the project directory:

    ```bash
    cd your-repository
    ```

3. Install dependencies for both client and backend:

    ```bash
    cd client
    npm install

    cd ../backend
    npm install
    ```

4. Update the configuration files with the required keys for MongoDB and Google OAuth:

    - `config/dev.js`: Update this file with your keys (development)
    - `config/dev.js`: Update this file with your keys (production)

5. Start both client and backend servers:

    ```bash
    # In the client directory
    cd client
    npm start

    # In the backend directory
    cd ../backend
    npm start
    ```

    The client should be running on [http://localhost:3000](http://localhost:3000), and the backend on [http://localhost:5000](http://localhost:5000).

#### Running with Docker

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/your-repository.git
    ```

2. Navigate to the project directory:

    ```bash
    cd your-repository
    ```

3. Make sure you have Docker and Docker Compose installed on your machine.

4. Update the configuration files with the required keys for MongoDB and Google OAuth:

    - `config/dev.js`: Update this file with your keys (development)
    - `config/dev.js`: Update this file with your keys (production)

5. Run the following command to start the application with Docker Compose:

    ```bash
    docker-compose up --build
    ```

    This command will build the Docker images and start the containers for the client, backend, and Redis services.

    The client should be accessible on [http://localhost](http://localhost), and the backend on [http://localhost:5000](http://localhost:5000).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
