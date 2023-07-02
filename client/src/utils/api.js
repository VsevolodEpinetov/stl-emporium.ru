import axios from 'axios';

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

export default api;

export async function getFilters (type) {

  try {
    const reqUrl = `${API_URL}/${type}?fields[1]=value&fields[2]=label&pagination[pageSize]=100`
    const response = await fetchDataFromURI(reqUrl);

    return response.data.map(r => {
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