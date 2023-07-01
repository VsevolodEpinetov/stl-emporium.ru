export const getWord = (amount, type) => {
  const lastTwoDigits = parseInt(amount % 100);
  const lastDigit = parseInt(amount % 10);

  const wordForms = {
    hero: ['герой', 'героя', 'героев'],
    monster: ['монстр', 'монстра', 'монстров'],
    terrain: ['база', 'базы', 'баз'],
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
        const matchingData = data.data.find(item => item.value === value);
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
        const monsterTypes = getMatchingLabels(stl.classes, filters.monsterType);
        return [...monsterTypes, getGenderString(stl.sex)];
      case 'terrain':
        return getMatchingLabels(stl.tags, filters.tags);
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