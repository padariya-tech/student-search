const fs = require('fs');

// Read data from the JSON file
const rawData = fs.readFileSync('response.json', 'utf-8');

try {
  const jsonData = JSON.parse(rawData);

  if (jsonData.documents && Array.isArray(jsonData.documents)) {
    // Filter data where the first two characters of 'i' are '23'
    const filteredData = jsonData.documents.filter(item => item.i.substring(0, 2) === '23');

    // Write the filtered data to a new JSON file
    fs.writeFileSync('y23batch.json', JSON.stringify({ documents: filteredData }, null, 2));

    console.log('Filtered data saved to "y23batch.json"');
  } else {
    console.error('Error: JSON data is not in the expected format.');
  }
} catch (error) {
  console.error(`Error parsing JSON: ${error.message}`);
}
