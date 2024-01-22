const axios = require('axios');
const fs = require('fs');

const url = 'https://ap-south-1.aws.data.mongodb-api.com/app/data-yubip/endpoint/data/v1/action/find';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYWFzX2RldmljZV9pZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsImJhYXNfZG9tYWluX2lkIjoiNjQwYTkzMjk5ZTc1Mzg0OWNmM2JmNzIyIiwiZXhwIjoxNzA1OTUwOTY5LCJpYXQiOjE3MDU5NDkxNjksImlzcyI6IjY1YWViN2YxYjZiOWZhOGY3MjQxNzEzMiIsInN0aXRjaF9kZXZJZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsInN0aXRjaF9kb21haW5JZCI6IjY0MGE5MzI5OWU3NTM4NDljZjNiZjcyMiIsInN1YiI6IjY0MGIyMDhjMzYwOGQxNWU1OGRmMDU5MSIsInR5cCI6ImFjY2VzcyJ9.rD0lIS_FwaDGeVudjaYjgecBNEfgkorf_Qvvtnciibk'
 
};

const payload = {
  dataSource: 'Cluster0',
  database: 'student_data',
  collection: 'student_data',
  filter: {},
  limit: 30000
  
};

// Make the POST request using axios
axios.post(url, payload, { headers })
  .then(response => {
    // Save the response content to a file
    fs.writeFileSync('response.json', JSON.stringify(response.data, null, 2));
    console.log('Response saved to "response.json"');
  })
  .catch(error => {
    console.error(`Error: ${error.response.status}\n${error.response.data}`);
  });
