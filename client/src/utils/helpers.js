export const getWord = (amount, type) => {
  const lastTwoDigits = parseInt(amount % 100);
  const lastDigit = parseInt(amount % 10);

  const wordForms = {
    hero: ['герой', 'героя', 'героев'],
    monster: ['монстр', 'монстра', 'монстров'],
    terrain: ['база', 'базы', 'баз'],
    wh: ['модель', 'модели', 'моделей']
  };

  const typeForms = wordForms[type];

  if (!typeForms) {
    throw new Error(`Invalid type: ${type}`);
  }

  if (lastTwoDigits > 10 && lastTwoDigits < 20) {
    return typeForms[2];
  } else if (lastDigit === 1) {
    return typeForms[0];
  } else if (lastDigit > 1 && lastDigit <= 4) {
    return typeForms[1];
  } else {
    return typeForms[2];
  }
};


export const generateDescriptionString = (stl, type, filters) => {
  if (!stl || !filters) {
    throw new Error('Invalid input');
  }

  const getMatchingLabels = (values, data) => {
    return values
      .map(value => {
        const matchingData = data?.data.find(item => item.value === value);
        return matchingData ? matchingData.label : null;
      })
      .filter(label => label !== null);
  };

  const getTypeSpecificLabels = () => {
    switch (type) {
      case 'hero':
        const heroClasses = getMatchingLabels(stl.classes, filters.classes);
        const heroRaces = getMatchingLabels(stl.races, filters.races);
        const heroWeapons = stl.weapons ? getMatchingLabels(stl.weapons, filters.weapons) : [];
        return [...heroClasses, ...heroRaces, getGenderString(stl.sex), ...heroWeapons];
      case 'monster':
        const monsterRaces = getMatchingLabels(stl.races, filters.races);
        const monsterTypes = getMatchingLabels(stl.classes, filters.monsterTypes);
        const monsterWeapons = stl.weapons ? getMatchingLabels(stl.weapons, filters.weapons) : [];
        return [...monsterRaces, ...monsterTypes, getGenderString(stl.sex), ...monsterWeapons];
      case 'terrain':
        const terrainTags = getMatchingLabels(stl.tags, filters.tags);
        const terrainForm = getMatchingLabels(stl.form, filters.form);
        const terrainSize = getMatchingLabels(stl.size, filters.size);
        return [...terrainTags, ...terrainForm, ...terrainSize];
      case 'wh':
        const whFactions = getMatchingLabels(stl.factions, filters.whFactions);
        const whTypes = getMatchingLabels(stl.type, filters.whTypes);
      return [...whFactions, ...whTypes];
      default:
        return [];
    }
  };

  const getGenderString = (sex) => {
    switch (sex) {
      case 'f':
        return 'Женщина';
      case 'm':
        return 'Мужчина';
      default:
        return 'Бесполый';
    }
  };

  const typeSpecificLabels = getTypeSpecificLabels();
  const str = typeSpecificLabels.join(', ');

  return str;
};

export const buildFieldsQuery = (selectedFields) => {
  let string = '';
  selectedFields.forEach((field, id) => {
    if (id > 0) string += `&`;
    string += `fields[${id}]=${field}`
  })
  return string;
}


export function createQueryString(obj) {
  const queryString = Object.entries(obj)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return queryString;
}

export function generateFiltersQueryString(obj) {
  let queryString = '';

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const values = Array.isArray(obj[key]) ? obj[key] : [obj[key]];
      values.forEach((value) => {
        queryString += `filters[${key}][$contains]=${key === 'sex' ? '' : '"'}${encodeURIComponent(value)}${key === 'sex' ? '' : '"'}&`;
      });
    }
  }

  // Remove the trailing '&' character
  queryString = queryString.slice(0, -1);

  return queryString;
}

export function hasAtLeastOneKey(obj) {
  return Object.keys(obj).length > 0;
}