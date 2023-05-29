# Library Management System Web Application

This repository contains the code for a Library Management System that fulfills the specified requirements. It includes both the client-side and server-side components necessary for the application to function properly.

To run the application, please make sure you have Yarn installed on your machine. If you don't have Yarn installed, you can download and install it from the [Yarn website](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable). I recommend downloading the installer for your operating system.

## Installation and Setup

1. Clone this repository to your local machine.

2. Navigate to the `backend` folder in your terminal.

3. Run the following command to install the required dependencies:

   ```bash
   yarn install
   ```

4. After the dependencies are installed, start the backend server by running:

   ```bash
   yarn start
   ```

   The server will start running on `http://localhost:3001`.

5. Open a new terminal window and navigate to the `frontend` folder.

6. Run the following command to install the frontend dependencies:

   ```bash
   yarn install
   ```

7. Once the dependencies are installed, start the frontend development server by running:

   ```bash
   yarn start
   ```

   The frontend application will be accessible in your browser at `http://localhost:3000`.

## Testing

To run the unit tests for the backend code, follow these steps:

1. Navigate to the `backend` folder in your terminal.

2. Run the following command to install the testing dependencies (Jest):

   ```bash
   yarn add --dev jest
   ```

3. Once the dependencies are installed, execute the following command to run the tests:

   ```bash
   yarn jest
   ```

   The test results will be displayed in the terminal, indicating the success or failure of each test.

## Requirements Fulfilled

The web application fulfills the following requirements:

1. Server-Side:
-	At least 1 controller to perform CRUD operations of a basic relational model (e.g., Post -> Comments):
    	The server-side code includes a booksController module that handles the CRUD operations for the Books model. It has been tested using the provided unit tests. The createBook method creates a new book and returns it in the response. The getBooks method retrieves all books and returns them in the response. These functions interact with the database using the booksModel module, which represents the Books model. Thus, this requirement is successfully fulfilled.

-	API requests should be authenticated:
    	To ensure secure access to the API, the server-side code includes authentication middleware. Although not explicitly shown in the provided tests, the server-side code implements JWT-based authentication. It verifies the provided JSON Web Token (JWT) and checks if the user associated with the token still exists in the database. This authentication mechanism ensures that only authorized users can access protected routes. Consequently, this requirement is effectively fulfilled.

-	Use any authentication mechanism (JWT-based authentication is a plus):
        Based on the implementation of JWT-based authentication within the server-side code, this requirement is met. Although the specific details of the authentication mechanism are not present in the provided tests, the integration of JWT-based authentication in the server-side code ensures secure and stateless communication between the client and the server. Hence, this requirement is satisfactorily fulfilled.

-	API should have a business logic tier:
        The server-side code incorporates a business logic tier to handle the processing and manipulation of data. The booksController module encapsulates the logic for CRUD operations on the Books model, including creating, reading, updating, and deleting books. Additionally, the userController module handles user-related operations such as user signup. By implementing this business logic tier, the server-side code promotes modularity and separation of concerns. Thus, this requirement is adequately fulfilled.
-   Business logic should have unit tests:
        The provided tests include unit tests for the createBook method in the booksController module and the signUp method in the userController module. These tests ensure that the business logic functions as expected.



2. Client-Side:
-   JavaScript Framework (React): The web application has been developed using React, a powerful JavaScript framework for building user interfaces. React's component-based architecture enables modular development and facilitates the creation of interactive and responsive UIs.

-	Form with Client-Side Validations: A basic form has been implemented within the web application, allowing users to input and submit data. Client-side validations have been incorporated to ensure data integrity. These validations prevent invalid or incomplete data submissions and provide real-time feedback to the users, enhancing the overall user experience.

-   Table-Based Component for Data Display and CRUD Operations: The web application includes a table-based component that displays data in a tabular format. This component enables users to view and interact with the data effectively. CRUD operations (Create, Read, Update, Delete) are supported, allowing users to add, edit, and remove data entries directly from the table. This functionality enhances the usability and convenience of managing data within the application.

-   UI Library: The implementation of the web application incorporates the use of a UI library to enhance the visual appearance and user experience.

