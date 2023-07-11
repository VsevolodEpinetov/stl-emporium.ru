import { buildFieldsQuery } from '@/utils/helpers';
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const API_URL = process.env.API_URL;

    const tokenTomesOfUnderstanding = process.env.TOKEN_TOMES_OF_UNDERSTANDING;

    const { name } = req.query;

    const ENDPOINT = 'tomes-of-understanding';
    const FILL_WITH_DATA = 'populate=*'
    const DEFAULT_SORT = 'sort=createdAt:desc'
    const FIELDS = [
      "usesLeft",
      "name"
    ]
    const uniqueFields = [...new Set(FIELDS)]

    const api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenTomesOfUnderstanding}`
      },
    });

    const response = await api.get(`${API_URL}/${ENDPOINT}?${DEFAULT_SORT}&${FILL_WITH_DATA}&${buildFieldsQuery(uniqueFields)}&filters[name][$eq]=${name}`);

    if (response.error) {
      res.status(200).json({ status: 'Error' });
    } else {
      res.status(200).json({
        data: response.data?.data,
        meta: response.data?.meta,
      });
    }
  } catch (error) {
    console.log(error)
    //throw new Error('Failed to fetch data from URI.');
  }
}