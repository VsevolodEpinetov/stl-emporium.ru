import Head from 'next/head'
import { useDisclosure, useLocalStorage, useWindowScroll, usePagination } from '@mantine/hooks';
import { useState, useEffect } from 'react'
import CustomAppShell from '@/components/CustomAppShell';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import STLGallery from '@/components/STLGallery';
const FILTERS = require("../../data/filters.json")

const API_URL = 'https://api.stl-emporium.ru/api'
const STL_ENDPOINT = 'creatures';
const DEFAULT_SORT = 'sort=createdAt:desc';
const FILL_WITH_DATA = 'populate=*'
const NOT_ONLY_PHYSICAL = "filters[onlyPhysical][$ne]=true"
const IS_A_HERO = "filters[isHero][$eq]=true"
const SELECTED_FIELDS = [
  "races",
  'sex',
  'classes',
  'code',
  'priceSTL',
  'pricePhysical',
  'onlyPhysical'
]
const FIELDS = (selectedFields) => {
  let string = '';
  selectedFields.forEach((field, id) => {
    if (id > 0) string += `&`;
    string += `fields[${id}]=${field}`
  })
  return string;
}
const REQUEST_URL = `${API_URL}/${STL_ENDPOINT}?${FIELDS(SELECTED_FIELDS)}&${FILL_WITH_DATA}&${DEFAULT_SORT}&${IS_A_HERO}`


async function fetchDataFromURI(URI) {
  const rawData = await fetch(URI)
  const data = await rawData.json();

  return {
    miniatures: data?.data,
    meta: data?.meta
  };
}

export default function Home() {
  const [chosenMode, setChosenMode] = useLocalStorage({ key: 'user-setting-mode', defaultValue: 'stl' })
  const [shoppingCart, setShoppingCart] = useLocalStorage({ key: 'shopping-cart', defaultValue: [] })

  const [scroll, scrollTo] = useWindowScroll();

  const races = FILTERS.races;
  const classes = FILTERS.classes;

  const params = useSearchParams();
  const router = useRouter();

  const [atLeast1Visible, handleAtLeast1Visible] = useDisclosure(true);
  const [selectedRaces, setSelectedRaces] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSexes, setSelectedSexes] = useState([]);
  const [miniatures, setMiniatures] = useState();
  const [loading, setLoading] = useDisclosure(true);
  const [totalFound, setTotalFound] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    let requestString;
    if (chosenMode === 'physical') requestString = `${REQUEST_URL}&pagination[pageSize]=20`
    else requestString = `${REQUEST_URL}&${NOT_ONLY_PHYSICAL}&pagination[pageSize]=20`
    fetchDataFromURI(requestString).then(data => {
      const minis = data?.miniatures;
      setMiniatures(minis);
      setTotalFound(data.meta.pagination.total);
      setTotalPages(data.meta.pagination.pageCount);
      setCurrentPage(1);
    })
  }, [])

  useEffect(() => {
    if (params.has('type')) {
      if (params.get('type').length > 0) {
        setChosenMode(params.get('type'))
        router.push('/');
      }
    }
  })

  useEffect(() => {
    getSelectedHeroes();
  }, [chosenMode])

  const getSelectedHeroes = async () => {
    setLoading.open();
    setCurrentPage(1);
    scrollTo({ y: 0 })
    let options = '';

    if (selectedRaces.length > 0) {
      selectedRaces.forEach(r => {
        options += `&filters[races][$contains]=${r}`
      })
    }

    if (selectedClasses.length > 0) {
      selectedClasses.forEach(c => {
        options += `&filters[classes][$contains]=${c}`
      })
    }

    if (selectedSexes.length > 0) {
      selectedSexes.forEach(s => {
        options += `&filters[sex][$contains]=${s}`
      })
    }

    let requestString;
    if (chosenMode === 'physical') requestString = `${REQUEST_URL}&pagination[pageSize]=${pageSize}&pagination[page]=${currentPage}${options}`
    else requestString = `${REQUEST_URL}&${NOT_ONLY_PHYSICAL}&pagination[pageSize]=${pageSize}&pagination[page]=${currentPage}${options}`
    fetchDataFromURI(requestString).then(data => {
      let minis = data.miniatures.map(cr => {
        return {
          ...cr,
          opacity: 100
        }
      })
      setMiniatures(minis);
      setTotalFound(data.meta.pagination.total);
      setTotalPages(data.meta.pagination.pageCount);
      setCurrentPage(1);
    })
  }

  useEffect(() => {
    setLoading.open();
    scrollTo({ y: 0 })
    let options = '';

    if (selectedRaces.length > 0) {
      selectedRaces.forEach(r => {
        options += `&filters[races][$contains]=${r}`
      })
    }

    if (selectedClasses.length > 0) {
      selectedClasses.forEach(c => {
        options += `&filters[classes][$contains]=${c}`
      })
    }

    if (selectedSexes.length > 0) {
      selectedSexes.forEach(s => {
        options += `&filters[sex][$contains]=${s}`
      })
    }

    let requestString
    if (chosenMode === 'physical') requestString = `${REQUEST_URL}&pagination[pageSize]=${pageSize}&pagination[page]=${currentPage}${options}`
    else requestString = `${REQUEST_URL}&${NOT_ONLY_PHYSICAL}&pagination[pageSize]=${pageSize}&pagination[page]=${currentPage}${options}`
    fetchDataFromURI(requestString).then(data => {
      let minis = data.miniatures.map(cr => {
        return {
          ...cr,
          opacity: 100
        }
      })
      setMiniatures(minis);
    })
  }, [currentPage])

  useEffect(() => {
    setLoading.close();
  }, [miniatures])

  function nullFilters() {
    setLoading.open();
    setSelectedClasses([]);
    setSelectedRaces([]);
    setSelectedSexes([]);
    setCurrentPage(1);
    scrollTo({ y: 0 })

    let requestString;
    if (chosenMode === 'physical') requestString = `${REQUEST_URL}&pagination[pageSize]=${pageSize}`
    else requestString = `${REQUEST_URL}&${NOT_ONLY_PHYSICAL}&pagination[pageSize]=${pageSize}`
    fetchDataFromURI(requestString).then(data => {
      let minis = data.miniatures.map(cr => {
        return {
          ...cr,
          opacity: 100
        }
      })
      setMiniatures(minis);
      setTotalFound(data.meta.pagination.total);
      setTotalPages(data.meta.pagination.pageCount);
    })
  }

  const filters = {
    races: {
      getter: selectedRaces,
      setter: setSelectedRaces,
      data: races,
      placeholder: "Показываются все расы",
      nothingFound: "Таких рас нет :(",
      label: "Фильтр по расам"
    },
    classes: {
      getter: selectedClasses,
      setter: setSelectedClasses,
      data: classes,
      placeholder: "Показываются все классы",
      nothingFound: "Не знаем таких классов :(",
      label: "Фильтр по классам"
    },
    sex: {
      getter: selectedSexes,
      setter: setSelectedSexes,
    }
  }

  return (
    <>
      <Head />
      <CustomAppShell
        setLoading={setLoading}
        getSelectedHeroes={getSelectedHeroes}
        isHeroFilters
        filters={filters}
        loading={loading}
        nullFilters={nullFilters}
        chosenMode={chosenMode}
        setChosenMode={setChosenMode}
      >
        <STLGallery
          loading={loading}
          totalFound={totalFound}
          chosenMode={chosenMode}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          miniatures={miniatures}
          filters={FILTERS}
          type='hero'
        />
      </CustomAppShell>
    </>
  )
}