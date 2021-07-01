# MedApp (Final Year Project)
This is the __back-end__ source code for this project. Front-end source code can be seen by [clicking here](https://github.com/MarkSweeney96/medapp-frontend).

MedApp is a full stack web application built using the MERN Stack of apps. This includes:
- MongoDB
- ExpressJS
- ReactJS
- NodeJS

IBM's Carbon Design System was also used for the front end visual design. 

# Project Showcase
To view a showcase of this project, click the link below. This includes a detailed description of the project along with screenshots of the visual design and a video presentation going through the entire application.

## [https://www.marksweeney.io/portfolio-of-work/medapp](https://www.marksweeney.io/portfolio-of-work/medapp)
If you want to setup and run this application on your own computer, follow the steps below. Before you start, you will need to download or clone the code for the application's front-end and back-end onto your computer.

## Database Setup
You will need to create your own MongoDB database to host all your application data. This will include user account, appointment and prescription details. Any passwords stored in the database will be hashed to for security reasons. The easiest way to set this us is using MongoDB Atlas. This is a platform that allows you to create a MongoDB database cluster and host it in the cloud. [This video tutorial](https://www.youtube.com/watch?v=tON8dUrvquE) will give you a full walk-through on how to set this up. Please note: on the last step (timestamp 4:52) select 'Connect Your Application' instead of using the shell method. Ensure your driver is set to Node.js version 3.6 or later. Then copy and paste your your connection string into the .env file. This will be explained below. 

## .env File
In the application's back-end source code (this repository) folder, create a new file called '__.env__'. This will contain the environment variables for the database and JWT (JSON Web Token). Below is what this file should look like. 

```
MONGODB_CONNECTION_STRING=x
JWT_SECRET=y
```
Replace 'x' with your MongoDB Atlas connection string ensuring to replace __<password>__ with the password for your database user and __'myFirstDatabase'__ with your database name.

Replace 'y' with a randomly generated string. I recommend using [this random string generator](https://www.random.org/strings/).

You __do not__ need to change any of the front-end code to get this application running on your machine.

## Installation
You will need to make sure NodeJS and npm are installed on your computer to run this application on your machine.

Below are the commands you need to run to install and run this application on your computer.



cd to the relevant folder (front or back-end) and run the commands in a terminal window. 

__Back-end__
```
npm install
node index
```

__Front-end__
```
npm install
npm start
```

Once these commands run successfully, the MedApp application will be running locally on your computer. To use it go to http://localhost:3000/ in a web browser (Google Chrome is recommended). Please note the front-end will take slightly longer to start running.

### Sources
A Udemy course published by [Joost Bijlsma](https://www.udemy.com/user/joost-bijlsma/) was used as a learning tool and source to help build this project. This course can be found at [https://www.udemy.com/course/mern-stack-complete-full-stack-apps-from-scratch/](https://www.udemy.com/course/mern-stack-complete-full-stack-apps-from-scratch/).
