Node.js Application with Sequelize and PostgreSQL

This repository contains a Node.js application that interacts with a PostgreSQL database using Sequelize ORM.

## Prerequisites

Before running the application, ensure you have the following installed:

=> Node.js (v12.x or higher)
=> npm (Node Package Manager)
=> PostgreSQL (v9.x or higher)

## Getting Started

Follow these steps to get the application up and running:

1. Clone the Repository
   Clone this repository to your local machine:
   => git clone https://github.com/karthikAnand810/Authenticate9.git
   => cd Authenticate9

2. Install Dependencies
   Install the required npm packages:
   => npm install

3. Set Up Database
   Create a PostgreSQL database and ensure you have the credentials ready. Update the .env file in the root directory with your database configuration:
   => DB_NAME=your_database_name
   => DB_USER=your_database_user
   => DB_PASSWORD=your_database_password
   => DB_HOST=localhost
   => DB_DIALECT=postgres

4. Start the Server
   Start the Node.js server:
   => node server.js

The server should now be running at http://localhost:5000.

## Application Structure

=> server.js: Entry point of the application where the Express server is configured.
=> config: Sequelize configuration file where the database connection is established.
=> models/: Directory containing Sequelize model definitions.
=> routes/: Directory containing route definitions for handling HTTP requests.
=> controllers/: Directory containing controller functions to handle business logic.
=> middlewares/: Directory for middleware functions used in request processing (e.g., authentication middleware).
=> scripts/: Directory for scripts that perform tasks such as data seeding, database backups, etc.
=> utils/: Directory for utility functions that can be used across different parts of the application.

## Postman Collection

Use the provided Postman collection to interact with the API endpoints and test various functionalities:

Download the Postman Collection: (https://vendor-supplier-portal.postman.co/workspace/Vendor-Supplier-Portal~42a5a964-a0c6-4a57-8d8c-6f5434b2bc7e/collection/28536652-860438e2-e1aa-490e-9fe9-12d97630e056?action=share&creator=28536652&active-environment=28536652-75d311de-b7f1-4712-9ff0-ab77d9037b49)

Import this collection into Postman to explore and test the API endpoints defined in your application.

## Contributing

Feel free to contribute to this project by submitting pull requests or raising issues. Your contributions are valuable for improving the application and enhancing its functionality.

## License

This project is licensed under the MIT License.
