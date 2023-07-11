import axios from 'axios';
const defaultValues = require('@/utils/defaultValues.json');
import { buildFieldsQuery, generateFiltersQueryString, hasAtLeastOneKey } from '@/utils/helpers'

export default async function handler(req, res) {
  try {
    const API_URL = process.env.API_URL;
    const TOKEN = process.env.TOKEN_GET_CREATURES;
    const DEFAULT_SORT = defaultValues.apiSort;

    const ENDPOINT = 'creatures';

    const { tomeId, tomeUses, races, classes, sex, weapons, page, hero, monster, monsterTypes, codes } = req.query;
    let tomeIsFine = false;

    const FIELDS = [
      "priceSTL",
      "pricePhysical",
      "code"
    ];
    FIELDS.push('races', 'sex', 'classes', 'weapons');
    if (tomeUses > 0) FIELDS.push('releaseName', 'studioName')
    const uniqueFields = [...new Set(FIELDS)]
    const IS_HERO = 'filters[isHero][$eq]=true'
    const IS_A_MONSTER = "filters[isMonster][$eq]=true"

    const FILTERS = {
      ...(races && { races: races.split(',') }),
      ...(classes && { classes: classes.split(',') }),
      ...(monsterTypes && { classes: monsterTypes.split(',') }), //yes it should be this way
      ...(sex && { sex: sex }),
      ...(weapons && { weapons: weapons.split(',') }),
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

    const response = await api.get(`${API_URL}/${ENDPOINT}?${DEFAULT_SORT}&${defaultValues.defaultPageSize}&${defaultValues.getImagesAsWell}&${buildFieldsQuery(uniqueFields)}${monster ? `&${IS_A_MONSTER}` : ''}${hero ? `&${IS_HERO}` : ''}${hasAtLeastOneKey(FILTERS) ? '&' + generateFiltersQueryString(FILTERS) : ''}${PAGE}${codes ? codesQuery : ''}`);

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