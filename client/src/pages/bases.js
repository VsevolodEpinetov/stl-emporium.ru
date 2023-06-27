import Head from 'next/head'
import { useDisclosure, useLocalStorage, useWindowScroll } from '@mantine/hooks';
import { useState, useEffect } from 'react'
import CustomAppShell from '@/components/CustomAppShell';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import STLGallery from '@/components/STLGallery';
import { fetchDataFromURI, generateOptionsString, getFilters } from '@/utils/api';

const API_URL = 'https://api.stl-emporium.ru/api'
const STL_ENDPOINT = 'terrains';
const DEFAULT_SORT = 'sort=createdAt:desc';
const FILL_WITH_DATA = 'populate=*'
const NOT_ONLY_PHYSICAL = "filters[onlyPhysical][$ne]=true"
const REQUEST_URL = `${API_URL}/${STL_ENDPOINT}?${FILL_WITH_DATA}&${DEFAULT_SORT}`

export default function Home() {
  const [chosenMode, setChosenMode] = useLocalStorage({ key: 'user-setting-mode', defaultValue: 'stl' })

  const [scroll, scrollTo] = useWindowScroll();

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

  const [tags, setTags] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    getFilters('terrain-tags').then(data => {
      setTags(data);
    })
  }, [])

  useEffect(() => {
    setFilters({
      tags: {
        getter: selectedTags,
        setter: setSelectedTags,
        data: tags,
        placeholder: "Показываются все базы",
        nothingFound: "Такого не знаем :(",
        label: "Теги"
      }
    })
  }, [tags, selectedTags])

  useEffect(() => {
    if (params.has('type')) {
      if (params.get('type').length > 0) {
        setChosenMode(params.get('type'))
        router.push('/bases');
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

    const options = generateOptionsString(filters);
    const requestString = `${REQUEST_URL}&${chosenMode === 'physical' ? '' : NOT_ONLY_PHYSICAL}&pagination[pageSize]=${pageSize}&pagination[page]=${currentPage}${options}`;

    try {
      const data = await fetchDataFromURI(requestString);
      setMiniatures(data.data);
      setTotalFound(data.meta.pagination.total);
      setTotalPages(data.meta.pagination.pageCount);
      setCurrentPage(1);
    } catch (error) {
      //console.log(error)
    } finally {
      setLoading.close();
    }
  }

  useEffect(() => {
    setLoading.open();

    const options = generateOptionsString(filters);
    const requestString = `${REQUEST_URL}&${chosenMode === 'physical' ? '' : NOT_ONLY_PHYSICAL}&pagination[pageSize]=${pageSize}&pagination[page]=${currentPage}&${options}`;

    fetchDataFromURI(requestString).then(data => {
      setMiniatures(data.data);
      scrollTo({ y: 0 })
    })
  }, [currentPage])

  useEffect(() => {
    setLoading.close();
  }, [miniatures])

  async function nullFilters() {
    setLoading.open();

    const requestString = `${REQUEST_URL}&${chosenMode === 'physical' ? '' : NOT_ONLY_PHYSICAL}&pagination[pageSize]=${pageSize}`;

    try {
      const data = await fetchDataFromURI(requestString);
      setMiniatures(data.data);
      setTotalFound(data.meta.pagination.total);
      setTotalPages(data.meta.pagination.pageCount);
      setSelectedTags([]);
      setCurrentPage(1);
      scrollTo({ y: 0 })
    } catch (error) {
      //console.log(error)
    } finally {
      setLoading.close();
    }
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
          chosenMode={chosenMode}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          miniatures={miniatures}
          filters={filters}
          type='terrain'
        />
    </CustomAppShell>
    </>
  )
}