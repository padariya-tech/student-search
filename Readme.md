# getting data from student search
 - go in getData (cd getData write in terminal) folder , run node getStudentdata.js in replace Authorization with access token for that request
 - store response in response.json file
 - using this response.json and filter y23 batch by running node y23batch.js get result in y23batch.json
 - used this file to write wing.js which contain two function first group data based on wing and second is print that data
 - run node wing.js file and stored result in groupedByWing.json 
 ## Install Dependencies 

      
npm install axios

 

# Student Search Backend

Welcome to the backend repository of our Student Search. 
stored above groupedByWing.json in mondodb data base 

## Technologies Used

- **Language:** JavaScript
- **Backend Framework:** Express.js
- **Database:** MongoDB
- **ORM:** Mongoose

## Key Features

- ** get Y23 Student Data **
- ** find students in given wing of perticular hall **
- ** check two stuents are wingies or not **
- ** find roomies of given student **
   

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone 
   https://github.com/padariya-tech/student-search.git
   cd student-search-main
   
   ```


## Install Dependencies 
```bash
      npm install dotenv
npm install cors
npm install express
npm install mongoose
npm install axios

   
    
```
## Set Up Environment Variables
by creating .env file inside main folder
 
- **PORT**=8000
- **MONGODB_URI**=mongodb+srv://nijpadariya:Nij125909%40%40%40@cluster0.w6nczc3.mongodb.net/
- **CORS_ORIGIN**= *


## Run The Server
** From Root
```bash
    npm run dev
```
   

## Api Structure
-  [API-REFERENCRE]
[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/31978635-8e00d6d3-d6cd-4f24-91f2-90c64a36f925?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D31978635-8e00d6d3-d6cd-4f24-91f2-90c64a36f925%26entityType%3Dcollection%26workspaceId%3Deec5af4f-82d1-4a9c-8946-373679c6b122)

