# Restaurant-Table-booking-
Restaurant Website Documentation
Introduction
Welcome to the documentation for the Restaurant Website project. This document provides a detailed guide to set up and run the restaurant website on your local machine using the project files stored in Google Drive.


Technologies Used
The restaurant website is built using the following technologies:

Node.js and npm (Node Package Manager)
MongoDB: Database management system
Express.js: Web application framework for Node.js
EJS (Embedded JavaScript): Templating language for generating HTML markup with JavaScript


Prerequisites:
Before setting up the restaurant website, ensure that you have the following prerequisites installed on your system:

Node.js and npm
MongoDB
Google Drive access to the project files
Installation and Setup
Follow the steps below to set up and run the restaurant website using the project files stored in Google Drive:

Download Project Files from Google Drive:
Download the project files from Google Drive, including all source code and dependencies listed in the package.json file.

Install Dependencies:
Open a terminal, navigate to the project directory, and run the following command to install the required dependencies:

npm install express mongoose ejs passport passport-local passport-local-mongoose connect-flash cookie-parser debug express-session http-errors morgan multer path uuid nodemon



Database Configuration:
Ensure that MongoDB is installed and running on your local machine.

Run the project by run this command in the terminal: 
npx nodemon

Project Structure
The project structure is organized as follows:

app.js: Main entry point of the application.
models/: Directory containing Mongoose models for interacting with the MongoDB database.
routes/: Directory containing route definitions for different parts of the application.
views/: Directory containing EJS templates for generating HTML views.
public/: Directory containing static assets such as CSS, JavaScript, and images.
Features
The restaurant website offers the following features:

User authentication and authorization for customer and admin access.
Table booking functionality with dynamic table allotment based on capacity.
Menu management for adding, updating, and deleting menu items.
Cart functionality for users to add and manage their orders.
Integration with MongoDB for data storage and retrieval.

Conclusion
Congratulations! You have successfully set up and run the restaurant website on your local machine using the project files stored in Google Drive. Feel free to explore the different features and functionalities of the website.
