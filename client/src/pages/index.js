import Head from 'next/head'
import { useDisclosure, useLocalStorage, useWindowScroll, usePagination } from '@mantine/hooks';
import { useState, useEffect, useMemo } from 'react'
import CustomAppShell from '@/components/CustomAppShell';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import STLGallery from '@/components/STLGallery';
import { generateOptionsString, getFilters } from '@/utils/api';
import { fetchDataFromURI } from '@/utils/api';

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

export default function Home() {
  const [chosenMode, setChosenMode] = useLocalStorage({ key: 'user-setting-mode', defaultValue: 'stl' })

  const [scroll, scrollTo] = useWindowScroll();


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

  const [races, setRaces] = useState([]);
  const [classes, setClasses] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const requestString = `${REQUEST_URL}&${chosenMode === 'physical' ? '' : NOT_ONLY_PHYSICAL}&pagination[pageSize]=${pageSize}`;

    fetchDataFromURI(requestString).then(data => {
      setMiniatures(data.data);
      setTotalFound(data.meta.pagination.total);
      setTotalPages(data.meta.pagination.pageCount);
      setCurrentPage(1);
    })
  }, [])

  useEffect(() => {
    getFilters('classes').then(data => {
      setClasses(data);
    })
    getFilters('races').then(data => {
      setRaces(data)
    })
  }, [])

  useEffect(() => {
    setFilters({
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
    })
  }, [classes, races, selectedRaces, selectedClasses, selectedSexes])

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
      setSelectedRaces([]);
      setSelectedClasses([]);
      setSelectedSexes([]);
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
          filters={filters}
          type='hero'
        />
      </CustomAppShell>
    </>
  )
}