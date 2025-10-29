const axios = require('axios');

async function testStkPush() {
    try {
        console.log('Sending request to http://localhost:5000/stkpush with phoneNumber: 254743121169, amount: 1');
        const response = await axios.post('http://localhost:5000/stkpush', {
            phoneNumber: '254743121169',
            amount: 1
        });
        console.log('Response status:', response.status);
        console.log('Response data:', response.data);
    } catch (error) {
        console.error('Error occurred:');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
    }
}

testStkPush();
