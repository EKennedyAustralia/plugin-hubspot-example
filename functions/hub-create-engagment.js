/*
    Reference: https://developers.hubspot.com/docs/
    
    Need to move apiKey to Environment Variable.

    ACCESS CONTROL: Uncheck valid Twilio signature
*/
exports.handler = function(context, event, callback) {
    const axios = require('axios');
    const apiKey = context.HUBSPOT_API_KEY;
    let result = {};
    let ticketId = event.ticketId;
    let body = event.body;
    console.log(`ticketId: ${ticketId}`);
    console.log(`body: ${body}`);
    const objEngagement = {
        "engagement": {
            "active": true,
            "type": "NOTE"
        },
        "associations": {
            "ticketIds": [ticketId]
        },
        "metadata": {
            "body": body
            }
    };
    
    console.log(objEngagement);
    const urlEngagment = 'https://api.hubapi.com/engagements/v1/engagements?hapikey=' + apiKey;
    console.log(`Creating Engagement... `)
    axios.post(urlEngagment, objEngagement)
        .then(function (respnseEngagement) {
          // handle success
            console.log(`Engagement Response: ${respnseEngagement.engagement.id}`);
            callback(null, respnseEngagement);
            })
            .catch(function (error) {
              // handle error
                console.log(error);
                callback(null, error);
        });
        console.log(`Engagement Created`);
};