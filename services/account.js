// function startCreateAccount(user){
//     const axios = require('axios');

//     const options = {
//     method: 'POST',
//     url: 'https://broker-api.sandbox.alpaca.markets/v1/accounts',
//     headers: {
//         accept: 'application/json',
//         'content-type': 'application/json',
//         authorization: 'Basic Q0tJWDJHTUVZVjVCTlNKNFhZRUE6cE5zY1NjU0RWd1B3cm9GYXd3SjJ1aFJGRjdxbEFoemxoV29yaVJWbQ=='
//     },
//     data: {
//         contact:{
//         email_address:"abraha999@gmail.com",
//         phone_number:"",
//         street_address:"Lekki",
//         unit:"5",
//         city:"Ontario",
//         state:"AK",
//         postal_code:"876328",
//         },
//         identity: {
//         tax_id: "753-45-6389",
//         tax_id_type: 'USA_SSN',
//         date_of_birth: "1995-05-09",
//         country_of_tax_residence: "USA",
//         funding_source: ["business_income"],
//         given_name: "Abrahm1197",
//         family_name: "Awonde2287"
//         },
//         disclosures: {
//         is_control_person: true,
//         is_affiliated_exchange_or_finra: true,
//         is_politically_exposed: true,
//         immediate_family_exposed: true
//         },
//         agreements: 
//         [
//             {
//             agreement : "account_agreement",
//             signed_at: "2024-07-07T18:06:05Z",
//             ip_address: "185.13.21.99"
//             },
//             {
//             agreement :  "customer_agreement",
//             signed_at: "2024-07-07T18:06:05Z",
//             ip_address: "185.13.21.99"
//             },
//             {
//             agreement : "margin_agreement",
//             signed_at: "2024-07-07T18:06:05Z",
//             ip_address: "185.13.21.99"
//             }
//         ]
        
//     }
//     };

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//     throw new Error(error.message)
//   });
// }


// function fundAccount(){
//     const axios = require('axios');

//     const options = {
//         method: 'POST',
//         url: 'https://broker-api.sandbox.alpaca.markets/v1/accounts/ceb1bb92-b29d-4b91-8732-d20c84819871/transfers',
//         headers: {
//             accept: 'application/json',
//             'content-type': 'application/json',
//             authorization: 'Basic Q0tJWDJHTUVZVjVCTlNKNFhZRUE6cE5zY1NjU0RWd1B3cm9GYXd3SjJ1aFJGRjdxbEFoemxoV29yaVJWbQ=='
//         },
//         data: {
//             relationship_id: 'f14d6fe0-e1d1-4035-8890-ae391d69056e',
//             transfer_type: 'ach', 
//             direction: 'INCOMING', 
//             timing: 'immediate',
//             account_id: 'ceb1bb92-b29d-4b91-8732-d20c84819871',
//             amount: 500
//         }
//     };

//     axios
//     .request(options)
//     .then(function (response) {
//         console.log(response.data);
//     })
//     .catch(function (error) {
//         console.error(error);
//         throw new Error(error.message)
//     });
// }


// function createACHRelationship(){
//     const axios = require('axios');

// const options = {
//   method: 'POST',
//   url: 'https://broker-api.sandbox.alpaca.markets/v1/accounts/ceb1bb92-b29d-4b91-8732-d20c84819871/ach_relationships',
//   headers: {
//     accept: 'application/json',
//     'content-type': 'application/json',
//     authorization: 'Basic Q0tJWDJHTUVZVjVCTlNKNFhZRUE6cE5zY1NjU0RWd1B3cm9GYXd3SjJ1aFJGRjdxbEFoemxoV29yaVJWbQ=='
//   },
//   data: {
//     bank_account_type: 'CHECKING',
//     account_owner_name: 'Stoic Archimedes',
//     bank_account_number: '654678990',
//     bank_routing_number: '021000021',

//     }
// };

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//     throw new Error(error.message)
//   });
// }

// function createBankRelationship(){
//     const axios = require('axios');

//     const options = {
//         method: 'POST',
//         url: 'https://broker-api.sandbox.alpaca.markets/v1/accounts/account_id/recipient_banks',
//         headers: {accept: 'application/json', 
//             'content-type': 'application/json',
//             'authorization': 'Basic Q0tJWDJHTUVZVjVCTlNKNFhZRUE6cE5zY1NjU0RWd1B3cm9GYXd3SjJ1aFJGRjdxbEFoemxoV29yaVJWbQ=='

//         },
//         data: {
//             bank_code_type: 'ABA',
//             account_id: 'ceb1bb92-b29d-4b91-8732-d20c84819871',
//             name: 'Deutsche Bank AG',
//             bank_code: 'DEUTDEFF',
//             account_number: '541276679',

//         }
//     };

//     axios
//     .request(options)
//     .then(function (response) {
//         console.log(response.data);
//     })
//     .catch(function (error) {
//         console.error(error);
//     });
// }

// function getBankRelationships(){
//     const axios = require('axios');

// const options = {
//   method: 'GET',
//   url: 'https://broker-api.sandbox.alpaca.markets/v1/accounts/ceb1bb92-b29d-4b91-8732-d20c84819871/recipient_banks',
//   headers: {
//     accept: 'application/json',
//     authorization: 'Basic Q0tJWDJHTUVZVjVCTlNKNFhZRUE6cE5zY1NjU0RWd1B3cm9GYXd3SjJ1aFJGRjdxbEFoemxoV29yaVJWbQ=='
//   }
// };

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//     throw new Error(error.message)
//   });
// }

// function getACHRelationships(){
//     const axios = require('axios');

//     const options = {
//         method: 'GET',
//         url: 'https://broker-api.sandbox.alpaca.markets/v1/accounts/ceb1bb92-b29d-4b91-8732-d20c84819871/ach_relationships',
//         headers: {
//             accept: 'application/json',
//             authorization: 'Basic Q0tJWDJHTUVZVjVCTlNKNFhZRUE6cE5zY1NjU0RWd1B3cm9GYXd3SjJ1aFJGRjdxbEFoemxoV29yaVJWbQ=='
//         }
//     };

//     axios
//     .request(options)
//     .then(function (response) {
//         console.log(response.data);
//     })
//     .catch(function (error) {
//         console.error(error);
//     });
// }


const utility = require('./utility')

async function startCreateAccount(user) {
    const axios = require('axios');
    const postalCode = utility.generatePostalCode();
  const taxId = utility.generateTaxId();

  const options = {
    method: 'POST',
    url: `${process.env.ALPACA_BASE_URL}/v1/accounts`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Basic ${process.env.ALPACA_BROKER_AUTH}`
    },
    data: {
      contact: {
        email_address: user.email,
        phone_number: "",
        street_address: "Lekki",
        unit: "5",
        city: "Ontario",
        state: "AK",
        postal_code: "876328",
      },
      identity: {
        tax_id: taxId,
        tax_id_type: 'USA_SSN',
        date_of_birth: "1995-05-09",
        country_of_tax_residence: "USA",
        funding_source: ["business_income"],
        given_name: user.firstName,
        family_name: user.lastName
      },
      disclosures: {
        is_control_person: true,
        is_affiliated_exchange_or_finra: true,
        is_politically_exposed: true,
        immediate_family_exposed: true
      },
      agreements: [
        {
          agreement: "account_agreement",
          signed_at: "2024-07-07T18:06:05Z",
          ip_address: utility.generateIPAddress()
        },
        {
          agreement: "customer_agreement",
          signed_at: "2024-07-07T18:06:05Z",
          ip_address: utility.generateIPAddress()
        },
        {
          agreement: "margin_agreement",
          signed_at: "2024-07-07T18:06:05Z",
          ip_address: utility.generateIPAddress()
        }
      ]
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

    //   data: {
    //     bank_account_type: 'CHECKING',
    //     account_owner_name: 'Stoic Archimedes',
    //     bank_account_number: '654678990',
    //     bank_routing_number: '021000021',
    //   }

async function createACHRelationship(user, account_object) {
    const axios = require('axios');
    const accountNumber = utility.generateRandomAccountNumber();
    
    const options = {
      method: 'POST',
      url: `${process.env.ALPACA_BASE_URL}/v1/accounts/${account_object.account_id}/ach_relationships`,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Basic ${process.env.ALPACA_BROKER_AUTH}`
      },
        data: {
            bank_account_type: 'CHECKING',
            account_owner_name: user.firstName + " " + user.lastName,
            bank_account_number: accountNumber.toString(),
            bank_routing_number: '021000021',
        }
    };
  
    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  
  async function fundAccount(account_id, relationship_id) {
    const axios = require('axios');
    const options = {
      method: 'POST',
    //   url: 'https://broker-api.sandbox.alpaca.markets/v1/accounts/ceb1bb92-b29d-4b91-8732-d20c84819871/transfers',
        url: `${process.env.ALPACA_BASE_URL}/v1/accounts/${account_id}/transfers`,
        headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Basic ${process.env.ALPACA_BROKER_AUTH}`
      },
      data: {
        // relationship_id: 'f14d6fe0-e1d1-4035-8890-ae391d69056e',
        relationship_id: relationship_id,
        transfer_type: 'ach',
        direction: 'INCOMING',
        timing: 'immediate',
        account_id: account_id,
        amount: 500
      }
    };
  
    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }



  async function createBankRelationship(bank_relationship_object) {
    const axios = require('axios');
    const options = {
      method: 'POST',
      url: `${process.env.ALPACA_BASE_URL}/v1/accounts/${bank_relationship_object.account_id}/recipient_banks`,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Basic ${process.env.ALPACA_BROKER_AUTH}`
      },
    //   data: {
    //     bank_code_type: 'ABA',
    //     account_id: 'ceb1bb92-b29d-4b91-8732-d20c84819871',
    //     name: 'Deutsche Bank AG',
    //     bank_code: 'DEUTDEFF',
    //     account_number: '541276679',
    //   }
    data: {
        bank_code_type:  'ABA',
        account_id: bank_relationship_object.account_id ,
        name:  'Deutsche Bank AG',
        bank_code: 'DEUTDEFF',
        account_number: bank_relationship_object.account_number,
      }
    };
  
    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }


  async function getBankRelationships() {
    const axios = require('axios');
    const options = {
      method: 'GET',
      url: `${process.env.ALPACA_BASE_URL}/v1/accounts/ceb1bb92-b29d-4b91-8732-d20c84819871/recipient_banks`,
      headers: {
        accept: 'application/json',
        authorization: `Basic ${process.env.ALPACA_BROKER_AUTH}`
      }
    };
  
    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }


  async function getACHRelationships(account_id) {
    const axios = require('axios');
    const options = {
      method: 'GET',
      url: `${process.env.ALPACA_BASE_URL}/v1/accounts/${account_id}/ach_relationships`,
      headers: {
        accept: 'application/json',
        authorization: `Basic ${process.env.ALPACA_BROKER_AUTH}`
      }
    };
  
    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function getAccount(account_id) {
    const axios = require('axios');
    const options = {
      method: 'GET',
      url: `${process.env.ALPACA_BASE_URL}/v1/accounts/${account_id}`,
      //url: `https://broker-api.sandbox.alpaca.markets/dash/trading/accounts/${account_id}/account`
      //url: `https://broker-api.sandbox.alpaca.markets/v1/accounts/${account_id}/ach_relationships`,
      headers: {
        accept: 'application/json',
        authorization: `Basic ${process.env.ALPACA_BROKER_AUTH}`
      }
    };
  
    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  module.exports = {
    startCreateAccount,
    createBankRelationship,
    createACHRelationship,
    getACHRelationships,
    getAccount,
    fundAccount
}