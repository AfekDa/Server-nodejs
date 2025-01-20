# Cost Management Application

## Overview

This application is developed using Express.js and Mongoose. It provides RESTful web services to manage cost items and user details.

## Endpoints

### Adding Cost Items
- **URL:** `https://localhost:3000/api/add`
- **Method:** `POST`
- **Description:** Adds a new cost item.
- **Request Body:**
  ```json
  {
    "userId": "string",
    "description": "string",
    "amount": "number",
    "date": "date"
  }
  ```
- **Response:**
  ```json
  {
    "userId": "string",
    "description": "string",
    "amount": "number",
    "date": "date"
  }
  ```

### Getting Monthly Report
- **URL:** `http://localhost:3000/api/report`
- **Method:** `GET`
- **Description:** Retrieves all cost items for a specific user in a specific month and year.
- **Query Parameters:**
  - `userId`: ID of the user
  - `month`: Month (1-12)
  - `year`: Year (YYYY)
- **Response:**
  ```json
  [
    {
      "userId": "string",
      "description": "string",
      "amount": "number",
      "date": "date"
    }
  ]
  ```

### Getting The Details of a Specific User
- **URL:** `http://localhost:3000/api/users/:id`
- **Method:** `GET`
- **Description:** Retrieves the details of a specific user.
- **Response:**
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "totalCosts": "number"
  }
  ```

### Developers Team
- **URL:** `http://localhost:3000/api/about`
- **Method:** `GET`
- **Description:** Retrieves the details of the development team.
- **Response:**
  ```json
  [
    {
      "firstName": "string",
      "lastName": "string"
    }
  ]
  ```

## Setup

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd NODEJS_PRO
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the server:
   ```sh
   node server.js
   ```

4. The server will be running on `http://localhost:3000`.

## Testing

You can test the endpoints using tools like Postman or curl.
