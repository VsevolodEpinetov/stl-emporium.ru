import axios from 'axios';
const defaultValues = require('@/utils/defaultValues.json');
import { buildFieldsQuery, generateFiltersQueryString, hasAtLeastOneKey } from '@/utils/helpers'
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
    const TOKEN = process.env.TOKEN_GET_TERRAIN;
    const DEFAULT_SORT = defaultValues.apiSort;

    const ENDPOINT = 'terrains';

    const { tomeOfUnderstanding, tags, page, codes, sizes, forms } = req.query;
    let tomeIsFine = false;

    if (tomeOfUnderstanding) {
      tomeIsFine = true;
    }

    const FIELDS = [
      "priceSTL",
      "pricePhysical",
      "code"
    ];
    FIELDS.push('type', 'form', 'tags', 'size');
    if (tomeIsFine) FIELDS.push('releaseName', 'studioName')
    const uniqueFields = [...new Set(FIELDS)]

    const FILTERS = {
      ...(tags && { tags: tags.split(',') }),
      ...(sizes && { sizes: sizes.split(',') }),
      ...(forms && { form: forms.split(',') }),
    }

    const api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
    });
    
    const PAGE = page ? `&pagination[page]=${page}` : '';
    
    let codesQuery;
    if (codes) {
      let t = codes.split(',').join('&filters[code][$eq]=');
      codesQuery = `&filters[code][$eq]=${t}`;
    }

    const response = await api.get(`${API_URL}/${ENDPOINT}?${DEFAULT_SORT}&${defaultValues.defaultPageSize}&${defaultValues.getImagesAsWell}&${buildFieldsQuery(uniqueFields)}${hasAtLeastOneKey(FILTERS) ? '&' + generateFiltersQueryString(FILTERS) : ''}${PAGE}${codes ? codesQuery : ''}`);

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
};