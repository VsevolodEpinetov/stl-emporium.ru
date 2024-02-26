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

    const tokenOrder = process.env.TOKEN_ORDERS;

    const { identificatorOrder, totalAmount, contact, contactValue } = req.query;

    const ENDPOINT = 'orders';
    const FILL_WITH_DATA = 'populate=*'
    const DEFAULT_SORT = 'sort=createdAt:desc'

    const api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenOrder}`
      },
    });

    const response = await api.get(`${API_URL}/${ENDPOINT}?${DEFAULT_SORT}&${FILL_WITH_DATA}&filters[identificator][$eq]=${identificatorOrder}&filters[total][$eq]=${totalAmount}&filters[${contact}][$eq]=${contactValue}`);

    if (response.error) {
      res.status(200).json({ status: 'Error' });
    } else {
      res.status(200).json({
        data: response.data?.data,
        meta: response.data?.meta,
      });
    }
  } catch (error) {
    //console.log(error)
    //throw new Error('Failed to fetch data from URI.');
  }
}