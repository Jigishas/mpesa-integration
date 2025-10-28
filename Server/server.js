const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const request = require('request');
const moment = require('moment');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const hostname = 'localhost';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

// Sample route for Mpesa authentication
app.get('/auth/mpesa', (req, res) => {
    // Logic for Mpesa authentication goes here
    var timestamp = moment().format('YYYYMMDDHHmmss');
    var password = Buffer.from(process.env.BUSINESS_SHORT_CODE + process.env.PASSKEY + timestamp).toString('base64');
    console.log({password}, timestamp);
    res.send('Mpesa authentication route');
});

app.get('/access_token', (req, res) => {
    getAccessToken()
        .then(token => res.json({ access_token: token }))
        .catch(err => res.status(500).json({ error: 'Failed to get access token' }));

});

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to Mpesa Integration Server');
});

app.get('/stkpush', (req, res) => {
    getAccessToken()
    .then(access_token => {
        // Logic for STK Push goes here
        const Url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
        auth="Bearer " + access_token;
        var timestamp = moment().format('YYYYMMDDHHmmss');
        var password = Buffer.from(process.env.BUSINESS_SHORT_CODE + process.env.PASSKEY + timestamp).toString('base64');

        request(
            {
                url: Url,
                method: "POST",
                headers: {
                    "Authorization": auth
                },
                json: {
                    "BusinessShortCode": process.env.BUSINESS_SHORT_CODE,
                    "Password": password,
                    "Timestamp": timestamp,
                    "TransactionType": "CustomerPayBillOnline",
                    "Amount": "1",
                    "PartyA": "254708374149",
                    "PartyB": process.env.BUSINESS_SHORT_CODE,
                    "PhoneNumber": "254743121169",
                    "CallBackURL": "http://localhost:5000/callback",
                    "AccountReference": "Dev Jose test",
                    "TransactionDesc": "Payment of Test"
                }
            },
            function (error, response, body){
                if(error){
                    console.error("STK Push Error: ", error);
                    res.status(500).json({ error: 'STK Push request failed' });
                } else {
                    console.log("STK Push Response: ", body);
                    res.json(body);
                }
            }
        )
    })
    .catch(err => res.status(500).json({ error: 'Failed to get access token' }));
});



function getAccessToken() {
    const consumerKey = process.env.CONSUMER_KEY;
    const consumerSecret = process.env.CONSUMER_SECRET;
    const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
    const auth = 'Basic ' + Buffer.from(consumerKey + ':' + consumerSecret).toString('base64');

    return new Promise((resolve, reject) => {
        request(
            {
                url: url,
                headers: {
                    'Authorization': auth
                }
            },
            function (error, response, body) {
                var jsonBody = JSON.parse(body);
                if(error){
                    reject(error);
                } else {
                    const access_token = jsonBody.access_token;
                    resolve(access_token);
                }

            }
        );
    });
}


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

