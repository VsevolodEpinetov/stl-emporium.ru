import axios from 'axios';
const requestIp = require('request-ip');

export default async function handler(req, res) {
  const clientIp = requestIp.getClientIp(req);
  const iPIsGood = clientIp == '127.0.0.1' || clientIp == '::1' || clientIp == '::ffff:127.0.0.1';

  if (!iPIsGood) {
    res.status(404);
    console.log('Wrong IP have tried to access the api! ' + clientIp)
    return;
  }

  try {
    const API_URL = process.env.API_URL;

    const tokenOrder = process.env.TOKEN_CREATE_ORDER;

    const { totalCost, cartItems, vk, tg, mail, chosenPreferredContact, identificator } = req.query;

    const orderData = {
      data: {
        total: totalCost,
        items: JSON.parse(cartItems),
        vk: vk,
        telegram: tg,
        mail: mail,
        preferredMethod: chosenPreferredContact,
        delivered: false,
        paid: false,
        identificator: identificator
      }
    }

    const ENDPOINT = 'orders';

    const response = await axios.post(`${API_URL}/${ENDPOINT}`, orderData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenOrder}`
      }
    });

    if (response.error) {
      res.status(200).json({ status: 'Error' });
    } else {
      res.status(200).json({ 
        data: { created: true },
        meta: {}
      });
    }
  } catch (error) {
    //console.log(error)
    //throw new Error('Failed to fetch data from URI.');
  }
}