# User Management System

This project is a user management mini application built with Nest.js, TypeScript, and MySQL (using Sequelize as ORM). It allows for user management, role handling, and secure authentication using JSON Web Tokens (JWT).

## Table of Contents

- [Features](#features)
- [Modules](#modules)
- [Installation](#installation)
- [Usage](#usage)


## Features

- Secure authentication with JWT.
- User management: create, update, delete users.
- Role management with different permission levels.

## Modules

### Auth Module

The authentication module handles user authentication, including:

- Registering new users.
- Logging in with credential validation.
- Generating and managing JWT tokens.
- Protecting sensitive routes.

### User Module

The user module manages user data and operations:

- Create, read, update, and delete user profiles.
- Fetch user details.
- Assign roles to users.

### Role Module

The role module handles user roles and permissions:

- Create and manage roles.
- Assign permissions to roles.
- Ensure role-based access control for various routes.

## Installation

To install the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/dbslm31/user-roles-management-nestjs.git

2. Navigate to the project directory:
   ```bash
   cd user-management-system

3. Install the dependencies:
   ```bash
   npm install

4. Create a `.env` file in the root directory and configure your environment variables.


## Usage
To start the application, run:
   ```bash
   npm run start
```
The application will be running by default on `http://localhost:3000`

