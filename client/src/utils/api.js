import axios from 'axios';
import { createQueryString } from './helpers';

const API_URL = 'https://api.stl-emporium.ru/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchDataFromURI = async (URI) => {
  try {
    const response = await api.get(URI);
    return {
      data: response.data?.data,
      meta: response.data?.meta,
    };
  } catch (error) {
    throw new Error('Failed to fetch data from URI.');
  }
};

export const fetchDataFromURINew = async (type, params) => {
  try {
    const query = createQueryString(params)
    const response = await fetch(`/api/${type}?${query}`, {})
    console.log(response)
    const jsonData = await response.json();
    return {
      data: jsonData.data,
      meta: jsonData.meta,
    };
  } catch (error) {
    //throw new Error('Failed to fetch data from URI.');
  }
};

export default api;

export async function getFilters (type) {

  if (type === 'sex') {
    return [
      {
        label: 'Мужской',
        value: 'm'
      },
      {
        label: 'Женский',
        value: 'f'
      },
      {
        label: 'Неизвестно',
        value: 'x'
      }
    ]
  }

  try {
    const response = await fetch(`/api/filters?type=${type}`, {})
    const jsonData = await response.json();

    return jsonData.data.map(r => {
      return {label: r.attributes.label, value: r.attributes.value}
    });
  } catch (error) {
    throw new Error('Failed to fetch filters from URI.');
  }

}

export const generateOptionsString = (filters) => {
  let options = "";

  for (const key in filters) {
    if (filters.hasOwnProperty(key)) {
      const filter = filters[key];
      const { getter } = filter;

      if (getter.length > 0) {
        getter.forEach((value) => {
          options += `&filters[${key === 'monsterType' ? 'classes' : key}][$contains]=${key === 'sex' ? '' : '"'}${value}${key === 'sex' ? '' : '"'}`;
        });
      }
    }
  }

  return options;
};

export const generateOptionsObject = (filters) => {
  const options = {};

  for (const key in filters) {
    if (filters.hasOwnProperty(key)) {
      const filter = filters[key];
      const { getter } = filter;

      if (getter?.length > 0) {
        getter.forEach((value) => {
          const optionKey = `filters[${key === 'monsterType' ? 'classes' : key}][$contains]`;
          const optionValue = `${key === 'sex' ? '' : '"'}${value}${key === 'sex' ? '' : '"'}`;

          if (!options[optionKey]) {
            options[optionKey] = [];
          }

          options[optionKey].push(optionValue);
        });
      }
    }
  }

  return options;
};
