
function generateRandomAccountNumber() {
    const min = 100000000; // Minimum 9-digit number
    const max = 999999999; // Maximum 9-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generatePostalCode() {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  function generateTaxId() {
    // Helper function to generate a random number between min and max (inclusive)
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    // Generate each part of the tax ID
    const part1 = getRandomInt(100, 999); // 3 digits
    const part2 = getRandomInt(10, 99);   // 2 digits
    const part3 = getRandomInt(1000, 9999); // 4 digits
  
    // Construct the tax ID string
    const taxID = `${part1}-${part2}-${part3}`;
  
    return taxID;
  }
  function generateIPAddress() {
    // Helper function to generate a random number between min and max (inclusive)
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    // Generate each octet of the IP address
    const octet1 = getRandomInt(0, 255);
    const octet2 = getRandomInt(0, 255);
    const octet3 = getRandomInt(0, 255);
    const octet4 = getRandomInt(0, 255);
  
    // Construct the IP address string
    const ipAddress = `${octet1}.${octet2}.${octet3}.${octet4}`;
  
    return ipAddress;
  }

  module.exports = {
    generatePostalCode,
    generateTaxId,
    generateRandomAccountNumber,
    generateIPAddress
  }

