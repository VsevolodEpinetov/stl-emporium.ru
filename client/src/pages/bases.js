import Head from 'next/head'
import { useDisclosure, useLocalStorage, useWindowScroll } from '@mantine/hooks';
import { useState, useEffect } from 'react'
import CustomAppShell from '@/components/CustomAppShell';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import STLGallery from '@/components/STLGallery';
const FILTERS = require("../../data/filtersTerrain.json")

const API_URL = 'https://api.stl-emporium.ru/api'
const STL_ENDPOINT = 'terrains';
const DEFAULT_SORT = 'sort=createdAt:desc';
const FILL_WITH_DATA = 'populate=*'
const REQUEST_URL = `${API_URL}/${STL_ENDPOINT}?${FILL_WITH_DATA}&${DEFAULT_SORT}`


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

  const tags = FILTERS.tags;
  
  const [atLeast1Visible, handleAtLeast1Visible] = useDisclosure(true);
  const [selectedTags, setSelectedTags] = useState([]);

  const params = useSearchParams();
  const router = useRouter();
  
  const [miniatures, setMiniatures] = useState();
  const [loading, setLoading] = useDisclosure(true);
  const [totalFound, setTotalFound] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(async () => {
    fetchDataFromURI(`${REQUEST_URL}&pagination[pageSize]=20`).then(data => {
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
        router.push('/bases');
      }
    }
  })

  const getSelectedHeroes = async () => {
    setLoading.open();
    setCurrentPage(1);
    scrollTo({ y: 0 })
    let options = '';

    if (selectedTags.length > 0) {
      selectedTags.forEach(t => {
        options += `&filters[tags][$contains]=${t}`
      })
    }

    fetchDataFromURI(`${REQUEST_URL}&pagination[pageSize]=${pageSize}&pagination[page]=${currentPage}${options}`).then(data => {
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

    if (selectedTags.length > 0) {
      selectedTags.forEach(t => {
        options += `&filters[classes][$contains]=${t}`
      })
    }

    fetchDataFromURI(`${REQUEST_URL}&pagination[pageSize]=${pageSize}&pagination[page]=${currentPage}${options}`).then(data => {
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
    setSelectedTags([]);
    setCurrentPage(1);
    scrollTo({ y: 0 })
    fetchDataFromURI(`${REQUEST_URL}&pagination[pageSize]=${pageSize}`).then(data => {
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
    tags: {
      getter: selectedTags,
      setter: setSelectedTags,
      data: tags,
      placeholder: "Показываются все базы",
      nothingFound: "Такого не знаем :(",
      label: "Теги"
    },
  }

  return (
    <>
      <Head />
      <CustomAppShell
        setLoading={setLoading}
        getSelectedHeroes={getSelectedHeroes}
        basesFilters
        filters={filters}
        loading={loading}
        nullFilters={nullFilters}
        chosenMode={chosenMode}
        setChosenMode={setChosenMode}
      >
        <STLGallery
          loading={loading}
          totalFound={totalFound}
          addToACart={addToACart}
          chosenMode={chosenMode}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          miniatures={miniatures}
          filters={FILTERS}
          type='terrain'
        />
    </CustomAppShell>
    </>
  )
}