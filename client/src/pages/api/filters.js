import axios from 'axios';
const defaultValues = require('@/utils/defaultValues.json');
const customEndpoints = require('@/utils/endpoints.json');
import { buildFieldsQuery } from '@/utils/helpers'
import { NextRequest } from 'next/server'
const requestIp = require('request-ip');

export default async function handler(req, res) {
  try {
    const clientIp = requestIp.getClientIp(req); 
    const API_URL = process.env.API_URL;
    console.log(clientIp)

    const { type } = req.query;
    const ENDPOINT = customEndpoints[type] ? customEndpoints[type] : type;

    const TOKEN = process.env.TOKEN_GET_FILTERS;

    const api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
    });

    const FIELDS = ['value', 'label'];
    const uniqueFields = [...new Set(FIELDS)]

    const response = await api.get(`${API_URL}/${ENDPOINT}?${buildFieldsQuery(uniqueFields)}&${defaultValues.maxPageSize}`);


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
    throw new Error('Failed to fetch data from URI.');
  }
};