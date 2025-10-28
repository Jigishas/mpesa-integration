import React, { useState } from 'react'
import './App.css'

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/stkpush', {
        method: 'GET', // Note: This should probably be POST, but keeping GET as per server route
        headers: {
          'Content-Type': 'application/json',
        },
        // For GET, data is sent via query params, but since server doesn't use it, leaving as is
      });
      const data = await response.json();
      setMessage(JSON.stringify(data, null, 2));
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  }

  return (
    <>
      <div className='flex bg-green-500 mt-2 mb-2 ml-2 mr-2 rounded items-center'>
        <h1 className='block text-white text-2xl font-bold'>Mpesa Integration Client</h1><br />
        <form className='ml-auto' onSubmit={HandleSubmit}>
          <label htmlFor="phone number" className='block text-bold pl-1'>phone number</label>
          <input
            type="number"
            name="phone number"
            id="phone number"
            placeholder='2547XXXXXXXX'
            className='ml-2 p-2 rounded'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          /><br /><br />
          <label htmlFor="amount" className='block text-bold pl-1'>Amount</label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder='Amount'
            className='ml-2 p-2 rounded'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          /><br /><br />
          <button
            type='submit'
            className='bg-white text-green-500 font-semibold py-2 px-4 rounded hover:bg-gray-200'
          >
            Connect Mpesa
          </button>
        </form>
      </div>
      {message && <pre className='mt-4 p-4 bg-gray-100 rounded'>{message}</pre>}
    </>
  )
}

export default App
