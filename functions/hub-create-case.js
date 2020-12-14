/*
    Reference: https://developers.hubspot.com/docs/
    
    Need to move apiKey to Environment Variable.

    ACCESS CONTROL: Uncheck valid Twilio signature
*/
exports.handler = function(context, event, callback) {
    const axios = require('axios');
    const apiKey = context.HUBSPOT_API_KEY;
    let result = {};
    let subject = event.subject;
    let content = event.content;
    console.log(`subject: ${subject}`);
    console.log(`content: ${content}`);
    const objTicket = [
        {
          "name": "subject",
          "value": subject
        },
        {
          "name": "content",
          "value": content
        },
        {
          "name": "hs_pipeline",
          "value": "0"
        },
        {
          "name": "hs_pipeline_stage",
          "value": "1"
        }
    ];
    console.log(objTicket);
    const urlTicket = 'https://api.hubapi.com/crm-objects/v1/objects/tickets?hapikey=' + apiKey;
    const urlEngagment = 'https://api.hubapi.com/engagements/v1/engagements?hapikey=' + apiKey;
    console.log(`Creating Ticket... `)
    axios.post(urlTicket, objTicket)
        .then(function (responseTicket) {
          // handle success
            // console.log(responseTicket);
            let ticketNumber = responseTicket.data.objectId;
            console.log(`Ticket Number: ${ticketNumber}`);
            // result.data = response.data;
            const objEngagement = {
                "engagement": {
                    "active": true,
                    "type": "NOTE"
                },
                "associations": {
                    "ticketIds": [ticketNumber]
                },
                "metadata": {
                    "body": "Replace with Content"
                }
            };
            console.log(`Object Engagement: ${objEngagement.associations.ticketIds}`);
            result = ticketNumber;
            callback(null, ticketNumber);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            callback(null, error);
        });
        console.log(`Ticket Created: ${result}`);
};