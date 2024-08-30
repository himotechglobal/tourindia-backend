## Project - tourindia-api

This repository contains the backend code for an application built using Node.js and Express.js. It provides RESTful APIs for various functionalities related to Sign in, Sign up and Explore Places. The application uses Mongodb as its database and includes features like jwt token auth.

## Prerequisites

Before running the application, make sure you have the following software installed on your machine:

- Node.js (>=18.x.x)
- Mongodb Compass (>=1.35.x)
- A code editor (preferably Visual Studio Code)

## Installation


### 1. Clone this repository to your local machine:

- open any terminal in your local machine here we are using bash

```bash
$ git clone https://github.com/himotechglobal/tourindia-backend.git
$ cd tourindia-backend
$ npm install
```


### 2. Application Configuration

  The application uses environment variables for configuration. To set up the necessary variables, follow these steps:

**Step 1: Create a `.env` file by copying .env.example**
Create a file named `.env` by copying .env.example in the root directory of your project. This file will store all the required environment variables with their corresponding values.

**Step 2: Set the environment variables**
Open the `.env` file in a text editor and add the following lines:

- PORT=<port_number>
- MONGO_URI=<database_uri>
- JWT_SECRET=<random_secret_key>



*Replace `<port_number>`, `<database_uri>`, and `<random_secret_key>`   with the appropriate values for your setup. Also, make sure to fill in the other variables according to your application's requirements.*


*Environment Variables:*

The following environment variables need to be set for the application to function correctly:

- `PORT`: The port number on which the server will run.
- `MONGO_URI`: The URI for the database connection.
- `JWT_SECRET`: The secret key to be used to create and decode JWT. 

Make sure to replace the placeholders with the actual values you used in the `.env` file.

Remember to keep the `.env` file secure and never commit it to version control systems to protect sensitive information.

That's it! Your application should now be properly configured using environment variables.

**Step 3: Use the application**
- Usage

- To start the application, run the following command in your terminal or command prompt:

```bash
$ node index.js
```

If you have nodemon installed and want to use it for development purposes to automatically restart the server whenever changes are made to the code, you can use the following command:

```bash
nodemon
```

*Ensure that you are in the root directory of the project when running these commands. Also, make sure you have Node.js and npm (Node Package Manager) installed on your system before executing the commands.*
 
#### *Database Connection:*
  The application establishes a database connection and performs a test query every 90 seconds to ensure the connection is active.

#### *Error Handling:*
  Any errors that occur during the execution of API requests will be handled and returned as JSON responses with appropriate error messages.
