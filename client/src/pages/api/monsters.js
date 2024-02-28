import axios from 'axios';
const defaultValues = require('@/utils/defaultValues.json');
import { buildFieldsQuery, generateFiltersQueryString, hasAtLeastOneKey } from '@/utils/helpers'
const requestIp = require('request-ip');

export default async function handler(req, res) {
  try {
    const clientIp = requestIp.getClientIp(req); 
    const iPIsGood = clientIp == '127.0.0.1' || clientIp == '::1' || clientIp == '::ffff:127.0.0.1';

    if (!iPIsGood) {
      res.status(404);
      console.log('Wrong IP have tried to access the api! ' + clientIp)
      return;
    }

    const { tomeId, tomeUses, races, sex, weapons, page, codes, environments, intelligence, kinds, types, size } = req.query;

    const API_URL = process.env.API_URL;
    const TOKEN = process.env.TOKEN_GET_CREATURES;
    const DEFAULT_SORT = defaultValues.apiSort;

    const ENDPOINT = 'monsters';

    let tomeIsFine = false;

    const FIELDS = [
      "priceSTL",
      "pricePhysical",
      "code"
    ];

    FIELDS.push('races', 'sex', 'weapons', 'environments', 'intelligence', 'kinds', 'types', 'size');

    if (tomeUses > 0) FIELDS.push('releaseName', 'studioName')
    const uniqueFields = [...new Set(FIELDS)]

    const FILTERS = {
      ...(races && { races: races.split(',') }),
      ...(sex && { sex: sex }),
      ...(weapons && { weapons: weapons.split(',') }),
      ...(environments && { environments: environments.split(',') }),
      ...(intelligence && { intelligence: intelligence.split(',') }),
      ...(kinds && { kinds: kinds.split(',') }),
      ...(types && { types: types.split(',') }),
      ...(size && { size: size.split(',') }),
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

    // If the tome was used we need to update the amount of uses
    if (tomeUses > 0 && codes) {
      let amountUsed = codes.split(',').length;
      let newAmount = tomeUses - amountUsed;

      // it should be filtered previously, but just in case
      if (newAmount < 0)  {
        res.status(200).json({ status: 'Error' });
      } else {
        const TOKEN_UPDATE_TOME = process.env.TOKEN_UPDATE_TOME_OF_UNDERSTANDING;
        const updateTomeResponse = await fetch(`https://api.stl-emporium.ru/api/tomes-of-understanding/${tomeId}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${TOKEN_UPDATE_TOME}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            data: {
              usesLeft: newAmount
            }
          })
        });

      }
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