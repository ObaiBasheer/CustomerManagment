# CustomerManagment
Overview
This repository contains the implementation of a Customer Management application, as per the provided scenario. The application is a CRUD (Create, Read, Update, Delete) system for managing customers with the additional functionality of creating addresses for customers through a background job.


#Technologies Used
Frontend: Angular 17
Backend: .NET 6
Database: Postgres, managed through Entity Framework
Background Job: Hangfire library
#How It Works
Customer Management
Create Customer: The application allows users to create new customers through the frontend using CRUD operations.

Update and Delete Customer: Users can edit and delete existing customers.

#Background Job with Hangfire
Upon adding a new customer, the backend initiates a background job using the Hangfire library. This job creates a new address for the customer every 1 minute.

#Addresses Page
View Addresses: Each customer has a button that redirects to their addresses page.

Auto-Update Table: The addresses page displays a table of addresses related to the customer, which auto-updates as the background job creates new addresses.

#Additional Features
Customer Name Update: Users have the ability to update the customer's name.

Location Column: The location column in the addresses table is populated with random strings, and a GUID is used for identification.

Deletion Cascade: When deleting a customer, all addresses related to them are automatically deleted, and the background job is removed.

Repository Structure
API/: Contains the .NET 6 backend implementation.
client/: Contains the Angular frontend implementation.




Thank you for reviewing  Customer Management application!
