import Head from 'next/head'
import { useDisclosure, useLocalStorage, useWindowScroll, usePagination } from '@mantine/hooks';
import { useState, useEffect } from 'react'
import CustomAppShell from '@/components/CustomAppShell';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import STLGallery from '@/components/STLGallery';
const FILTERS = require("../../data/filtersMonsters.json")

const API_URL = 'https://api.stl-emporium.ru/api'
const STL_ENDPOINT = 'creatures';
const DEFAULT_SORT = 'sort=createdAt:desc';
const FILL_WITH_DATA = 'populate=*'
const NOT_ONLY_PHYSICAL = "filters[onlyPhysical][$ne]=true"
const IS_A_MONSTER = "filters[isMonster][$eq]=true"
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
const REQUEST_URL = `${API_URL}/${STL_ENDPOINT}?${FIELDS(SELECTED_FIELDS)}&${FILL_WITH_DATA}&${DEFAULT_SORT}&${IS_A_MONSTER}`


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

  const possibleMonsterTypes = FILTERS.monsterType;

  const params = useSearchParams();
  const router = useRouter();

  const [atLeast1Visible, handleAtLeast1Visible] = useDisclosure(true);
  const [selectedMonsterTypes, setSelectedMonsterTypes] = useState([]);
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
        router.push('/monsters');
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

    if (selectedMonsterTypes.length > 0) {
      selectedMonsterTypes.forEach(c => {
        options += `&filters[classes][$contains]=${c}`
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

    if (selectedMonsterTypes.length > 0) {
      selectedMonsterTypes.forEach(c => {
        options += `&filters[classes][$contains]=${c}`
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
    setSelectedMonsterTypes([]);
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
    monsterType: {
      getter: selectedMonsterTypes,
      setter: setSelectedMonsterTypes,
      data: possibleMonsterTypes,
      placeholder: "Показываются все монстры",
      nothingFound: "Не знаем таких видов :(",
      label: "Фильтр по видам"
    }
  }

  return (
    <>
      <Head />
      <CustomAppShell
        setLoading={setLoading}
        getSelectedHeroes={getSelectedHeroes}
        isMonsterFilters
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
          type='monster'
        />
      </CustomAppShell>
    </>
  )
}