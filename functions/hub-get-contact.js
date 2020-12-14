/*
    Reference: https://developers.hubspot.com/docs/methods/tickets/get_ticket_by_id
    
    Need to move apiKey to Environment Variable.

    ACCESS CONTROL: Uncheck valid Twilio signature
*/
exports.handler = function(context, event, callback) {
  const axios = require('axios');
  const _ = require('lodash');
  let result = {};
  let from = event.from;
  const url = 'https://api.hubapi.com/contacts/v1/search/query?q=' + from + '&hapikey=' + context.HUBSPOT_API_KEY;
  axios({
      method: 'get',
      url: url,
      headers: {'content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
  })
      .then(function (response) {
        // handle success
          let contact = response.data.contacts[0];
          console.log(contact);
          result.fullName = `${contact.properties.firstname.value} ${contact.properties.lastname.value}`;
          result.flexWorker = `${contact.properties.flexworker.value}`;
          result.crmid = `${contact.vid}`;
          result.crmAddress = `${contact.properties.address.value} ${contact.properties.city.value} ${contact.properties.state.value} ${contact.properties.zip.value}`;
          result.crmNotes = `${contact.properties.customer_notes.value}`;
          result.email = `${contact.properties.email.value}`;
          result.firstName = `${contact.properties.firstname.value}`;
          result.lastName = `${contact.properties.lastname.value}`;
          console.log(result.fullName);
          console.log(result);
          callback(null, result);
  })
  .catch(function (error) {
    // handle error
      console.log(`Error: ${error}`);
      callback(null, error);
  });
};