const fs = require('fs');

// Read filtered data from the JSON file
function groupStudentsByHAndWing(inputFileName, outputFileName) {
    try {
      // Read data from the specified input file
      const rawData = fs.readFileSync(inputFileName, 'utf-8');
      const filteredData = JSON.parse(rawData);
  
      if (filteredData.documents && Array.isArray(filteredData.documents)) { // checking that the data is in the expected format
        // Group students first by 'h' and then, within each 'h' group, subgroup by Wing ('r')
        const groupedByHandR = filteredData.documents.reduce((acc, student) => {
          const h = student.h || 'Unknown'; // Default to 'Unknown' if 'h' is not available
        //   console.log(student);
          acc[h] = acc[h] || {};
          
          const wing = student.r ? student.r.charAt(0) : 'Unknown'; // Default to 'Unknown' if 'r' is not available
          
          acc[h][wing] = acc[h][wing] || [];
          acc[h][wing].push(student);
          acc[h][wing].sort((a, b) => (a.r > b.r) ? 1 : ((b.r > a.r) ? -1 : 0)); // sort based on their 'w' and room 
          
          return acc;
        }, {});
  
        // Optionally, write the grouped data to a new JSON file
        fs.writeFileSync(outputFileName, JSON.stringify(groupedByHandR, null, 2));
        console.log(`Grouped data saved to "${outputFileName}"`);
      } else {
        console.error('Error: Filtered data is not in the expected format.');
      }
    } catch (error) {
      console.error(`Error reading or parsing JSON: ${error.message}`);
    }
  }
  
  // Example usage:

function retrieveDataFromGroupedFile(fileName) {
    try {
      // Read data from the specified file
      const rawData = fs.readFileSync(fileName, 'utf-8');
      const groupedData = JSON.parse(rawData);
  
      // Access and print data from the grouped structure
     
      console.log(JSON.stringify(groupedData, null, 2));

  
    } catch (error) {
      console.error(`Error reading or parsing JSON: ${error.message}`);
    }
  }
  
  // Example usage:
  groupStudentsByHAndWing('y23batch.json', 'groupedByWing.json');
  retrieveDataFromGroupedFile('groupedByWing.json');